import { Args, i32ToBytes, stringToBytes, toBytes } from '@massalabs/as-types';
import { Storage, generateEvent } from '@massalabs/massa-as-sdk';

export function init(binaryArgs: StaticArray<u8>): void {

  Storage.set(stringToBytes('last result'), i32ToBytes(0));
}
export function getStoredNumber(_: StaticArray<u8>): u32 {
  const lastResult = Storage.get(stringToBytes('last result'));
  let value = Storage.get(stringToBytes("last result"));
  let value_deserialized = new Args(value);
  let valueNumber = value_deserialized.nextU32().unwrap();
  return valueNumber;
}
export function Increment(b:u32): StaticArray<u8> {
  // const args = new Args(binaryArgs);
  
  // const b = args.nextU32().expect('Argument b is missing or invalid');
  const storedNumber = getStoredNumber([]);
  const result = add(storedNumber, b);
  generateEvent(
    `Sum (${storedNumber.toString()}, ${b.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes('last result'), i32ToBytes(result));
  return i32ToBytes(result);
}
export function trigger_value(_: StaticArray<u8>): StaticArray<u8> {
  
  let value = getStoredNumber(_);
  generateEvent(value.toString());
  return i32ToBytes(value);
}
export function event_test(_: StaticArray<u8>): StaticArray<u8> {
  generateEvent('Hello World!');
  return stringToBytes('Hello World!');
}