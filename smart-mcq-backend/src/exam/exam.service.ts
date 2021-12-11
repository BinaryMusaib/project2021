import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionPaperService } from 'src/question/question-paper/question-paper.service';
import { UserTestDto } from './user-test.dto';

@Injectable()
export class ExamService {

    constructor(private prisma: PrismaService, private paperService: QuestionPaperService) { }

    async getMyTests(userId: number): Promise<UserTestDto[]> {
        return await this.prisma.userTest.findMany({
            where: {
                userId
            },
            include: {
                test: true
            }
        });
    }

    async getMyTest(userId: number, id: number): Promise<UserTestDto> {
        const userTest = await this.prisma.userTest.findUnique({
            where: {
                id_userId: {
                    userId,
                    id
                }
            },
            include: {
                test: true,
            }
        });
        return userTest;
    }

    async startTest(userId: number, dto: UserTestDto) {
        const startTime = new Date();
        const paper = await this.paperService.getById(userId, dto.test.listId);
        const endTime = new Date(startTime.valueOf() + paper.duration * 1000 * 1000);

        await this.prisma.userTest.update({
            data: {
                startTime,
                endTime
            },
            where: {
                id_userId: {
                    userId,
                    id: dto.id
                }
            }
        });

        return await this.prisma.userTest.findUnique({
            where: {
                id_userId: {
                    userId,
                    id: dto.id,
                }
            },
            include: {
                test: true,
                sheets: true,
            }
        });

    }

    async setAnswer(userTestId: number,
        answerSheetId: number,
        optionId: number) {
        await this.prisma.answerSheet.update({
            data: {
                answerId: optionId
            },
            where: {
                id_userTestId: {
                    id: answerSheetId,
                    userTestId
                }
            }
        });
    }

}


