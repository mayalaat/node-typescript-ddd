import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreatorRequest } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreatorRequest';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    return new Course(id, name, duration);
  }

  static fromRequest(request: CourseCreatorRequest): Course {
    return new Course(
      CourseIdMother.create(request.id),
      CourseNameMother.create(request.name),
      CourseDurationMother.create(request.duration)
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
