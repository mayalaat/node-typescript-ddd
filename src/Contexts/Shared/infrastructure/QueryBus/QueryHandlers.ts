import { Query } from '../../domain/query/Query';
import { QueryHandler } from '../../domain/query/QueryHandler';
import { QueryNotRegistered } from '../../domain/query/QueryNotRegistered';
import { Response } from '../../domain/query/Response';

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super();
    queryHandlers.forEach(queryHandler => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegistered(query);
    }

    return queryHandler;
  }
}
