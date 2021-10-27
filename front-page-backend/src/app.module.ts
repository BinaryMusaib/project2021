import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './frontpage/login.module';
import { SignupModule } from './frontpage/signup.module';
import { PrismaModule } from './frontpage/prisma.module';
import { UserModule } from './frontpage/user.module';

@Module({
  imports: [PrismaModule, UserModule, LoginModule, SignupModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

