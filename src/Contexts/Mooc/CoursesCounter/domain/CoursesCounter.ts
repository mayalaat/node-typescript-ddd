import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CoursesCounterTotal } from './CoursesCounterTotal';
import { CoursesCounterId } from './CoursesCounterId';

export class CoursesCounter {
  readonly id: CoursesCounterId;
  readonly total: CoursesCounterTotal;
  readonly existingCourses: Array<CourseId>;

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses: Array<CourseId>) {
    this.id = id;
    this.total = total;
    this.existingCourses = existingCourses;
  }

  static initialize(coursesCounterId: CoursesCounterId): CoursesCounter {
    throw new Error('Method not implemented.');
  }

  increment(courseId: CourseId) {
    throw new Error('Method not implemented.');
  }

  hasIncremented(courseId: CourseId): boolean {
    throw new Error('Method not implemented.');
  }
}
