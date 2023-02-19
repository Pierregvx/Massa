import { i32ToBytes } from '@massalabs/as-types';
import { trigger_value,initialize, Increment, getStoredValue } from '../contracts/main';

describe('Group test', () => {
  initialize([]);
  test('Testing trigger_value', () => {
    trigger_value([]);
    console.log(getStoredValue([],"0").toString());

    

  });
  test('increment', () => {
    
  //  getStoredNumber2([]).forEach((element) => {
  //     console.log(element.toString());
  //   });

  });
});
