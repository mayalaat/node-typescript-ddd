import * as faker from 'faker';

export class MotherCreator {
  static builder(): Faker.FakerStatic {
    return faker;
  }
}
