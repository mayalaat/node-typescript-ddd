import { QueryHandler } from '../../../../Shared/domain/query/QueryHandler';
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery';
import { CoursesCounterFinder } from './CoursesCounterFinder';
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse';
import { Query } from '../../../../Shared/domain/query/Query';

export class FindCoursesCounterQueryHandler
  implements QueryHandler<FindCoursesCounterQuery, FindCoursesCounterResponse>
{
  constructor(private readonly finder: CoursesCounterFinder) {}

  async handle(query: FindCoursesCounterQuery): Promise<FindCoursesCounterResponse> {
    const coursesCounterResponse = await this.finder.run();

    return new FindCoursesCounterResponse(coursesCounterResponse.total);
  }

  subscribedTo(): Query {
    return FindCoursesCounterQuery;
  }
}
