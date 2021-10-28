import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  providers: [UserService],
  imports: [PrismaModule],  //Resolved by Sir
  exports: [UserService],   //Resloved by Sir 
  controllers: [UserController]
})
export class UserModule {}