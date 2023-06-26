import { DomainEvent } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';

import { DomainEventDeserializerMother } from '../__mother__/DomainEventDeserializerMother';
import { RabbitMQMongoClientMother } from '../__mother__/RabbitMQMongoClientMother';
import { DomainEventFailoverPublisher } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher';

export class DomainEventFailoverPublisherMock extends DomainEventFailoverPublisher {
  private readonly publishMock: jest.Mock;

  constructor() {
    super(RabbitMQMongoClientMother.create(), DomainEventDeserializerMother.create());
    this.publishMock = jest.fn();
  }

  async publish(event: DomainEvent): Promise<void> {
    this.publishMock(event);
  }

  assertEventHasBeenPublished(event: DomainEvent) {
    expect(this.publishMock).toHaveBeenCalledWith(event);
  }
}
