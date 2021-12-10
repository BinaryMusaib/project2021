import { Injectable } from '@nestjs/common';
import { QuestionLevel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionDto } from './question.dto';
import { UpdateQuestionDto } from './update-question.dto';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) { }

    async create(
        userId: number,
        { topics, options, ...rest }: CreateQuestionDto,
    ): Promise<void> {
        await this.prisma.question.create({
            data: {
                ...rest,
                questionTopics: {
                    create: topics.map((topic) => ({
                        topicId: topic,
                    })),
                },
                options: {
                    create: options,
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async update(
        userId: number,
        id: number,
        { topics, options, ...rest }: UpdateQuestionDto,
    ): Promise<void> {
        await this.prisma.question.update({
            data: {
                ...rest,
                questionTopics: {
                    deleteMany: {
                        topicId: {
                            notIn: topics
                        }
                    },
                    upsert: topics.map((topicId) => ({
                        create: { topicId },
                        update: { topicId },
                        where: {
                            topicId_questionId: {
                                topicId: topicId,
                                questionId: id,
                            },
                        }
                    })),
                },
                options: {
                    deleteMany: {
                        id: {
                            notIn: options.filter(o => !!o.id).map(o => o.id)
                        }
                    },
                    createMany: {
                        data: options.filter(o => !o.id)
                            .map(({ questionId, ...option }) => option),
                    },
                    updateMany: options.filter(o => !!o.id)
                        .map(({ questionId, id, ...option }) => ({
                            data: option,
                            where: {
                                id
                            }
                        }))
                },
            },
            where: {
                id_userId: {
                    id,
                    userId
                }
            },
        });
    }

    async getById(userId: number, id: number): Promise<QuestionDto> {
        const { questionTopics, ...rest } = await this.prisma.question.findUnique(
            {
                where: {
                    id_userId: {
                        id,
                        userId
                    }
                },
                include: {
                    options: true,
                    questionTopics: {
                        include: {
                            topic: true,
                        },
                    },
                },
            },
        );

        return {
            ...rest,
            topics: questionTopics.map((qt) => qt.topic),
        };
    }

    async getManyByTopic(userId: number, topicId: number, level?: QuestionLevel):
        Promise<QuestionDto[]> {
        const levelQuery = level ? { level } : {};
        return (
            await this.prisma.question.findMany({
                include: {
                    options: true,
                    questionTopics: {
                        include: {
                            topic: true,
                        },
                        where: {
                            topicId
                        },
                    },
                },
                where: {
                    userId,
                    questionTopics: {
                        some: {
                            topicId,
                            question: {
                                ...levelQuery
                            }
                        },
                    }
                }
            })
        ).map(({ questionTopics, ...rest }) => ({
            ...rest,
            options: [],
            topics: questionTopics.map((qt) => qt.topic),
        }));
    }

    async delete(userId: number, id: number): Promise<void> {
        await this.prisma.question.delete({
            where: {
                id_userId: {
                    id,
                    userId
                }
            },
        });
    }
}
