import { DomainEventFailoverPublisherMock } from '../__mocks__/DomainEventFailoverPublisherMock';
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother';
import { RabbitMQMongoClientMother } from './RabbitMQMongoClientMother';
import { DomainEventFailoverPublisher } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher';

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMongoClientMother.create();
    return new DomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create());
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherMock();
  }
}
