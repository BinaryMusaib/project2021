import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { QuestionModule } from './question/question.module';
import { ExamModule } from './exam/examinee-list/exam.module';
import configuration from './config/configuration';

@Module({
    imports: [PrismaModule, UserModule, ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
    }), MailModule, QuestionModule, ExamModule],
    providers: [AppService, MailService],
})
export class AppModule { }

