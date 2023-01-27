import { CourseCreatorRequest } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreatorRequest';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseNameMother } from '../domain/CourseNameMother';
import { CourseDurationMother } from '../domain/CourseDurationMother';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';

export class CourseCreatorRequestMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): CourseCreatorRequest {
    return { id: id.value, name: name.value, duration: duration.value };
  }

  static random(): CourseCreatorRequest {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }

  static invalidRequest(): CourseCreatorRequest {
    return {
      id: CourseIdMother.random().value,
      name: CourseNameMother.invalidName(),
      duration: CourseDurationMother.random().value
    };
  }
}
