import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseMother } from './CourseMother';

export class CourseCreatedDomainEventMother {
  static create(): CourseCreatedDomainEvent {
    return this.fromCourse(CourseMother.random());
  }

  static fromCourse(course: Course): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId: course.id.value,
      duration: course.duration.value,
      name: course.name.value
    });
  }
}
