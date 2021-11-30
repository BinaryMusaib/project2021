import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionPaperDto } from './create-question-paper.dto';
import { QuestionPaperDto } from './question-paper.dto';
import { UpdateQuestionPaperDto } from './update-question-paper.dto';

@Injectable()
export class QuestionPaperService {

    constructor(private prisma: PrismaService) { }

    async create(userId: number, { paperTopics, ...rest }: CreateQuestionPaperDto) {
        await this.prisma.questionPaper.create({
            data: {
                userId,
                ...rest,
                paperTopics: {
                    createMany: {
                        data: paperTopics
                    }
                }
            }
        });
    }

    async update(userId: number, id: number, { paperTopics, ...rest }: UpdateQuestionPaperDto) {
        await this.prisma.questionPaper.update({
            data: {
                ...rest,
                paperTopics: {
                    deleteMany: {
                        id: {
                            notIn: paperTopics.filter(pt => !!pt.id).map(pt => pt.id)
                        }
                    },
                    createMany: {
                        data: paperTopics.filter(pt => !pt.id)
                    },
                    updateMany: paperTopics.filter(pt => !!pt.id).map(pt => ({
                        data: pt,
                        where: {
                            id: pt.id
                        }
                    })),
                }
            },
            where: {
                id_userId: {
                    id,
                    userId
                }
            }
        });
    }

    async delete(userId: number, id: number) {
        await this.prisma.questionPaper.delete({
            where: { id_userId: { id, userId } }
        });
    }

    async getById(userId: number, id: number): Promise<QuestionPaperDto> {
        return await this.prisma.questionPaper.findUnique({
            where: {
                id_userId: {
                    id,
                    userId
                }
            },
            include: {
                paperTopics: true
            }
        });
    }

    async getAll(userId: number): Promise<QuestionPaperDto[]> {
        return await this.prisma.questionPaper.findMany({
            where: {
                userId
            },
            include: {
                paperTopics: true
            }
        });
    }

}
