import { stringToBytes } from '@massalabs/as-types';
import { trigger_value,init, Increment,event_test } from '../contracts/main';

describe('Group test', () => {
  init([]);
  test('Testing trigger_value', () => {
    expect(trigger_value([])[0]).toBe(0);
  });
  test('increment', () => {
    Increment(1);
    expect(trigger_value([])[0]).toBe(1);
    
  });
});
