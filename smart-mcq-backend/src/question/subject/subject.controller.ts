import { Controller, NotFoundException, Post, Get, Body, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateSubjectDto } from './create-subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {

    constructor(private subjectService: SubjectService) { }

    @Get()
    async getAll() {
        return await this.subjectService.getAll();
    }

    @Get(":id")
    async getById(@Param('id', ParseIntPipe) id: number) {
        const subject = await this.subjectService.getById(id);
        if (!subject)
            throw new NotFoundException();
        return subject;
    }

    @Post()
    async create(@Body() dto: CreateSubjectDto) {
        return await this.subjectService.create(dto);
    }

    @Put(":id")
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSubjectDto) {
        await this.subjectService.update(id, dto);
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.subjectService.delete(id);
    }

}

