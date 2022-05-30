import { Exclude } from 'class-transformer';
import { Flow } from 'src/shared/models';

export class Chatbot {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  version: string;

  flow: Flow;

  enabled: boolean;

  @Exclude()
  container: string;

  error?: string;

  createdAt: Date;

  updatedAt: Date;
}
