import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionDto } from './question.dto';
import { UpdateQuestionDto } from './update-question.dto';

@Injectable()
export class QuestionService {

    constructor(private prisma: PrismaService) { }

    async create(userId: number,
        { topics, options, ...rest }: CreateQuestionDto): Promise<void> {
        await this.prisma.question.create({
            data: {
                ...rest,
                questionTopics: {
                    connect: topics.map(topic => ({
                        id: topic
                    }))
                },
                options: {
                    create: options
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    async update(id: number, { topics, options, ...rest }: UpdateQuestionDto): Promise<void> {
        await this.prisma.question.update({
            data: {
                ...rest,
                questionTopics: {
                    connect: topics.map(topic => ({
                        id: topic
                    }))
                },
                options: {
                    connectOrCreate: options.map(option => ({
                        create: option,
                        where: {
                            id: option.id
                        }
                    }))
                }
            },
            where: {
                id
            }
        });
    }

    async getById(id: number): Promise<QuestionDto> {
        const { questionTopics, ...rest } = await this.prisma.question.findUnique({
            where: {
                id
            },
            include: {
                options: true,
                questionTopics: {
                    include: {
                        topic: true
                    }
                }
            }
        });

        return {
            ...rest,
            topics: questionTopics.map(qt => qt.topic)
        };
    }

    /*async getManyByTopic(topicId: number): Promise<QuestionDto[]> {
        return (await this.prisma.question.findMany({
            where: {
                questionTopics: {
                    topicId
                }
            },
            include: {
                options: true,
                questionTopics: {
                    include: {
                        topic: true
                    }
                }
            }
        })).map(({ questionTopics, ...rest }) => ({
            ...rest,
            options: [],
            topics: questionTopics.map(qt => qt.topic)
        }));
    }*/

    async delete(id: number): Promise<void> {
        await this.prisma.question.delete({
            where: {
                id
            }
        });
    }
}

