import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './create-subject.dto';
import { SubjectDto } from './subject.dto';

@Injectable()
export class SubjectService {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSubjectDto): Promise<SubjectDto> {
        return await this.prisma.subject.create({
            data: dto
        });
    }

    async update(id: number, dto: CreateSubjectDto): Promise<void> {
        await this.prisma.subject.update({
            data: dto,
            where: {
                id
            }
        });
    }

    async getById(id: number): Promise<SubjectDto> {
        return await this.prisma.subject.findUnique({
            where: {
                id
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.subject.delete({
            where: {
                id
            }
        });
    }

    async getAll(): Promise<SubjectDto[]> {
        return await this.prisma.subject.findMany();
    }

}
