import Prisma from '@prisma/client';

export class ChatbotTemplate implements Prisma.ChatbotTemplate {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  category: Prisma.Category;

  flow: any;

  createdAt: Date;

  updatedAt: Date;
}
