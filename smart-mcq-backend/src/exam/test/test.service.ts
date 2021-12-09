import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTestDto } from './create-test.dto';
import { TestDto } from './test.dto';
import { UpdateTestDto } from './update-test.dto';

@Injectable()
export class TestService {

    constructor(private prisma: PrismaService) { }

    async create(userId: number, dto: CreateTestDto) {
        this.prisma.test.create({
            data: {
                ...dto,
                userId
            }
        });
    }

    async update(userId: number, id: number, dto: UpdateTestDto) {
        this.prisma.test.update({
            data: dto,
            where: {
                userId_id: {
                    userId,
                    id
                }
            }
        });
    }

    async getById(userId: number, id: number): Promise<TestDto> {
        return this.prisma.test.findUnique({
            where: {
                userId_id: {
                    userId,
                    id
                }
            }
        });
    }

    async getByUserId(userId: number): Promise<TestDto[]> {
        return this.prisma.test.findMany({
            where: {
                userId
            }
        });
    }

}
