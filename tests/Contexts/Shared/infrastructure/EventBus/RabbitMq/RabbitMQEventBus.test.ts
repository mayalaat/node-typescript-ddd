import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConnection';
import { RabbitMQEventBus } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQEventBus';
import { CourseCreatedDomainEventMother } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEventMother';

describe('RabbitMQEventBus test', () => {
  const config = {
    connectionSettings: {
      username: 'guest',
      password: 'guest',
      vhost: '/',
      connection: {
        secure: false,
        hostname: 'localhost',
        port: 5672
      }
    },
    exchangeSettings: { name: '' }
  };

  let connection: RabbitMQConnection;

  beforeAll(async () => {
    connection = new RabbitMQConnection(config);
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should publish events to RabbitMQ', async () => {
    const eventBus = new RabbitMQEventBus({ connection });

    await eventBus.publish([CourseCreatedDomainEventMother.create()]);
  });
});