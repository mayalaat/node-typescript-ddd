import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';

export class CoursePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const { id, name, duration } = req.body;

    await this.commandBus.dispatch(CreateCourseCommand.create({ id, name, duration }));

    res.status(httpStatus.CREATED).send();
  }
}
