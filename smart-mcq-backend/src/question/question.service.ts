import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionDto } from './question.dto';

@Injectable()
export class QuestionService {

    constructor(private prisma: PrismaService) { }

    async create({ topicId, ...rest }: CreateQuestionDto): Promise<QuestionDto> {
        return await this.prisma.question.create({
            data: {
                ...rest,
                topic: {
                    connect: {
                        id: topicId
                    }
                }
            }
        });
    }

    async update(id: number, dto: CreateQuestionDto): Promise<void> {
        await this.prisma.question.update({
            data: dto,
            where: {
                id
            }
        });
    }

    async getById(id: number): Promise<QuestionDto> {
        return await this.prisma.question.findUnique({
            where: {
                id
            }
        });
    }

    async getManyByTopic(topicId: number): Promise<QuestionDto[]> {
        return await this.prisma.question.findMany({
            where: {
                topicId
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.question.delete({
            where: {
                id
            }
        });
    }

    async getAll(): Promise<QuestionDto[]> {
        return await this.prisma.question.findMany();
    }
}

