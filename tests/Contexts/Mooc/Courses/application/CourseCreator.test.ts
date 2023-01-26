import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

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

    const course = new Course(new CourseId(id), name, duration);

    await creator.run({ id: id, name, duration });

    repository.assertSaveHaveBeenCalledWith(course);
  });
});
