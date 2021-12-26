import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectStatisticsFilterDto } from './subject-statistics-filter.dto';
import { TestResultDto } from './test-result.dto';

@Injectable()
export class ResultService {

    constructor(private prisma: PrismaService) { }

    async getUserSubjectStatistics(
        currentUserId: number,
        { userId, subjectId, startTime, endTime }: SubjectStatisticsFilterDto):
        Promise<TestResultDto[]> {
        return await this.prisma.result.findMany({
            where: {
                topic: {
                    topic: {
                        subject: {
                            id: subjectId
                        }
                    }
                },
                userTest: {
                    userId: userId,
                    startTime: {
                        gte: startTime,
                        lte: endTime
                    },
                    OR: [
                        {
                            userId: currentUserId
                        },
                        {
                            test: {
                                userId: currentUserId
                            }
                        }
                    ],
                },
            },
            include: {
                topic: {
                    include: {
                        topic: true
                    }
                },
                userTest: true,
            }
        });
    }

    async getMentorSubjectStatistics(
        currentUserId: number,
        { userId, subjectId, startTime, endTime }: SubjectStatisticsFilterDto):
        Promise<TestResultDto[]> {
        return await this.prisma.result.findMany({
            where: {
                topic: {
                    topic: {
                        subject: {
                            id: subjectId
                        }
                    }
                },
                userTest: {
                    userId,
                    startTime: {
                        gte: startTime,
                        lte: endTime
                    },
                    test: {
                        userId: currentUserId
                    }
                }
            },
            include: {
                topic: {
                    include: {
                        topic: true
                    }
                },
                userTest: true
            }
        });
    }

    async getTestStatistics(userId: number, testId: number):
        Promise<TestResultDto[]> {
        return await this.prisma.result.findMany({
            where: {
                userTest: {
                    test: {
                        id: testId,
                        userId
                    }
                },
            },
            include: {
                userTest: {
                    include: {
                        user: true
                    }
                },
                topic: {
                    include: {
                        topic: true
                    }
                }
            }
        });
    }

}
