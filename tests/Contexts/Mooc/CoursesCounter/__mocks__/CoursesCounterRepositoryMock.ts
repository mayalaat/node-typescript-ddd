import { CoursesCounterRepository } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterRepository';
import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class CoursesCounterRepositoryMock implements CoursesCounterRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private coursesCounter: Nullable<CoursesCounter> = null;

  async save(counter: CoursesCounter): Promise<void> {
    this.mockSave(counter);
  }

  async search(): Promise<Nullable<CoursesCounter>> {
    this.mockSearch();
    return this.coursesCounter;
  }

  returnOnSearch(counter: CoursesCounter) {
    this.coursesCounter = counter;
  }

  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled();
  }

  assertLastCoursesCounterSaved(counter: CoursesCounter) {
    const mock = this.mockSave.mock;
    const lastCoursesCounter = mock.calls[mock.calls.length - 1][0] as CoursesCounter;
    const { id: id1, ...counterPrimitives } = counter.toPrimitives();
    const { id: id2, ...lastSavedPrimitives } = lastCoursesCounter.toPrimitives();

    expect(lastCoursesCounter).toBeInstanceOf(CoursesCounter);
    expect(lastSavedPrimitives).toEqual(counterPrimitives);
  }

  assertNotSave() {
    expect(this.mockSave).toHaveBeenCalledTimes(0);
  }
}
