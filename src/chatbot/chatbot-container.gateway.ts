import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatbotContainerProvider } from './chatbot-container.provider';

@WebSocketGateway()
export class ChatbotContainerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly containerProvider: ChatbotContainerProvider) {}

  handleConnection(socket: Socket): void {
    this.containerProvider.set(socket.handshake.auth.containerId, socket);
  }

  handleDisconnect(socket: Socket): void {
    this.containerProvider.delete(socket.handshake.auth.containerId);
  }
}
