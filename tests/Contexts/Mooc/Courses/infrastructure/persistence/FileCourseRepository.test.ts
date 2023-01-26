import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { FileCourseRepository } from '../../../../../../src/Contexts/Mooc/Courses/infrastructure/persistence/FileCourseRepository';
import { Uuid } from '../../../../../../src/Contexts/Shared/domain/value-object/Uuid';

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    const course = new Course(new Uuid('99c47fb7-9f59-412c-9da9-85ce494615b8'), 'name', 'duration');
    const repository = new FileCourseRepository();

    await repository.save(course);

    const savedCourse = await repository.search('99c47fb7-9f59-412c-9da9-85ce494615b8');
    expect(course).toEqual(savedCourse);
  });
});
