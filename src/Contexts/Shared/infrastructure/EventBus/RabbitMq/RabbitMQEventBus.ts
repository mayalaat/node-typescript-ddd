import { EventBus } from '../../../domain/EventBus';
import { DomainEvent } from '../../../domain/DomainEvent';
import { RabbitMQConnection } from './RabbitMQConnection';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { RabbitMQConsumerFactory } from './RabbitMQConsumerFactory';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';

export class RabbitMQEventBus implements EventBus {
  private readonly connection: RabbitMQConnection;
  private readonly exchange: string;
  private failoverPublisher: DomainEventFailoverPublisher;
  private queueNameFormatter: RabbitMQqueueFormatter;
  private readonly maxRetries: Number;

  constructor(params: {
    connection: RabbitMQConnection;
    exchange: string;
    failoverPublisher: DomainEventFailoverPublisher;
    queueNameFormatter: RabbitMQqueueFormatter;
    maxRetries: Number;
  }) {
    const { failoverPublisher, connection, exchange } = params;
    this.connection = connection;
    this.exchange = exchange;
    this.failoverPublisher = failoverPublisher;
    this.queueNameFormatter = params.queueNameFormatter;
    this.maxRetries = params.maxRetries;
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers);
    const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries);

    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber);
      const rabbitMQConsumer = consumerFactory.build(subscriber, this.exchange, queueName);

      await this.connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer));
    }
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = this.toBuffer(event);
        const options = this.options(event);

        await this.connection.publish({ exchange: this.exchange, routingKey, content, options });
      } catch (error: any) {
        await this.failoverPublisher.publish(event);
      }
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    };
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }
}
