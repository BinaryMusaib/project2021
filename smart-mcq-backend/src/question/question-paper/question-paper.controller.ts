import {
    Controller,
    NotFoundException,
    Post,
    Get,
    Body,
    Put,
    Delete,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserPrincipal } from 'src/user/user.principal';
import { CreateQuestionPaperDto } from './create-question-paper.dto';
import { QuestionPaperService } from './question-paper.service';
import { UpdateQuestionPaperDto } from './update-question-paper.dto';

@Controller('question-paper')
export class QuestionPaperController {
    constructor(private questionPaperService: QuestionPaperService) { }

    @Get()
    async getAll(@User() user: UserPrincipal) {
        return await this.questionPaperService.getAll(user.id);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number, @User() user: UserPrincipal) {
        const questionPaper = await this.questionPaperService.getById(user.id, id);
        if (!questionPaper) throw new NotFoundException();
        return questionPaper;
    }

    @Post()
    async create(@Body() dto: CreateQuestionPaperDto, @User() user: UserPrincipal) {
        return await this.questionPaperService.create(user.id, dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateQuestionPaperDto,
        @User() user: UserPrincipal
    ) {
        await this.questionPaperService.update(user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @User() user: UserPrincipal) {
        await this.questionPaperService.delete(user.id, id);
    }
}
