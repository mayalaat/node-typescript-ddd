import { ConsumeMessage } from 'amqplib';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMQConnection } from './RabbitMQConnection';

export class RabbitMQConsumer {
  constructor(
    private subscriber: DomainEventSubscriber<DomainEvent>,
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMQConnection
  ) {}

  async onMessage(message: ConsumeMessage) {
    const content = message.content.toString();
    const domainEvent = this.deserializer.deserialize(content);

    try {
      await this.subscriber.on(domainEvent);
      this.connection.ack(message);
    } catch (error) {
      this.connection.noAck(message);
    }
  }
}
