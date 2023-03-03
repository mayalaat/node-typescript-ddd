import { CoursesCounterId } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterId';
import { UuidMother } from '../../../Shared/domain/UuidMother';

export class CoursesCounterIdMother {
  static random(): CoursesCounterId {
    return new CoursesCounterId(UuidMother.random());
  }
}
