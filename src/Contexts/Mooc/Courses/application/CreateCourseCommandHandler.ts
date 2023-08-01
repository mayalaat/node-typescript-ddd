import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CreateCourseCommand } from '../domain/CreateCourseCommand';
import { Command } from '../../../Shared/domain/Command';
import { CourseCreator } from './CourseCreator';

export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly courseCreator: CourseCreator) {}

  async handle(command: CreateCourseCommand): Promise<void> {
    await this.courseCreator.run({ ...command });
  }

  subscribeTo(): Command {
    return CreateCourseCommand;
  }
}
