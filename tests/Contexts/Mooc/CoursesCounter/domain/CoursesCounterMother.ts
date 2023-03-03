import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { CoursesCounterIdMother } from './CoursesCounterIdMother';
import { CoursesCounterTotalMother } from './CoursesCounterTotalMother';

export class CoursesCounterMother {
  static random() {
    return new CoursesCounter(CoursesCounterIdMother.random(), CoursesCounterTotalMother.random(), []);
  }
}
