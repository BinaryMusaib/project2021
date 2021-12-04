import { Module } from '@nestjs/common';
import { ExamineeListService } from './examinee-list/examinee-list.service';
import { ExamineeListController } from './examinee-list/examinee-list.controller';

@Module({
  providers: [ExamineeListService],
  controllers: [ExamineeListController]
})
export class ExamModule {}
