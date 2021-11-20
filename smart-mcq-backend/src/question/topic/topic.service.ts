import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTopicDto } from './create-topic.dto';
import { TopicDto } from './topic.dto';

@Injectable()
export class TopicService {

    constructor(private prisma: PrismaService) { }

    async create({ subjectId, ...rest }: CreateTopicDto): Promise<TopicDto> {
        return await this.prisma.topic.create({
            data: {
                ...rest,
                subject: {
                    connect: {
                        id: subjectId
                    }
                }
            }
        });
    }

    async update(id: number, dto: CreateTopicDto): Promise<void> {
        await this.prisma.topic.update({
            data: dto,
            where: {
                id
            }
        });
    }

    async getById(id: number): Promise<TopicDto> {
        return await this.prisma.topic.findUnique({
            where: {
                id
            }
        });
    }

    async getManyBySubject(subjectId: number): Promise<TopicDto[]> {
        return await this.prisma.topic.findMany({
            where: {
                subjectId
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.topic.delete({
            where: {
                id
            }
        });
    }

    async getAll(): Promise<TopicDto[]> {
        return await this.prisma.topic.findMany();
    }
}
