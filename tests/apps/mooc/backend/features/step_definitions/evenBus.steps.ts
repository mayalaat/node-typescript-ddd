import { Given } from 'cucumber';
import container from '../../../../../../src/apps/mooc/backend/config/dependency-injection';
import { EventBus } from '../../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseCreatedDomainEvent } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';

Given('I send an event to the event bus:', async (event: any) => {
  const eventBus = container.get('Mooc.shared.EventBus') as EventBus;
  const jsonEvent = JSON.parse(event).data;

  const domainEvent = CourseCreatedDomainEvent.fromPrimitives({
    aggregateId: jsonEvent.attributes.id,
    attributes: jsonEvent.attributes,
    eventId: jsonEvent.id,
    occurredOn: jsonEvent.occurredOn
  });

  await eventBus.publish([domainEvent]);
});
