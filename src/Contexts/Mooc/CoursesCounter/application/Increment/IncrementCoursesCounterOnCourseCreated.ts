import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { CourseCreatedDomainEvent } from '../../../Courses/domain/CourseCreatedDomainEvent';
import { CoursesCounterIncrementer } from './CoursesCounterIncrementer';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';

export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private incrementer: CoursesCounterIncrementer) {}

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId));
  }

  subscribedTo(): Array<DomainEventClass> {
    return [CourseCreatedDomainEvent];
  }
}
