import { NumberMother } from './NumberMother';

export class Repeater {
  static random(callable: Function, iterations: number) {
    return Array(iterations || NumberMother.random(20))
      .fill({})
      .map(() => callable());
  }
}
