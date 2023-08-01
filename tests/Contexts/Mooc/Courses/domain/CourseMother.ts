import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CreateCourseCommand } from '../../../../../src/Contexts/Mooc/Courses/domain/CreateCourseCommand';

export class CourseMother {
  static create(id: CourseId, name: CourseName, duration: CourseDuration): Course {
    return Course.create(id, name, duration);
  }

  static fromCommand(command: CreateCourseCommand) {
    return new Course(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.create(command.duration)
    );
  }

  static random(): Course {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
