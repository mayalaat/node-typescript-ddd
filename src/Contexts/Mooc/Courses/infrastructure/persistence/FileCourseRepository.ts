import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { deserialize, serialize } from 'bson';
import * as fs from 'fs';

export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  async save(course: Course): Promise<void> {
    await fs.promises.writeFile(this.filePath(course.id.value), serialize(course));
  }

  async search(courseId: string): Promise<Course> {
    const courseData = await fs.promises.readFile(this.filePath(courseId));
    const { id, name, duration } = deserialize(courseData);

    return new Course(id, name, duration);
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
