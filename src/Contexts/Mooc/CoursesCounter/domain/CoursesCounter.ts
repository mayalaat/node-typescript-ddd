import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CoursesCounterTotal } from './CoursesCounterTotal';
import { CoursesCounterId } from './CoursesCounterId';
import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId;
  readonly existingCourses: Array<CourseId>;
  total: CoursesCounterTotal;

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses?: Array<CourseId>) {
    super();
    this.id = id;
    this.total = total;
    this.existingCourses = existingCourses || [];
  }

  static initialize(coursesCounterId: CoursesCounterId): CoursesCounter {
    return new CoursesCounter(coursesCounterId, CoursesCounterTotal.initialize());
  }

  static fromPrimitives(data: { id: string; total: number; existingCourses: string[] }): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map(entry => new CourseId(entry))
    );
  }

  increment(courseId: CourseId) {
    this.total = this.total.increment();
    this.existingCourses.push(courseId);
  }

  hasIncremented(courseId: CourseId): boolean {
    const exists = this.existingCourses.find(entry => entry.value === courseId.value);
    return exists !== undefined;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingCourses: this.existingCourses.map(courseId => courseId.value)
    };
  }
}
