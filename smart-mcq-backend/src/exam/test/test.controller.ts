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
import { UserTestService } from '../user-test/user-test.service';
import { CreateTestDto } from './create-test.dto';
import { TestService } from './test.service';
import { UpdateTestDto } from './update-test.dto';

@Controller('test')
export class TestController {
    constructor(private testService: TestService,
        private userTestService: UserTestService) { }

    @Get(':id')
    async getById(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        const test = await this.testService.getById(user.id, id);
        if (!test) throw new NotFoundException();
        return test;
    }

    @Get('details/:id')
    async getDetailsById(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        const test = await this.testService.getDetailsById(user.id, id);
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

    @Put('close/:id')
    async closeTest(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        this.userTestService.prepareTestResults(user.id, id);
        await this.testService.closeTest(user.id, id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTestDto,
        @User() user: UserPrincipal,
    ) {
        await this.testService.update(user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.testService.delete(id);
    }
}
