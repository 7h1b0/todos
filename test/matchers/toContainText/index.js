import { printExpected } from 'jest-matcher-utils';
import predicate from './predicate';

const passMessage = text => () =>
  `Expected ${printExpected(text)} not to be found`;

const failMessage = text => () => `Expected ${printExpected(text)} to be found`;

export default async function toContainText(receiver, text) {
  const pass = await predicate(receiver, text);
  return {
    message: pass ? passMessage(text) : failMessage(text),
    pass,
  };
}
