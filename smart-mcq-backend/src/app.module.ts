import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { QuestionModule } from './question/question.module';
import { QuestionPaperController } from './question/question-paper/question-paper.controller';
import configuration from './config/configuration';

@Module({
    imports: [PrismaModule, UserModule, ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
    }), MailModule, QuestionModule],
    providers: [AppService, MailService],
    controllers: [QuestionPaperController],
})
export class AppModule { }

