import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const config = new DocumentBuilder()
        .setTitle('CRM tizimi')
        .setDescription('Crm system.')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    const port = process.env.PORT || 7001;
    await app.listen(port, '0.0.0.0', () => {
        console.log(
            `Server is running on \nhttp://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`,
        );
    });
}
bootstrap();
