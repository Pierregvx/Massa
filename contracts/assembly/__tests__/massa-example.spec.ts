import { stringToBytes } from '@massalabs/as-types';
import { trigger_value, increment } from '../contracts/main';

describe('Group test', () => {
  test('Testing trigger_value', () => {
    expect(trigger_value([])).toStrictEqual(stringToBytes('0'));
  });
  test('increment', () => {
    increment(3);
    expect(trigger_value([])).toStrictEqual(stringToBytes('3'));
  });
});
