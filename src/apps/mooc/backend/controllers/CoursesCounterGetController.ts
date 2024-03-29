import { Controller } from './Controller';
import { Request, Response } from 'express';
import { QueryBus } from '../../../../Contexts/Shared/domain/query/QueryBus';
import { FindCoursesCounterQuery } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { FindCoursesCounterResponse } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';
import httpStatus from 'http-status';

export class CoursesCounterGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<void> {
    const query = new FindCoursesCounterQuery();
    const { total } = await this.queryBus.ask<FindCoursesCounterResponse>(query);

    res.status(httpStatus.OK).send({ total });
  }
}
