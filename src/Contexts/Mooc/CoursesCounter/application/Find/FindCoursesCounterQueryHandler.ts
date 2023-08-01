import { QueryHandler } from '../../../../Shared/domain/query/QueryHandler';
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery';
import { CoursesCounterFinder } from './CoursesCounterFinder';
import { CoursesCounterResponse } from './CoursesCounterResponse';
import { Query } from '../../../../Shared/domain/query/Query';

export class FindCoursesCounterQueryHandler implements QueryHandler<FindCoursesCounterQuery, CoursesCounterResponse> {
  constructor(private readonly finder: CoursesCounterFinder) {}

  async handle(query: FindCoursesCounterQuery): Promise<CoursesCounterResponse> {
    const coursesCounterResponse = await this.finder.run();

    return new CoursesCounterResponse(coursesCounterResponse.total);
  }

  subscribedTo(): Query {
    return FindCoursesCounterQuery;
  }
}
