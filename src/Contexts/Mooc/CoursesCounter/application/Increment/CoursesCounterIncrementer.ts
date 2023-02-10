import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CoursesCounterRepository } from '../../domain/CoursesCounterRepository';
import { CoursesCounter } from '../../domain/CoursesCounter';
import { CoursesCounterId } from '../../domain/CoursesCounterId';

export class CoursesCounterIncrementer {
  constructor(private repository: CoursesCounterRepository) {}

  async run(courseId: CourseId) {
    const counter = (await this.repository.search()) || this.initializeCounter();

    if (!counter.hasIncremented(courseId)) {
      counter.increment(courseId);

      await this.repository.save(counter);
    }
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random());
  }
}
