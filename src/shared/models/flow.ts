import { Type } from 'class-transformer';
import {
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
  is: string;

  @IsString()
  position: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

class HandleBound extends Position {
  @Type(() => SourceOrTarget)
  @ValidateIf((object, value) => value !== null)
  @ValidateNested({ each: true })
  source: SourceOrTarget[];

  @Type(() => SourceOrTarget)
  @ValidateIf((object, value) => value !== null)
  @ValidateNested({ each: true })
  target: SourceOrTarget[];
}

class NodeBase<T extends NodeType> {
  @IsString()
  id: string;

  @IsEnum(NodeType)
  type: T;

  @Type(() => Position)
  @ValidateNested()
  position: Position;

  @Type(() => Position)
  @ValidateNested()
  positionAbsolute: Position;

  @IsInt()
  z: number;

  @Type(() => HandleBound)
  @ValidateNested({ each: true })
  handleBounds: HandleBound[];

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
  data: StartData;
}

class SendMessageData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  attachments: Attachment[];
}

class SendMessage extends NodeBase<NodeType.SendMessage> {
  @Type(() => SendMessageData)
  @ValidateNested()
  data: SendMessageData;
}

class CollectInputData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  attachments: Attachment[];

  @IsString()
  variable: string;

  @IsEnum(ValidationType)
  validation: ValidationType;
}

class CollectInput extends NodeBase<NodeType.CollectInput> {
  @Type(() => CollectInputData)
  @ValidateNested()
  data: CollectInputData;
}

class ButtonsData extends Data {
  @IsString()
  text: string;

  @Type(() => Attachment)
  @ValidateNested({ each: true })
  attachments: Attachment[];

  @Type(() => Button)
  @ValidateNested({ each: true })
  buttons: Button[];
}

class Buttons extends NodeBase<NodeType.Buttons> {
  @Type(() => ButtonsData)
  @ValidateNested()
  data: ButtonsData;
}

class BranchData extends Data {
  @Type(() => BranchItem)
  @ValidateNested({ each: true })
  branches: BranchItem[];

  @IsOptional()
  @IsString()
  default?: string;
}

class Branch extends NodeBase<NodeType.Branch> {
  @Type(() => BranchData)
  @ValidateNested()
  data: BranchData;
}

class ServiceCallData extends Data {
  @Type(() => Request)
  @ValidateNested()
  request: Request;

  @IsObject()
  response: Record<string, string>;
}

class ServiceCall extends NodeBase<NodeType.ServiceCall> {
  @Type(() => ServiceCallData)
  @ValidateNested()
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
  data: TransferData;
}

class AssignTagData extends Data {
  @IsInt()
  tag?: number;
}

class AssignTag extends NodeBase<NodeType.Transfer> {
  @Type(() => AssignTagData)
  @ValidateNested()
  data: AssignTagData;
}

class CloseData extends Data {}

class Close extends NodeBase<NodeType.Close> {
  @Type(() => CloseData)
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
  | Transfer
  | AssignTag
  | Close;

export class Flow {
  @Type(() => Edge)
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
        { name: NodeType.Transfer, value: Transfer },
        { name: NodeType.Close, value: Close },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested({ each: true })
  nodes: Node[];

  @Type(() => Variable)
  @ValidateNested({ each: true })
  variables: Variable[];
}
