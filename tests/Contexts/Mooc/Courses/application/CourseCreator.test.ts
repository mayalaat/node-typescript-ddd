import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseCreatorRequestMother } from './CourseCreatorRequestMother';
import { CourseMother } from '../domain/CourseMother';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';
import EventBusMock from '../__mocks__/EventBusMock';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';

let repository: CourseRepositoryMock;
let creator: CourseCreator;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CourseRepositoryMock();
  creator = new CourseCreator(repository, eventBus);
});

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const request = CourseCreatorRequestMother.random();
    const course = CourseMother.fromRequest(request);
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(course);
    eventBus.assertLastPublishedEventIs(domainEvent);
  });

  it('should throw error if course name length is exceeded', () => {
    expect(() => {
      const request = CourseCreatorRequestMother.invalidRequest();

      const course = CourseMother.fromRequest(request);

      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(course);
    }).toThrow(CourseNameLengthExceeded);
  });
});
