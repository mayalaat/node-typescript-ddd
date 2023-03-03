import { CoursesCounterTotal } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { NumberMother } from '../../../Shared/domain/NumberMother';

export class CoursesCounterTotalMother {
  static random() {
    return new CoursesCounterTotal(NumberMother.random());
  }
}
