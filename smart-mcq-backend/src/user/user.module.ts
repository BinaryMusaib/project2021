import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './jwt.strategy';

@Module({
    providers: [
        UserService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    imports: [
        PrismaModule,
        MailModule,
        PassportModule,
        JwtModule.register({
            secret: configuration().security.secret,
            signOptions: { expiresIn: '180m' },
        }),
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule { }
