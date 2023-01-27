import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const course = new Course(
      new CourseId('99c47fb7-9f59-412c-9da9-85ce494615b8'),
      new CourseName('name'),
      new CourseDuration('duration')
    );
    const repository = new FileCourseRepository();

    await repository.save(course);

    const savedCourse = await repository.search('99c47fb7-9f59-412c-9da9-85ce494615b8');
    expect(course).toEqual(savedCourse);
  });
});
