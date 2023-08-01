import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseName } from '../domain/CourseName';
import { CourseDuration } from '../domain/CourseDuration';
import { EventBus } from '../../../Shared/domain/EventBus';

export class CourseCreator {
  private repository: CourseRepository;
  private eventBus: EventBus;

  constructor(repository: CourseRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(params: { id: CourseId; name: CourseName; duration: CourseDuration }): Promise<void> {
    const course = Course.create(params.id, params.name, params.duration);

    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
