import { Command } from './Command';

export interface CommandHandler<T extends Command> {
  subscribeTo(): Command;

  handle(command: T): Promise<void>;
}
