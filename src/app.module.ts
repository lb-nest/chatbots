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
        DATABASE_URL: Joi.string().uri().required(),
        BROKER_URL: Joi.string().uri().required(),
        PORT: Joi.number().port().required(),
        SECRET: Joi.string().required(),
        CHATBOTS_EDGE_URL: Joi.string().uri().required(),
      }),
    }),
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
