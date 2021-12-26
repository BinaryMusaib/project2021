import { Injectable } from '@nestjs/common';
import { QuestionPaperTopic } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionService } from 'src/question/question.service';
import { CreateResultDto } from '../result/create-result.dto';
import { AnswerSheetDto } from '../user-test/answer-sheet.dto';

@Injectable()
export class PrepareResultService {

    constructor(private prisma: PrismaService,
        private questionService: QuestionService) { };

    async prepare(userId: number, testId: number) {
        const userTests = await this.prisma.userTest.findMany({
            where: {
                test: {
                    id: testId,
                    userId,
                }
            },
        });

        for (const userTest of userTests) await this.prepareResult(userTest.id);
    }

    private async prepareResult(id: number) {
        const userTest = await this.prisma.userTest.findUnique({
            where: {
                id: id,
            },
            include: {
                test: {
                    include: {
                        paper: {
                            include: {
                                paperTopics: true,
                            },
                        },
                    },
                },
                sheets: {
                    include: {
                        question: {
                            include: {
                                options: true,
                                questionTopics: {
                                    include: {
                                        topic: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (userTest.finished && userTest.totalMarks) return;

        const resultMap = this.toCreateResultList(
            id,
            userTest.test.paper.paperTopics,
        );

        userTest.sheets
            .map((sheet) => this.mapTopicForSheet(sheet))
            .forEach((sheet) =>
                this.accumulateMarks(userTest, sheet, resultMap),
            );

        await this.createResult(userTest, Array.from(resultMap.values()));
    }

    private toCreateResultList(
        userTestId: number,
        paperTopics: QuestionPaperTopic[],
    ) {
        const resultMap = new Map<string, CreateResultDto>();
        for (const pt of paperTopics) {
            const key = this.topicLevelKey(pt.topicId, pt.level);
            resultMap.set(key, {
                topicId: pt.id,
                userTestId,
                marks: 0,
                totalMarks: 0,
            } as CreateResultDto);
        }
        return resultMap;
    }

    private topicLevelKey(topicId: number, level: string) {
        return `${topicId}_${level}`;
    }

    private mapTopicForSheet(sheet: any): AnswerSheetDto {
        //TODO: Add types
        return {
            ...sheet,
            question: {
                ...sheet.question,
                topics: (sheet.question as any).questionTopics.map(
                    (qt: any) => qt.topic,
                ),
            },
        };
    }

    private accumulateMarks(
        aggr: { totalMarks: number; marks: number },
        { question, answer }: AnswerSheetDto,
        resultMap: Map<string, CreateResultDto>,
    ) {
        const [marks, totalMarks] = this.questionService.calculateMarks(
            question,
            answer,
        );
        aggr.totalMarks += totalMarks;
        aggr.marks += marks;
        question.topics.forEach((topic) => {
            const paperTopic = resultMap.get(
                this.topicLevelKey(topic.id, question.level),
            );

            if (paperTopic) {
                paperTopic.marks += marks;
                paperTopic.totalMarks += totalMarks;
            }
        });
    }

    private async createResult(
        userTest: { id: number; marks: number; totalMarks: number },
        results: CreateResultDto[],
    ) {
        await this.prisma.userTest.update({
            data: {
                marks: userTest.marks,
                totalMarks: userTest.totalMarks,
                finished: true,
                results: {
                    createMany: {
                        data: results.map(({ userTestId, ...result }) => result),
                    },
                },
            },
            where: {
                id: userTest.id,
            },
        });
    }

}
