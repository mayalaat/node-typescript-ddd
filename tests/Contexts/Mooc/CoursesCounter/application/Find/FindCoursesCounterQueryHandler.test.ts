import { CoursesCounterFinder } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterNotExist } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { FindCoursesCounterQuery } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { FindCoursesCounterQueryHandler } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQueryHandler';

describe('FindCoursesCounterQueryHandler', () => {
  let repository: CoursesCounterRepositoryMock;
  let finder: CoursesCounterFinder;
  let handler: FindCoursesCounterQueryHandler;

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock();
    finder = new CoursesCounterFinder(repository);
    handler = new FindCoursesCounterQueryHandler(finder);
  });

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random();
    repository.returnOnSearch(counter);

    const response = await handler.handle(new FindCoursesCounterQuery());

    repository.assertSearch();
    expect(counter.total.value).toEqual(response.total);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    await expect(handler.handle(new FindCoursesCounterQuery())).rejects.toBeInstanceOf(CoursesCounterNotExist);
  });
});
