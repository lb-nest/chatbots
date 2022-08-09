import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { ChatbotTemplateModule } from './chatbot-template/chatbot-template.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        BROKER_URL: Joi.string().uri().required(),
        DATABASE_URL: Joi.string().uri().required(),
        SECRET: Joi.string().required(),
        CHATBOTS_EDGE_URL: Joi.string().uri().required(),
        CHATBOTS_CONTAINER_URLS: Joi.string().required(),
      }),
    }),
    AuthModule,
    ChatbotTemplateModule,
    ChatbotModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
