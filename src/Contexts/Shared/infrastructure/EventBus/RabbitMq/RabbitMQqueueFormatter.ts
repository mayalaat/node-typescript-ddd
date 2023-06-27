import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEvent } from '../../../domain/DomainEvent';

export class RabbitMQqueueFormatter {
  constructor(private moduleName: string) {}

  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name;
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
    return `${this.moduleName}.${name}`;
  }
}
