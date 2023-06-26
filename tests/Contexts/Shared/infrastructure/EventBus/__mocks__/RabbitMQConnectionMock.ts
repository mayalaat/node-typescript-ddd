import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConnection';

export class RabbitMQConnectionMock extends RabbitMQConnection {
  async publish(params: any): Promise<boolean> {
    throw new Error();
  }
}
