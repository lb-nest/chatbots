import Prisma from '@prisma/client';
import { Exclude } from 'class-transformer';

export class Chatbot implements Prisma.Chatbot {
  id: number;

  @Exclude()
  projectId: number;

  name: string;

  version: string;

  flow: any;

  enabled: boolean;

  @Exclude()
  container: string | null;

  error: string | null;

  createdAt: Date;

  updatedAt: Date;
}
