import { Injectable } from '@nestjs/common';
import { Flow, Schema } from '../models';

@Injectable()
export class ChatbotsCompiler {
  compile(flow: Flow): Schema {
    const schema: Schema = {
      nodes: [],
      variables: flow.variables,
    };

    // TODO: пройти по всем edges и соединить ноды

    return schema;
  }
}
