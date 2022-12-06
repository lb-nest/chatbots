import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Flow } from './entities/flow.entity';
import { NodeType } from './entities/node.entity';
import { Schema } from './entities/schema.entity';

@Injectable()
export class ChatbotCompilerService {
  async compile(flow: Flow): Promise<Schema> {
    const schema: Schema = {
      nodes: [],
      variables: flow.variables,
    };

    schema.nodes = flow.nodes.map(({ id, type, data }) => {
      const edges = flow.edges.filter(this.equals('source', id));
      const node: any = {
        id,
        type,
      };

      switch (type) {
        case NodeType.Start:
        case NodeType.SendMessage:
        case NodeType.CollectInput:
        case NodeType.Transfer:
        case NodeType.AssignTag:
        case NodeType.Close:
          Object.assign(node, data, {
            next: edges.find(this.equals('sourceHandle', 'next'))?.target,
          });
          break;

        case NodeType.Buttons:
          Object.assign(node, data, {
            buttons: data.buttons.map((button) => ({
              ...button,
              next: edges.find(this.equals('sourceHandle', button.next))
                ?.target,
            })),
          });
          break;

        case NodeType.Branch:
          Object.assign(node, data, {
            buttons: data.branches.map((branch) => ({
              ...branch,
              next: edges.find(this.equals('sourceHandle', branch.next))
                ?.target,
            })),
            default: edges.find(this.equals('sourceHandle', 'default'))?.target,
          });
          break;

        case NodeType.ServiceCall:
          Object.assign(node, data, {
            next: edges.find(this.equals('sourceHandle', id))?.target,
            error: edges.find(this.equals('sourceHandle', 'error'))?.target,
          });
          break;

        default:
          throw new BadRequestException();
      }

      return node;
    });

    const errors = await validate(plainToClass(Schema, schema));
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return schema;
  }

  private equals<T extends Record<string, any>>(
    key: keyof T,
    value: T[typeof key],
  ): (obj: T) => boolean {
    return (obj: T) => obj[key] === value;
  }
}
