import { Injectable } from '@nestjs/common';
import { Flow, Schema } from '../types';

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
