import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseNameMother } from '../domain/CourseNameMother';
import { CourseDurationMother } from '../domain/CourseDurationMother';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/domain/CreateCourseCommand';

export class CreateCourseCommandMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): CreateCourseCommand {
    return { id: id.value, name: name.value, duration: duration.value };
  }

  static random(): CreateCourseCommand {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }

  static invalidRequest(): CreateCourseCommand {
    return {
      id: CourseIdMother.random().value,
      name: CourseNameMother.invalidName(),
      duration: CourseDurationMother.random().value
    };
  }
}
