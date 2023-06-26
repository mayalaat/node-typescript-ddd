import { EventBus } from '../../../domain/EventBus';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEvent } from '../../../domain/DomainEvent';
import { RabbitMQConnection } from './RabbitMQConnection';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';

export class RabbitMQEventBus implements EventBus {
  private connection: RabbitMQConnection;
  private readonly exchange: string;
  private failoverPublisher: DomainEventFailoverPublisher;

  constructor(params: {
    connection: RabbitMQConnection;
    exchange: string;
    failoverPublisher: DomainEventFailoverPublisher;
  }) {
    this.connection = params.connection;
    this.exchange = params.exchange;
    this.failoverPublisher = params.failoverPublisher;
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = this.serialize(event);
        const options = this.options(event);

        await this.connection.publish({ routingKey, content, options, exchange: this.exchange });
      } catch (e) {
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

  private serialize(event: DomainEvent): Buffer {
    const eventPrimitives = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        attributes: event.toPrimitives()
      }
    };

    return Buffer.from(JSON.stringify(eventPrimitives));
  }
}
