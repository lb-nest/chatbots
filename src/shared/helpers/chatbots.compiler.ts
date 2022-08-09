import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Flow, NodeType, Schema } from '../models';
import { eq } from './predicate';

@Injectable()
export class ChatbotsCompiler {
  compile(flow: Flow): Schema {
    const schema: Schema = {
      nodes: [],
      variables: flow.variables,
    };

    schema.nodes = flow.nodes.map(({ id, type, data }) => {
      const edges = flow.edges.filter(eq('source', id));
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
            next: edges.find(eq('sourceHandle', id))?.target,
          });
          break;

        case NodeType.Buttons:
          Object.assign(node, data, {
            buttons: data.buttons.map((button) => ({
              ...button,
              next: edges.find(eq('sourceHandle', button.next))?.target,
            })),
          });
          break;

        case NodeType.Branch:
          Object.assign(node, data, {
            buttons: data.branches.map((branch) => ({
              ...branch,
              next: edges.find(eq('sourceHandle', branch.next))?.target,
            })),
            default: edges.find(eq('sourceHandle', 'default'))?.target,
          });
          break;

        case NodeType.ServiceCall:
          Object.assign(node, data, {
            next: edges.find(eq('sourceHandle', id))?.target,
            error: edges.find(eq('sourceHandle', 'error'))?.target,
          });
          break;

        default:
          throw new BadRequestException();
      }

      return node;
    });

    const errors = validateSync(plainToClass(Schema, schema));
    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return schema;
  }
}
