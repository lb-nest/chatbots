import { Category } from '@prisma/client';

export class ChatbotTemplate {
  id: number;

  name: string;

  description: string;

  imageUrl: string;

  category: Category;

  schema: any;

  createdAt: Date;

  updatedAt: Date;
}
