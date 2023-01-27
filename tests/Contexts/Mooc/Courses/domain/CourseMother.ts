import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreatorRequest } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreatorRequest';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';

export class CourseMother {
  static fromRequest(request: CourseCreatorRequest): Course {
    return new Course(
      CourseIdMother.create(request.id),
      CourseNameMother.create(request.name),
      CourseDurationMother.create(request.duration)
    );
  }
}
