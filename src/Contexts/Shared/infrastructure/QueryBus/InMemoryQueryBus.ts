import { QueryBus } from '../../domain/query/QueryBus';
import { Query } from '../../domain/query/Query';
import { QueryHandlers } from './QueryHandlers';
import { Response } from '../../domain/query/Response';

export class InMemoryQueryBus implements QueryBus {
  constructor(private readonly queryHandlers: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const queryHandler = this.queryHandlers.get(query);

    return (await queryHandler.handle(query)) as Promise<R>;
  }
}
