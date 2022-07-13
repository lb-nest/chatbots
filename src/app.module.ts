import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ChatbotTemplateModule } from './chatbot-template/chatbot-template.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        BROKER_URL: Joi.string().uri().required(),
        PORT: Joi.number().default(8080),
        SECRET: Joi.string().required(),
        CHATBOTS_EDGE_URL: Joi.string().uri().required(),
        CHATBOTS_CONTAINER_URLS: Joi.string().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          urls: [configService.get<string>('BROKER_URL')],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'BACKEND_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          urls: [configService.get<string>('BROKER_URL')],
          queue: 'backend_queue',
          queueOptions: {
            durable: false,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
    ChatbotModule,
    ChatbotTemplateModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
