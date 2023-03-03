import { MotherCreator } from './MotherCreator';

export class NumberMother {
  static random(max?: number) {
    return MotherCreator.builder().datatype.number({ max: max });
  }
}
