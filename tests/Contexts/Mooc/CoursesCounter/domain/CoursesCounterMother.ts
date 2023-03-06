import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { CoursesCounterIdMother } from './CoursesCounterIdMother';
import { CoursesCounterTotalMother } from './CoursesCounterTotalMother';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CoursesCounterTotal } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { Repeater } from '../../../Shared/domain/Repeater';
import { CoursesCounterId } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterId';

export class CoursesCounterMother {
  static random() {
    const id = CoursesCounterIdMother.random();
    const total = CoursesCounterTotalMother.random();
    return new CoursesCounter(id, total, Repeater.random(CourseIdMother.creator(), total.value));
  }

  static withOne(courseId: CourseId) {
    return new CoursesCounter(CoursesCounterId.random(), new CoursesCounterTotal(1), [courseId]);
  }
}
