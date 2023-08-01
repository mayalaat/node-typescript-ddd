import { Command } from '../../../Shared/domain/command/Command';

type Params = {
  id: string;
  name: string;
  duration: string;
};

export class CreateCourseCommand extends Command {
  readonly id: string;
  readonly name: string;
  readonly duration: string;

  private constructor({ id, name, duration }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.duration = duration;
  }

  static create({ id, name, duration }: Params) {
    return new CreateCourseCommand({ id, name, duration });
  }
}
