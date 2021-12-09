import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamineeListDto } from './create-examinee-list.dto';
import { ExamineeListDto } from './examinee-list.dto';

@Injectable()
export class ExamineeListService {
    constructor(private prisma: PrismaService) { }

    async create(
        userId: number,
        { examinees, ...rest }: CreateExamineeListDto,
    ): Promise<void> {
        const users = await this.getUserIdsFromEmails(examinees.map(e => e.email));
        await this.prisma.examineeList.create({
            data: {
                ...rest,
                userId,
                examinees: {
                    createMany: {
                        data: users.map(user => ({
                            userId: user.id
                        }
                        ))
                    }
                }
            },
        });
    }

    async getUserIdsFromEmails(emails: string[]) {
        return await this.prisma.user.findMany({
            where: {
                email: {
                    in: emails
                }
            }
        });
    }

    async update(
        userId: number,
        id: number,
        { examinees, ...rest }: CreateExamineeListDto,
    ): Promise<void> {
        const users = await this.getUserIdsFromEmails(examinees.map(e => e.email));
        await this.prisma.examineeList.update({
            data: {
                ...rest,
                examinees: {
                    deleteMany: {
                        userId: {
                            notIn: users.map(u => u.id)
                        }
                    },

                    createMany: {
                        data: users.map(user => ({
                            userId: user.id
                        }))
                    }
                }
            },
            where: {
                id_userId: {
                    id,
                    userId
                }
            },
        });
    }

    async getById(userId: number, id: number): Promise<ExamineeListDto> {
        const { examinees, ...rest } = await this.prisma.examineeList.findUnique(
            {
                where: {
                    id_userId: {
                        id,
                        userId
                    }
                },
                include: {
                    examinees: {
                        include: {
                            user: true,
                        },
                    },
                },
            },
        );

        return {
            ...rest,
            examinees: examinees.map(e => e.user),
        };
    }

    async getManyByUser(userId: number): Promise<ExamineeListDto[]> {
        return (
            await this.prisma.examineeList.findMany({
                where: {
                    userId
                }
            })
        ).map(e => ({ ...e, examinees: [] }));
    }

    async delete(userId: number, id: number): Promise<void> {
        await this.prisma.examineeList.delete({
            where: {
                id_userId: {
                    id,
                    userId
                }
            },
        });
    }
}
