import { Command } from '../../domain/Command';
import { CommandHandler } from '../../domain/CommandHandler';
import { CommandNotRegistered } from '../../domain/CommandNotRegistered';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    super();

    commandHandlers.forEach(commandHandler => {
      this.set(commandHandler.subscribeTo(), commandHandler);
    });
  }

  public get(command: Command): CommandHandler<Command> {
    let commandHandler = super.get(command.constructor);

    if (!commandHandler) {
      throw new CommandNotRegistered(command);
    }

    return commandHandler;
  }
}
