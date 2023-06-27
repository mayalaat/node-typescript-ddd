import { InMemoryAsyncEventBus } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import { Uuid } from '../../../../../../src/Contexts/Shared/domain/value-object/Uuid';
import { DomainEvent, DomainEventClass } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';

describe('InMemoryAsyncEventBus', () => {
  let eventBus: InMemoryAsyncEventBus;

  beforeAll(() => {});

  it('the subscriber should be called when the event it is subscribed to is published', done => {
    const event = new DummyEvent(Uuid.random().value);
    const subscriber = new DomainEventSubscriberDummy();
    subscriber.on = async () => {
      done();
    };
    const subscribers = new DomainEventSubscribers([subscriber]);
    eventBus = new InMemoryAsyncEventBus(subscribers);

    eventBus.publish([event]);
  });
});

class DummyEvent extends DomainEvent {
  static EVENT_NAME = 'dummy:event';

  constructor(aggregateId: string) {
    super({ eventName: DummyEvent.EVENT_NAME, aggregateId });
  }

  toPrimitives(): Object {
    throw new Error('Method not implemented.');
  }
}

class DomainEventSubscriberDummy implements DomainEventSubscriber<DummyEvent> {
  subscribedTo(): DomainEventClass[] {
    return [DummyEvent];
  }

  async on(domainEvent: DummyEvent) {
    console.log(domainEvent);
  }
}
