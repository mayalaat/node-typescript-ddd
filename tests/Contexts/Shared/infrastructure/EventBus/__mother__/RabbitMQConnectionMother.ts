import { RabbitMQConnectionMock } from '../__mocks__/RabbitMQConnectionMock';
import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother';
import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConnection';

export class RabbitMQConnectionMother {
  static async create() {
    const config = RabbitMQConnectionConfigurationMother.create();
    const connection = new RabbitMQConnection(config);
    await connection.connect();
    return connection;
  }

  static failOnPublish() {
    return new RabbitMQConnectionMock(RabbitMQConnectionConfigurationMother.create());
  }
}
