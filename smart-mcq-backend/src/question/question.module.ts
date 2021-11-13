import { Module } from '@nestjs/common';
import { SubjectService } from './subject/subject.service';
import { TopicService } from './topic/topic.service';
import { QuestionService } from './question.service';
import { SubjectController } from './subject/subject.controller';
import { TopicController } from './topic/topic.controller';
import { QuestionController } from './question.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [SubjectService, TopicService, QuestionService],
    imports: [PrismaModule],
    controllers: [SubjectController, TopicController, QuestionController]
})
export class QuestionModule { }