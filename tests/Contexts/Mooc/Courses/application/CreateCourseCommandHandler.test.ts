import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CreateCourseCommandMother } from './CreateCourseCommandMother';
import { CourseMother } from '../domain/CourseMother';
import { CourseNameLengthExceeded } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNameLengthExceeded';
import EventBusMock from '../__mocks__/EventBusMock';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { CreateCourseCommandHandler } from '../../../../../src/Contexts/Mooc/Courses/application/CreateCourseCommandHandler';

let repository: CourseRepositoryMock;
let creator: CourseCreator;
let handler: CreateCourseCommandHandler;
let eventBus: EventBusMock;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  eventBus = new EventBusMock();
  creator = new CourseCreator(repository, eventBus);
  handler = new CreateCourseCommandHandler(creator);
});

describe('CreateCourseCommandHandler', () => {
  it('should create a valid course', async () => {
    const command = CreateCourseCommandMother.random();
    const course = CourseMother.fromCommand(command);
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course);

    await handler.handle(command);

    repository.assertSaveHaveBeenCalledWith(course);
    eventBus.assertLastPublishedEventIs(domainEvent);
  });

  it('should throw error if course name length is exceeded', async () => {
    expect(() => {
      const command = CreateCourseCommandMother.invalidRequest();
      const course = CourseMother.fromCommand(command);

      handler.handle(command);

      repository.assertSaveHaveBeenCalledWith(course);
    }).toThrow(CourseNameLengthExceeded);
  });
});
