import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateCourseDomainEventAttributes = {
  readonly duration: string;
  readonly name: string;
};

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'course.created';

  readonly duration: string;
  readonly name: string;

  constructor({
    aggregateId,
    eventId,
    duration,
    name,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }) {
    super({ eventName: CourseCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.duration = duration;
    this.name = name;
  }

  static fromPrimitives(params: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: CreateCourseDomainEventAttributes;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new CourseCreatedDomainEvent({
      aggregateId,
      eventId,
      duration: attributes.duration,
      name: attributes.name,
      occurredOn
    });
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration } = this;
    return {
      name,
      duration
    };
  }
}
