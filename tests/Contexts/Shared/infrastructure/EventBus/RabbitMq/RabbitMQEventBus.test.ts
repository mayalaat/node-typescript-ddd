import { MongoEnvironmentArranger } from '../../mongo/MongoEnvironmentArranger';
import { RabbitMQMongoClientMother } from '../__mother__/RabbitMQMongoClientMother';
import { RabbitMQConnectionMother } from '../__mother__/RabbitMQConnectionMother';
import { DomainEventFailoverPublisherMother } from '../__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQEventBus } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQEventBus';
import { CourseCreatedDomainEventMother } from '../../../../Mooc/Courses/domain/CourseCreatedDomainEventMother';
import { RabbitMQConnection } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConnection';
import { DomainEventDummyMother } from '../__mocks__/DomainEventDummy';
import { DomainEventFailoverPublisher } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventFailoverPublisher';
import { RabbitMQConfigurer } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQConfigurer';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';
import { RabbitMQqueueFormatter } from '../../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMQqueueFormatter';

describe('RabbitMQEventBus test', () => {
  const exchange = 'domain_events';
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
    let configurer: RabbitMQConfigurer;
    let dummySubscriber: DomainEventSubscriberDummy;
    let failoverPublisher: DomainEventFailoverPublisher;
    const formatter = new RabbitMQqueueFormatter('mooc');

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
      failoverPublisher = DomainEventFailoverPublisherMother.create();

      configurer = new RabbitMQConfigurer(connection, formatter);
    });

    beforeEach(async () => {
      await arranger.arrange();
      dummySubscriber = new DomainEventSubscriberDummy();
    });

    afterAll(async () => {
      await cleanEnvironment();
      await connection.close();
    });

    it('should publish events to RabbitMQ', async () => {
      const failoverPublisher = DomainEventFailoverPublisherMother.create();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });

      await eventBus.publish([CourseCreatedDomainEventMother.create()]);
    });

    it('should publish events to RabbitMQ', async () => {
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = DomainEventDummyMother.random();

      await configurer.configure({ exchange, subscribers: [dummySubscriber] });

      await eventBus.publish([event]);
    });

    async function cleanEnvironment() {
      await connection.deleteQueue(formatter.format(dummySubscriber.constructor.name));
    }
  });
});
