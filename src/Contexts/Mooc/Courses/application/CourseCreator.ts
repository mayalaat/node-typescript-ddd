import { Course } from '../domain/Course';
import { CourseRepository } from '../domain/CourseRepository';
import { CourseCreatorRequest } from './CourseCreatorRequest';
import { CourseId } from '../../Shared/domain/Courses/CourseId';

export class CourseCreator {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run(request: CourseCreatorRequest): Promise<void> {
    const course = new Course(new CourseId(request.id), request.name, request.duration);

    return this.repository.save(course);
  }
}
