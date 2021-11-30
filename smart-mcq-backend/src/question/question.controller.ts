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
import { CreateQuestionDto } from './create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @Get('/topic/:topicId/questions')
    async getByTopic(@Param('topicId', ParseIntPipe) topicId: number, @Request() req: any) {
        return await this.questionService.getManyByTopic(req.user.id, topicId);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        const question = await this.questionService.getById(req.user.id, id);
        if (!question) throw new NotFoundException();
        return question;
    }

    @Post()
    async create(@Body() dto: CreateQuestionDto, @Request() req: any) {
        return await this.questionService.create(req.user.id, dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateQuestionDto,
        @Request() req: any
    ) {
        await this.questionService.update(req.user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        await this.questionService.delete(req.user.id, id);
    }
}

