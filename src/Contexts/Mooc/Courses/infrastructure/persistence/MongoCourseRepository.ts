import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';

import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  public save(course: Course): Promise<void> {
    return this.persist(course.id.value, course);
  }

  protected collectionName(): string {
    return 'courses';
  }
}
