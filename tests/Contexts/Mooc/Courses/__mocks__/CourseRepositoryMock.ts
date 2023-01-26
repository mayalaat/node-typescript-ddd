import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';

export class CourseRepositoryMock implements CourseRepository {
  private readonly mockSave: jest.Mock;

  constructor() {
    this.mockSave = jest.fn();
  }

  async save(course: Course): Promise<void> {
    this.mockSave(course);
  }

  assertSaveHaveBeenCalledWith(expectedCourse: Course) {
    expect(this.mockSave).toBeCalledWith(expectedCourse);
  }
}
