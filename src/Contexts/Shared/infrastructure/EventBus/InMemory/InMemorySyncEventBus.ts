import { EventBus } from '../../../domain/EventBus';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventSubscribers } from '../DomainEventSubscribers';

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    const executions: any = [];
    events.map(event => {
      const subscribers = this.subscriptions.get(event.eventName);
      if (subscribers) {
        return subscribers.map(subscriber => executions.push(subscriber.boundedCallback(event)));
      }
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: DomainEventSubscribers) {
    subscribers.items.forEach(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.EVENT_NAME, subscriber))
    );
  }

  private subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = {
      boundedCallback: subscriber.on.bind(subscriber),
      originalCallback: subscriber.on
    };
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}
