import { CommandBus } from '../../domain/CommandBus';
import { Command } from '../../domain/Command';
import { CommandHandlers } from './CommandHandlers';

export class InMemoryCommandBus implements CommandBus {
  constructor(private readonly commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    let commandCommandHandler = this.commandHandlers.get(command);

    await commandCommandHandler.handle(command);
  }
}
