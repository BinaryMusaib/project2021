import { Module } from '@nestjs/common';
import { ExamineeListService } from './examinee-list.service';
import { ExamineeListController } from './examinee-list.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ExamineeListService],
  controllers: [ExamineeListController]
})
export class ExamModule {}
