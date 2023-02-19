import { trigger_value,initialize, Increment } from '../contracts/main';

describe('Group test', () => {
  initialize([]);
  test('Testing trigger_value', () => {
    expect(trigger_value([])[0]).toBe(0);
  });
  test('increment', () => {
    Increment(1);
    expect(trigger_value([])[0]).toBe(1);
  });
});
