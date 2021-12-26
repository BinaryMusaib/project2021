import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionPaperService } from 'src/question/question-paper/question-paper.service';
import { QuestionService } from 'src/question/question.service';
import { SubjectDto } from 'src/question/subject/subject.dto';
import { UserTestDetailsDto } from './user-test-details.dto';
import { UserTestFilterDto } from './user-test-filter.dto';
import { UserTestDto } from './user-test.dto';

@Injectable()
export class UserTestService {
    constructor(
        private prisma: PrismaService,
        private paperService: QuestionPaperService,
        private questionService: QuestionService,
    ) { }

    async getUserTests(userId: number): Promise<UserTestDto[]> {
        return await this.prisma.userTest.findMany({
            where: {
                userId,
            },
            include: {
                test: {
                    include: {
                        user: true,
                    }
                }
            },
        });
    }

    async queryUserTests(
        userId: number,
        { startDate, endDate, subjectId }: UserTestFilterDto,
    ): Promise<UserTestDto[]> {
        return await this.prisma.userTest.findMany({
            where: {
                userId,
                test: {
                    paper: {
                        paperTopics: {
                            some: {
                                topic: {
                                    subjectId: subjectId
                                }
                            }
                        }
                    },
                    OR: [
                        {
                            startTime: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                        {
                            endTime: {
                                gte: startDate,
                                lte: endDate,
                            },
                        },
                    ],
                },
            },
            include: {
                test: {
                    include: {
                        user: true
                    }
                }
            },
        });
    }

    async getUpcomingTests(userId: number): Promise<UserTestDto[]> {
        return await this.prisma.userTest.findMany({
            where: {
                userId,
                startTime: null,
                test: {
                    endTime: {
                        gte: new Date(),
                    },
                },
            },
            include: {
                test: true,
            },
        });
    }

    async getInProgressTests(userId: number): Promise<UserTestDto[]> {
        return await this.prisma.userTest.findMany({
            where: {
                userId,
                startTime: {
                    not: null,
                },
                endTime: {
                    gte: new Date(),
                },
                test: {
                    endTime: {
                        gte: new Date(),
                    },
                    closed: false,
                },
            },
            include: {
                test: true,
            },
        });
    }

    async getUserTest(userId: number, id: number): Promise<UserTestDto> {
        return await this.prisma.userTest.findUnique({
            where: {
                id_userId: {
                    userId,
                    id,
                },
            },
            include: {
                test: true,
            },
        });
    }

    async finishTest(userId: number, id: number) {
        await this.prisma.userTest.update({
            data: {
                finished: true,
            },
            where: {
                id_userId: {
                    userId,
                    id,
                },
            },
        });
    }

    async startTest(userId: number, dto: UserTestDto): Promise<UserTestDto> {
        const startTime = new Date();
        const paper = await this.paperService.getById(dto.test.userId, dto.test.listId);
        const endTime = new Date(
            startTime.valueOf() + paper.duration * 1000 * 60,
        );

        if (!dto.startTime) {
            await this.prisma.userTest.update({
                data: {
                    startTime,
                    endTime,
                },
                where: {
                    id_userId: {
                        userId,
                        id: dto.id,
                    },
                },
            });
        }

        return await this.userTestDetails(userId, dto.id);
    }

    private async userTestDetails(
        userId: number,
        id: number,
    ): Promise<UserTestDto> {
        const { sheets, ...rest } = await this.prisma.userTest.findUnique({
            where: {
                id_userId: {
                    userId,
                    id,
                },
            },
            include: {
                test: true,
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

        return {
            ...rest,
            sheets: sheets.map((sheet) => ({
                ...sheet,
                question: {
                    ...sheet.question,
                    options: sheet.question.options.map(({ isCorrect, ...o }) => o),
                    topics: sheet.question.questionTopics.map((qt) => qt.topic),
                },
            })),
        };
    }

    async getUserTestDetails(
        userId: number,
        userTestId: number,
    ): Promise<UserTestDetailsDto> {
        const userTest = await this.prisma.userTest.findUnique({
            where: {
                id: userTestId,
            },
            include: {
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
                results: true,
                test: {
                    include: {
                        paper: {
                            include: {
                                paperTopics: {
                                    include: {
                                        topic: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true,
            },
        });

        if (userTest.userId !== userId && userTest.test.userId !== userId)
            throw new NotFoundException();

        const sheets = userTest.sheets.map(
            ({ question: { questionTopics, ...rest }, ...sheet }) => {
                const question = {
                    ...rest,
                    topics: questionTopics.map((qt) => qt.topic)
                };

                const [mark, totalMark] = this.questionService.calculateMarks(
                    question,
                    sheet.answer);
                return {
                    ...sheet,
                    mark,
                    isCorrect: totalMark === mark,
                    question
                };
            }
        );

        return {
            ...userTest,
            sheets
        };
    }

    async setAnswer(userTestId: number, answerSheetId: number, answer: string) {
        await this.prisma.answerSheet.update({
            data: {
                answer,
            },
            where: {
                id_userTestId: {
                    id: answerSheetId,
                    userTestId,
                },
            },
        });
    }

    async getSubjectsUndertaken(userId: number): Promise<SubjectDto[]> {
        const userTests = await this.prisma.userTest.findMany({
            where: {
                user: {
                    id: userId
                }
            },
            include: {
                test: {
                    include: {
                        paper: {
                            include: {
                                paperTopics: {
                                    include: {
                                        topic: {
                                            include: {
                                                subject: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const subjectMap = new Map<number, SubjectDto>();
        for (const subjects of userTests
            .map(ut => ut.test.paper.paperTopics.map(pt => pt.topic.subject)))
            for (const subject of subjects)
                if (!subjectMap.has(subject.id))
                    subjectMap.set(subject.id, subject);

        return Array.from(subjectMap.values());
    }


}
