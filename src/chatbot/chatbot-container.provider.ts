import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatbotContainerProvider extends Map<string, Socket> {
  private i = 0;

  get(key?: string): Socket {
    if (key) {
      return super.get(key);
    }

    const keys = Array.from(super.keys());

    if (this.i >= keys.length) {
      this.i = 0;
    }

    return super.get(keys[this.i++]);
  }
}
