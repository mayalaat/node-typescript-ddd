import { MotherCreator } from './MotherCreator';

export class UuidMother {
  static random(): string {
    return MotherCreator.builder().datatype.uuid();
  }
}
