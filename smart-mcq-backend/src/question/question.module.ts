import { Module } from '@nestjs/common';
import { SubjectService } from './subject/subject.service';
import { TopicService } from './topic/topic.service';
import { QuestionService } from './question.service';
import { SubjectController } from './subject/subject.controller';
import { TopicController } from './topic/topic.controller';
import { QuestionController } from './question.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionPaperService } from './question-paper/question-paper.service';
import { QuestionPaperController } from './question-paper/question-paper.controller';

@Module({
    providers: [SubjectService, TopicService, QuestionService, QuestionPaperService],
    imports: [PrismaModule],
    exports: [QuestionService, QuestionPaperService],
    controllers: [SubjectController, TopicController, QuestionController, QuestionPaperController]
})
export class QuestionModule { }
