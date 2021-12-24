import {
    Controller,
    Post,
    Get,
    Put,
    Param,
    NotFoundException,
    ParseIntPipe,
    Body,
    BadRequestException,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserPrincipal } from 'src/user/user.principal';
import { UserTestService } from './user-test.service';
import { SetAnswerDto } from './set-answer.dto';
import { UserTestFilterDto } from './user-test-filter.dto';
import { UserTestDto } from './user-test.dto';
import { SubjectStatisticsFilterDto } from './subject-statistics-filter.dto';

enum TestStatus {
    InProgress,
    NotStarted,
    Finished,
}

@Controller('user-test')
export class UserTestController {
    constructor(private UserTestService: UserTestService) { }

    @Get(':userTestId')
    async getById(
        @Param('userTestId', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        return await this.getUserTest(user.id, id);
    }

    private async getUserTest(userId: number, id: number) {
        const userTest = await this.UserTestService.getUserTest(userId, id);
        if (!userTest) throw new NotFoundException();
        return userTest;
    }

    @Get('details/:userTestId')
    async getDetailsById(
        @Param('userTestId', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        return await this.UserTestService.getUserTestDetails(user.id, id);
    }

    @Get()
    async getUserTests(@User() user: UserPrincipal) {
        return await this.UserTestService.getUserTests(user.id);
    }

    @Post('query')
    async queryUserTests(
        @Body() filter: UserTestFilterDto,
        @User() user: UserPrincipal,
    ) {
        return await this.UserTestService.queryUserTests(user.id, filter);
    }

    @Get('list/upcoming')
    async getUpcomingTests(
        @User() user: UserPrincipal,
    ) {
        return await this.UserTestService.getUpcomingTests(user.id);
    }

    @Get('list/in-progress')
    async getInProgressTests(
        @User() user: UserPrincipal,
    ) {
        return await this.UserTestService.getInProgressTests(user.id);
    }

    @Post('start/:userTestId')
    async startTest(
        @Param('userTestId', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        const userTest = await this.getUserTest(user.id, id);
        try {
            this.ensureTestInProgress(userTest);
            return this.UserTestService.startTest(user.id, userTest);
        } catch (ex) {
            return userTest;
        }
    }

    @Put('submit/:userTestId')
    async finishTest(
        @Param('userTestId', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        this.UserTestService.finishTest(user.id, id);
    }

    @Put('answer/:userTestId')
    async answer(
        @Param('userTestId', ParseIntPipe) id: number,
        @Body() { answerSheetId, answer }: SetAnswerDto,
        @User() user: UserPrincipal,
    ) {
        const userTest = await this.getUserTest(user.id, id);
        this.ensureTestInProgress(userTest);
        this.ensureUserTestInProgress(userTest);
        await this.UserTestService.setAnswer(userTest.id, answerSheetId, answer);
    }

    private ensureTestInProgress(userTest: UserTestDto) {
        const status = this.testStatus(userTest);
        if (status === TestStatus.InProgress) return;
        else if (status === TestStatus.NotStarted)
            throw new BadRequestException('The test has not yet started.');
        else throw new BadRequestException('The test has already concluded.');
    }

    private ensureUserTestInProgress(userTest: UserTestDto) {
        if (userTest.finished)
            throw new BadRequestException('The test is over');

        const now = new Date().valueOf();
        if (
            now < userTest.startTime.valueOf() &&
            now > userTest.startTime.valueOf()
        )
            throw new BadRequestException('The time is out');
    }

    private testStatus(userTest: UserTestDto): TestStatus {
        const now = new Date().valueOf();
        if (now < userTest.test.startTime.valueOf())
            return TestStatus.NotStarted;
        else if (now > userTest.test.endTime.valueOf())
            return TestStatus.Finished;
        else return TestStatus.InProgress;
    }

    @Post('subject/statistics')
    async getSubjectStatistics(
        @User() user: UserPrincipal, @Body() filter: SubjectStatisticsFilterDto) {
        return this.UserTestService.getSubjectStatistics(user.id, filter);
    }

    @Get('subjects/under-taken')
    async getSubjectsUndertaken(
        @User() user: UserPrincipal
    ) {
        return this.UserTestService.getSubjectsUndertaken(user.id);
    }
}
