import { MongoEnvironmentArranger } from '../../mongo/MongoEnvironmentArranger';
import { RabbitMQMongoClientMother } from '../__mother__/RabbitMQMongoClientMother';
import { RabbitMQConnectionMother } from '../__mother__/RabbitMQConnectionMother';
import { DomainEventFailoverPublisherMother } from '../__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQEventBus } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQEventBus';
import { CourseCreatedDomainEventMother } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEventMother';
import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConnection';

describe('RabbitMQEventBus test', () => {
  const exchange = 'amq.topic';
  let arranger: MongoEnvironmentArranger;

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(RabbitMQMongoClientMother.create());
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  afterAll(async () => {
    await arranger.close();
  });

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = RabbitMQConnectionMother.failOnPublish();
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = CourseCreatedDomainEventMother.create();

      await eventBus.publish([event]);

      failoverPublisher.assertEventHasBeenPublished(event);
    });
  });

  describe('integration', () => {
    let connection: RabbitMQConnection;

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
    });

    afterAll(async () => {
      await connection.close();
    });

    it('should publish events to RabbitMQ', async () => {
      const failoverPublisher = DomainEventFailoverPublisherMother.create();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });

      await eventBus.publish([CourseCreatedDomainEventMother.create()]);
    });
  });
});
