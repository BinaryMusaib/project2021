import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaperTopicDto } from 'src/question/question-paper/paper-topic.dto';
import { QuestionPaperService } from 'src/question/question-paper/question-paper.service';
import { QuestionDto } from 'src/question/question.dto';
import { QuestionService } from 'src/question/question.service';
import { ExamineeListService } from '../examinee-list/examinee-list.service';
import { CreateTestDto } from './create-test.dto';
import { TestDto } from './test.dto';
import { UpdateTestDto } from './update-test.dto';

@Injectable()
export class TestService {

    constructor(private prisma: PrismaService,
        private examineeListService: ExamineeListService,
        private questionPaperService: QuestionPaperService,
        private questionService: QuestionService,
    ) { }

    async create(userId: number, dto: CreateTestDto) {
        const examineeList = await this.examineeListService.getById(userId, dto.listId);
        if (!examineeList)
            throw new NotFoundException("Examinee list not found");

        const questions = await this.getQuestionsFromPaper(userId, dto.paperId);
        await this.prisma.test.create({
            data: {
                ...dto,
                userId,
                userTests: {
                    create: examineeList.examinees.map(e => ({
                        user: {
                            connect: {
                                id: e.id
                            }
                        },
                        sheets: {
                            createMany: {
                                data: this.shuffle(questions.map(q => ({
                                    questionId: q.id,
                                })))
                            }
                        }

                    }))
                }
            }
        });
    }

    private async getQuestionsFromPaper(userId: number, paperId: number) {
        const paper = await this.questionPaperService.getById(userId, paperId);

        const questions: QuestionDto[] = [];
        for (const paperTopic of paper.paperTopics) {
            questions.push(...(await this.randomQuestions(userId, paperTopic)));
        }

        return questions;
    }

    private async randomQuestions(userId: number, paperTopic: PaperTopicDto) {
        return this.shuffle(
            await this.questionService.getManyByTopic(
                userId, paperTopic.topicId, paperTopic.level))
            .slice(0, paperTopic.numberOfQuestions);
    }

    private shuffle<T>(values: T[]) {
        for (let i = values.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [values[i], values[j]] = [values[j], values[i]];
        }
        return values;
    }

    async update(userId: number, id: number, dto: UpdateTestDto) {
        await this.prisma.test.update({
            data: dto,
            where: {
                userId_id: {
                    userId,
                    id
                }
            }
        });
    }

    async closeTest(userId: number, id: number) {
        await this.prisma.test.update({
            data: {
                closed: true
            },
            where: {
                userId_id: {
                    userId,
                    id
                }
            }
        });
    }

    async getById(userId: number, id: number): Promise<TestDto> {
        return await this.prisma.test.findUnique({
            where: {
                userId_id: {
                    userId,
                    id
                }
            }
        });
    }

    async getDetailsById(userId: number, id: number): Promise<TestDto> {
        return await this.prisma.test.findUnique({
            where: {
                userId_id: {
                    userId,
                    id
                }
            },
            include: {
                userTests: {
                    include: {
                        user: true,
                    }
                },
            },
        });
    }
    async getByUserId(userId: number): Promise<TestDto[]> {
        return await this.prisma.test.findMany({
            where: {
                userId
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.test.delete({
            where: {
                id
            }
        });
    }

}
