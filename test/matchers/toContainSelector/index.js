import { printExpected } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = expected => () =>
  `Expected ${printExpected(expected)} not to be found`;

const failMessage = expected => () =>
  `Expected ${printExpected(expected)} to be found`;

export default async function toContainSelector(receiver, expected) {
  const pass = await predicate(receiver, expected);
  return {
    message: pass ? passMessage(expected) : failMessage(expected),
    pass,
  };
}
