import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { EventEmitter } from 'events';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

export class EventEmitterBus extends EventEmitter {
  constructor(subscribers: DomainEventSubscribers) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber => {
      this.registerSubscriber(subscriber);
    });
  }

  publish(events: DomainEvent[]): void {
    events.map(event => this.emit(event.eventName, event));
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent>) {
    subscriber.subscribedTo().map(event => {
      this.on(event.EVENT_NAME, subscriber.on);
    });
  }
}
