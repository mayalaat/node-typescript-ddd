import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';
import { DomainEventDeserializer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    const subscribers = new DomainEventSubscribers([dummySubscriber]);
    return DomainEventDeserializer.configure(subscribers);
  }
}
