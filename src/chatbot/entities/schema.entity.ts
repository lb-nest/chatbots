import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import {
  Assign,
  Branch,
  Buttons,
  Close,
  CollectInput,
  Node,
  NodeBase,
  NodeType,
  SendMessage,
  ServiceCall,
  Start,
} from './node.entity';
import { Variable } from './variable.entity';

export class Schema {
  @Type(() => NodeBase, {
    discriminator: {
      property: 'type',
      subTypes: [
        { name: NodeType.Start, value: Start },
        { name: NodeType.SendMessage, value: SendMessage },
        { name: NodeType.CollectInput, value: CollectInput },
        { name: NodeType.Buttons, value: Buttons },
        { name: NodeType.Branch, value: Branch },
        { name: NodeType.ServiceCall, value: ServiceCall },
        { name: NodeType.Assign, value: Assign },
        { name: NodeType.Close, value: Close },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  nodes: Node[];

  @Type(() => Variable)
  @IsArray()
  @ValidateNested({ each: true })
  variables: Variable[];
}
