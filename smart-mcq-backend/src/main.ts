import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }));
    app.setGlobalPrefix("api");
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(4000);
}
bootstrap();
