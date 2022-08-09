import { Module } from '@nestjs/common';
import { AUTH_SERVICE } from 'src/shared/rabbitmq/constants';
import { RabbitMQModule } from 'src/shared/rabbitmq/rabbitmq.module';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    RabbitMQModule.register({
      name: AUTH_SERVICE,
    }),
  ],
  providers: [BearerStrategy],
})
export class AuthModule {}
