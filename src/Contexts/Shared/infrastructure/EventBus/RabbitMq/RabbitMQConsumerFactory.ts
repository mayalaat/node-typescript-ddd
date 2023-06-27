import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';

export class RabbitMQConsumerFactory {
  constructor(private deserializer: DomainEventDeserializer, private connection: RabbitMQConnection) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>) {
    return new RabbitMQConsumer(subscriber, this.deserializer, this.connection);
  }
}
