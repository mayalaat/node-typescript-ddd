import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository);
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const id = '99c47fb7-9f59-412c-9da9-85ce494615b8';
    const name = 'some-name';
    const duration = 'some-duration';

    const course = new Course(new CourseId(id), new CourseName(name), new CourseDuration(duration));

    await creator.run({id: id, name, duration});

    repository.assertSaveHaveBeenCalledWith(course);
  });

  it('should throw error if course name length is exceeded', () => {
    const id = '99c47fb7-9f59-412c-9da9-85ce494615b8';
    const name = 'some-name'.repeat(30);
    const duration = 'some-duration';

    expect(() => {
      const course = new Course(new CourseId(id), new CourseName(name), new CourseDuration(duration));

      creator.run({id: id, name, duration});

      repository.assertSaveHaveBeenCalledWith(course);
    }).toThrow(CourseNameLengthExceeded);
  });
});
