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
import { CreateTestDto } from './create-test.dto';
import { TestService } from './test.service';
import { UpdateTestDto } from './update-test.dto';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) { }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number, @User() user: UserPrincipal) {
        const test = await this.testService.getById(user.id, id);
        if (!test) throw new NotFoundException();
        return test;
    }

    @Get()
    async getByUserId(@User() user: UserPrincipal) {
        return await this.testService.getByUserId(user.id);
    }

    @Post()
    async create(@Body() dto: CreateTestDto, @User() user: UserPrincipal) {
        await this.testService.create(user.id, dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTestDto,
        @User() user: UserPrincipal
    ) {
        await this.testService.update(user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.testService.delete(id);
    }

}
