import { Controller, NotFoundException, Post, Get, Body, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateTopicDto } from './create-topic.dto';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {

    constructor(private topicService: TopicService) { }

    @Get()
    async getAll() {
        return await this.topicService.getAll();
    }

    @Get(":id")
    async getById(@Param('id', ParseIntPipe) id: number) {
        const topic = await this.topicService.getById(id);
        if (!topic)
            throw new NotFoundException();
        return topic;
    }

    @Post()
    async create(@Body() dto: CreateTopicDto) {
        return await this.topicService.create(dto);
    }

    @Put(":id")
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTopicDto) {
        await this.topicService.update(id, dto);
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.topicService.delete(id);
    }

}


