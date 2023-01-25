import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const course = new Course('id', 'name', 'duration');
    const repository = new FileCourseRepository();

    await repository.save(course);

    const savedCourse = await repository.search('id');
    expect(course).toEqual(savedCourse);
  });
});
