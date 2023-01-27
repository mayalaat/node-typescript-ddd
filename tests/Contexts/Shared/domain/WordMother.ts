import { MotherCreator } from './MotherCreator';

export class WordMother {
  static random(maxLength: number = 1) {
    return MotherCreator.builder().lorem.words(maxLength);
  }
}
