import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Attachment, Button } from './message';
import {
  BranchItem,
  NodeType,
  Request,
  TriggerType,
  ValidationType,
} from './node';
import { Variable } from './variable';

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

  @IsString()
  sourceHandle: string;

  @IsString()
  target: string;

  @IsString()
  targetHandle: string;

  @IsString()
  sourcePosition: string;

  @IsString()
  targetPosition: string;

  @Type(() => MarkerEnd)
  @ValidateNested()
  @IsObject()
  markerEnd: MarkerEnd;
}

class Position {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class SourceOrTarget extends Position {
  @IsString()
  id: string;

  @IsString()
  position: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

class HandleBounds {
  @Type(() => SourceOrTarget)
  @ValidateNested({ each: true })
  @IsArray()
  @ValidateIf((object, value) => value !== null)
  source: SourceOrTarget[];

  @Type(() => SourceOrTarget)
  @ValidateNested({ each: true })
  @IsArray()
  @ValidateIf((object, value) => value !== null)
  target: SourceOrTarget[];
}

class NodeBase<T extends NodeType> {
  @IsString()
  id: string;

  @IsEnum(NodeType)
  type: T;

  @Type(() => Position)
  @ValidateNested()
  @IsObject()
  position: Position;

  @Type(() => Position)
  @ValidateNested()
  @IsObject()
  positionAbsolute: Position;

  @IsInt()
  z: number;

  @Type(() => HandleBounds)
  @ValidateNested()
  @IsObject()
  handleBounds: HandleBounds;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
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
  @ValidateNested()
  @IsObject()
  data: StartData;
}

class SendMessageData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  @IsArray()
  attachments: Attachment[];
}

class SendMessage extends NodeBase<NodeType.SendMessage> {
  @Type(() => SendMessageData)
  @ValidateNested()
  @IsObject()
  data: SendMessageData;
}

class CollectInputData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  @IsArray()
  attachments: Attachment[];

  @IsString()
  variable: string;

  @IsEnum(ValidationType)
  validation: ValidationType;
}

class CollectInput extends NodeBase<NodeType.CollectInput> {
  @Type(() => CollectInputData)
  @ValidateNested()
  @IsObject()
  data: CollectInputData;
}

class ButtonsData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  @IsArray()
  attachments: Attachment[];

  @Type(() => Button)
  @ValidateNested({ each: true })
  @IsArray()
  buttons: Button[];
}

class Buttons extends NodeBase<NodeType.Buttons> {
  @Type(() => ButtonsData)
  @ValidateNested()
  @IsObject()
  data: ButtonsData;
}

class BranchData extends Data {
  @Type(() => BranchItem)
  @ValidateNested({ each: true })
  @IsArray()
  branches: BranchItem[];

  @IsOptional()
  @IsString()
  default?: string;
}

class Branch extends NodeBase<NodeType.Branch> {
  @Type(() => BranchData)
  @ValidateNested()
  @IsObject()
  data: BranchData;
}

class ServiceCallData extends Data {
  @Type(() => Request)
  @ValidateNested()
  @IsObject()
  request: Request;

  @IsObject()
  response: Record<string, string>;
}

class ServiceCall extends NodeBase<NodeType.ServiceCall> {
  @Type(() => ServiceCallData)
  @ValidateNested()
  @IsObject()
  data: ServiceCallData;
}

class TransferData extends Data {
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  assignedTo?: number | null;
}

class Transfer extends NodeBase<NodeType.Transfer> {
  @Type(() => TransferData)
  @ValidateNested()
  @IsObject()
  data: TransferData;
}

class AssignTagData extends Data {
  @IsInt()
  tag?: number;
}

class AssignTag extends NodeBase<NodeType.AssignTag> {
  @Type(() => AssignTagData)
  @ValidateNested()
  @IsObject()
  data: AssignTagData;
}

class CloseData extends Data {}

class Close extends NodeBase<NodeType.Close> {
  @Type(() => CloseData)
  @ValidateNested()
  @IsObject()
  data: CloseData;
}

type Node =
  | Start
  | SendMessage
  | CollectInput
  | Buttons
  | Branch
  | ServiceCall
  | Transfer
  | AssignTag
  | Close;

export class Flow {
  @Type(() => Edge)
  @ValidateNested({ each: true })
  @IsArray()
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
        { name: NodeType.Transfer, value: Transfer },
        { name: NodeType.AssignTag, value: AssignTag },
        { name: NodeType.Close, value: Close },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested({ each: true })
  @IsArray()
  nodes: Node[];

  @Type(() => Variable)
  @ValidateNested({ each: true })
  @IsArray()
  variables: Variable[];
}
