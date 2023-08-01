import { CommandHandler } from '../../../Shared/domain/CommandHandler';
import { CreateCourseCommand } from '../domain/CreateCourseCommand';
import { Command } from '../../../Shared/domain/Command';
import { CourseCreator } from './CourseCreator';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';

export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly courseCreator: CourseCreator) {}

  async handle(command: CreateCourseCommand): Promise<void> {
    await this.courseCreator.run({
      id: new CourseId(command.id),
      name: new CourseName(command.name),
      duration: new CourseDuration(command.duration)
    });
  }

  subscribeTo(): Command {
    return CreateCourseCommand;
  }
}
