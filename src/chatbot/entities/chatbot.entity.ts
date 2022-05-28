import { Exclude } from 'class-transformer';

export class Chatbot {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  version: string;

  schema: any;

  enabled: boolean;

  error?: string;

  createdAt: Date;

  updatedAt: Date;
}
