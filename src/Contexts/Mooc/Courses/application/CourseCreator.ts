import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class CourseCreator {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run(request: CourseCreatorRequest): Promise<void> {
    const course = new Course(new Uuid(request.id), request.name, request.duration);

    return this.repository.save(course);
  }
}
