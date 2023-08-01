import { CommandBus } from '../../domain/command/CommandBus';
import { Command } from '../../domain/command/Command';
import { CommandHandlers } from './CommandHandlers';

export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    let commandCommandHandler = this.commandHandlers.get(command);

    await commandCommandHandler.handle(command);
  }
}
