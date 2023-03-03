import { CoursesCounterFinder } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterResponseMother } from './CoursesCounterResponseMother';
import { CoursesCounterNotExist } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';

describe('CoursesCounter Finder', () => {
  let finder: CoursesCounterFinder;
  let repository: CoursesCounterRepositoryMock;

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock();
    finder = new CoursesCounterFinder(repository);
  });

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random();
    const expected = CoursesCounterResponseMother.create(counter.total);

    repository.returnOnSearch(counter);

    const received = await finder.run();

    repository.assertSearch();
    expect(expected).toEqual(received);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    await expect(finder.run()).rejects.toBeInstanceOf(CoursesCounterNotExist);
  });
});
