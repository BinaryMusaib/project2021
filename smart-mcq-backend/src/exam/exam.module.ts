import { Module } from '@nestjs/common';
import { ExamineeListService } from './examinee-list/examinee-list.service';
import { ExamineeListController } from './examinee-list/examinee-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TestService } from './test/test.service';
import { TestController } from './test/test.controller';
import { QuestionService } from 'src/question/question.service';
import { QuestionPaperService } from 'src/question/question-paper/question-paper.service';
import { QuestionModule } from 'src/question/question.module';
import { UserTestService } from './user-test/user-test.service';
import { UserTestController } from './user-test/user-test.controller';

@Module({
    imports: [PrismaModule, QuestionModule],
    providers: [ExamineeListService, TestService, UserTestService],
    controllers: [ExamineeListController, TestController, UserTestController]
})
export class ExamModule { }
