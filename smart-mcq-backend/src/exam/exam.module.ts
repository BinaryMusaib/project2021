import { Module } from '@nestjs/common';
import { ExamineeListService } from './examinee-list/examinee-list.service';
import { ExamineeListController } from './examinee-list/examinee-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TestService } from './test/test.service';

@Module({
  imports: [PrismaModule],
  providers: [ExamineeListService, TestService],
  controllers: [ExamineeListController]
})
export class ExamModule {}
