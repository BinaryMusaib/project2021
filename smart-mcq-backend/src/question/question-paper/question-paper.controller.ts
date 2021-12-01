import {
    Controller,
    NotFoundException,
    Post,
    Get,
    Body,
    Put,
    Delete,
    Param,
    Request,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateQuestionPaperDto } from './create-question-paper.dto';
import { QuestionPaperService } from './question-paper.service';
import { UpdateQuestionPaperDto } from './update-question-paper.dto';

@Controller('question-paper')
export class QuestionPaperController {
    constructor(private questionPaperService: QuestionPaperService) { }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        const questionPaper = await this.questionPaperService.getById(req.user.id, id);
        if (!questionPaper) throw new NotFoundException();
        return questionPaper;
    }

    @Post()
    async create(@Body() dto: CreateQuestionPaperDto, @Request() req: any) {
        return await this.questionPaperService.create(req.user.id, dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuestionPaperDto,
        @Request() req: any
    ) {
        await this.questionPaperService.update(req.user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        await this.questionPaperService.delete(req.user.id, id);
    }
}
