import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { CourseDocument } from './mongo/CourseDocument';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Collection } from 'mongodb';

export class MongoCourseRepository extends MongoRepository<CourseDocument> implements CourseRepository {
  public async save(course: Course): Promise<void> {
    const document = toPersistence(course);

    const collection = await this.coursesCollection();

    await this.persist(document, collection);
  }

  private async coursesCollection(): Promise<Collection<CourseDocument>> {
    return this.collection('courses');
  }
}

const toPersistence = (source: Course): CourseDocument => ({
  _id: source.id.value,
  name: source.name.value,
  duration: source.duration.value
});
