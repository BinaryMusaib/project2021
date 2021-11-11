import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }));
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
      }
    app.setGlobalPrefix("api");
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(4000);
}
bootstrap();

