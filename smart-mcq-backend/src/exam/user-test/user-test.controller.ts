import {
    Controller,
    Post,
    Get,
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

    @Post('start/:userTestId')
    async startTest(
        @Param('userTestId', ParseIntPipe) id: number,
        @User() user: UserPrincipal,
    ) {
        const userTest = await this.getUserTest(user.id, id);
        this.ensureTestInProgress(userTest);
        return this.UserTestService.startTest(user.id, userTest);
    }

    @Post('answer/:userTestId')
    async answer(
        @Param('userTestId', ParseIntPipe) id: number,
        @Body() { answerSheetId, optionId }: SetAnswerDto,
        @User() user: UserPrincipal,
    ) {
        const userTest = await this.getUserTest(user.id, id);
        this.ensureTestInProgress(userTest);
        this.ensureUserTestInProgress(userTest);
        await this.UserTestService.setAnswer(userTest.id, answerSheetId, optionId);
    }

    private ensureTestInProgress(userTest: UserTestDto) {
        const status = this.testStatus(userTest);
        if (status === TestStatus.InProgress) return;
        else if (status === TestStatus.NotStarted)
            throw new BadRequestException('The test has not yet started.');
        else throw new BadRequestException('The test has already concluded.');
    }

    private ensureUserTestInProgress(userTest: UserTestDto) {
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
}
