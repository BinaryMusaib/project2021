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
import { PrepareResultService } from '../prepare-result/prepare-result.service';
import { ResultService } from '../result/result.service';
import { SubjectStatisticsFilterDto } from '../result/subject-statistics-filter.dto';
import { CreateTestDto } from './create-test.dto';
import { TestService } from './test.service';
import { UpdateTestDto } from './update-test.dto';

@Controller('test')
export class TestController {
    constructor(private testService: TestService,
        private prepareResultService: PrepareResultService,
        private resultService: ResultService) { }

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
        this.prepareResultService.prepare(user.id, id);
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

    @Post('subject/statistics')
    async getSubjectStatistics(
        @User() user: UserPrincipal, @Body() filter: SubjectStatisticsFilterDto) {
        return this.resultService.getMentorSubjectStatistics(user.id, filter);
    }

    @Get(':id/statistics')
    async getTestStatistics(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserPrincipal) {
        return await this.resultService.getTestStatistics(user.id, id);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.testService.delete(id);
    }
}
