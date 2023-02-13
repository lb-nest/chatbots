import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  Attachment,
  BranchItem,
  Button,
  NodeType,
  TriggerType,
  ValidationType,
} from './node.entity';
import { Variable } from './variable.entity';

class MarkerEnd {
  @IsString()
  type: string;
}

enum EdgeType {
  Standard = 'Standard',
}

class Edge {
  @IsString()
  id: string;

  @IsEnum(EdgeType)
  type: EdgeType;

  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  sourceHandle: string;

  @IsString()
  target: string;

  @IsOptional()
  @IsString()
  targetHandle: string;

  @Type(() => MarkerEnd)
  @IsObject()
  @ValidateNested()
  markerEnd: MarkerEnd;
}

class Position {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class NodeBase<T extends NodeType> {
  @IsString()
  id: string;

  @IsEnum(NodeType)
  type: T;

  @Type(() => Position)
  @IsObject()
  @ValidateNested()
  position: Position;
}

class Data {
  @IsString()
  name: string;
}

class StartData extends Data {
  @IsEnum(TriggerType)
  trigger: TriggerType;
}

class Start extends NodeBase<NodeType.Start> {
  @Type(() => StartData)
  @IsObject()
  @ValidateNested()
  data: StartData;
}

class SendMessageData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @IsArray()
  @ValidateNested({ each: true })
  attachments: Attachment[];
}

class SendMessage extends NodeBase<NodeType.SendMessage> {
  @Type(() => SendMessageData)
  @IsObject()
  @ValidateNested()
  data: SendMessageData;
}

class CollectInputData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @IsArray()
  @ValidateNested({ each: true })
  attachments: Attachment[];

  @IsString()
  variable: string;

  @IsEnum(ValidationType)
  validation: ValidationType;

  @ValidateIf(
    (object: CollectInputData) => object.validation === ValidationType.RegExp,
  )
  @IsString()
  regexp?: string;
}

class CollectInput extends NodeBase<NodeType.CollectInput> {
  @Type(() => CollectInputData)
  @IsObject()
  @ValidateNested()
  data: CollectInputData;
}

class ButtonsData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @IsArray()
  @ValidateNested({ each: true })
  attachments: Attachment[];

  @Type(() => Button)
  @IsArray()
  @ValidateNested({ each: true })
  buttons: Button[];
}

class Buttons extends NodeBase<NodeType.Buttons> {
  @Type(() => ButtonsData)
  @IsObject()
  @ValidateNested()
  data: ButtonsData;
}

class BranchData extends Data {
  @Type(() => BranchItem)
  @IsArray()
  @ValidateNested({ each: true })
  branches: BranchItem[];

  @ValidateIf((_, value) => value !== null)
  @IsString()
  default: string | null;
}

class Branch extends NodeBase<NodeType.Branch> {
  @Type(() => BranchData)
  @IsObject()
  @ValidateNested()
  data: BranchData;
}

class ServiceCallData extends Data {
  @IsOptional()
  @IsString()
  method?: string;

  @IsUrl()
  url: string;

  @IsObject()
  headers: Record<string, string>;

  @IsOptional()
  data?: any;

  @IsOptional()
  @IsString()
  variable?: string;
}

class ServiceCall extends NodeBase<NodeType.ServiceCall> {
  @Type(() => ServiceCallData)
  @IsObject()
  @ValidateNested()
  data: ServiceCallData;
}

class TransferData extends Data {
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  assignedTo?: number | null;
}

class Assign extends NodeBase<NodeType.Assign> {
  @Type(() => TransferData)
  @IsObject()
  @ValidateNested()
  data: TransferData;
}

class AssignTagData extends Data {
  @IsInt()
  tagId: number;
}

class AssignTag extends NodeBase<NodeType.AssignTag> {
  @Type(() => AssignTagData)
  @IsObject()
  @ValidateNested()
  data: AssignTagData;
}

class CloseData extends Data {}

class Close extends NodeBase<NodeType.Close> {
  @Type(() => CloseData)
  @IsObject()
  @ValidateNested()
  data: CloseData;
}

type Node =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branch
  | ServiceCall
  | Assign
  | AssignTag
  | Close;

export class Flow {
  @Type(() => Edge)
  @IsArray()
  @ValidateNested({ each: true })
  edges: Edge[];

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
        { name: NodeType.AssignTag, value: AssignTag },
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
