import { NumberMother } from './NumberMother';

export class Repeater {
  static random(callable: Function) {
    return Array(NumberMother.random(20))
      .fill({})
      .map(() => callable());
  }
}
