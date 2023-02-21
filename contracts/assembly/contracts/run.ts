import { Args } from '@massalabs/as-types';
import { Address, call, generateEvent } from '@massalabs/massa-as-sdk';

export function constructor(): StaticArray<u8> {
  generateEvent("run")
  main();
  return [];
}
export function main(): StaticArray<u8> {
  const address = new Address(
    'A122gEnEasopddai2Ytx6Hdme4uMoP5okJZZLzPEsY9Aj5MhoSLU',
  );
  let args = new Args().add(12);

  //  call(address, 'initialize', new Args(), 0);
  //  call(address,"trigger_value",new Args(),0);
  // // call(address, 'event_test', new Args(), 0);
  call(address, 'Increment', args, 0);
  call(address, "trigger_value", new Args(), 0);
  call(address, 'Increment', args, 0);
  call(address, "trigger_value", new Args(), 0);
  //     call(address, 'Increment',new Args([1]), 0);


  return [];
}