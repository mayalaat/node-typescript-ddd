import { CoursesCounterTotal } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal';
import { CoursesCounterResponse } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterResponse';

export class CoursesCounterResponseMother {
  static create(total: CoursesCounterTotal): CoursesCounterResponse {
    return new CoursesCounterResponse(total.value);
  }
}
