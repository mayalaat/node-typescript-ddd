import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { EventEmitterBus } from './EventEmitterBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: DomainEventSubscribers) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async publish(events: DomainEvent[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    this.bus.registerSubscribers(subscribers);
  }
}
