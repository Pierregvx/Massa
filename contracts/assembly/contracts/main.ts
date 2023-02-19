import { Args, i32ToBytes, stringToBytes, u32ToBytes } from '@massalabs/as-types';
import { Storage, generateEvent } from '@massalabs/massa-as-sdk';

export function initialize(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  Storage.set(stringToBytes("0"), u32ToBytes(0));
  Storage.set(stringToBytes('counter'), u32ToBytes(0));
  generateEvent('Initialized');
  return []
}
export function getStoredValue(_: StaticArray<u8>,name:string): u32 {
  let value = Storage.get(stringToBytes(name))
  
  let value_deserialized = new Args(value);
  let valueNumber = value_deserialized.nextU32().unwrap();
  return valueNumber;
}

export function Increment(binaryArgs:StaticArray<u8>): StaticArray<u8> {
  const counter = getStoredValue([],"counter");
  const storedNumber = getStoredValue([],counter.toString());
  const increment = new Args(binaryArgs).nextU32().expect('Invalid increment');
  const result = add(storedNumber, increment);
  generateEvent(
    `Sum (${storedNumber.toString()}, ${increment.toString()}) = ${result.toString()}`,
  );
  Storage.set(stringToBytes((counter+1).toString()), u32ToBytes(result));
  Storage.set(stringToBytes('counter'), u32ToBytes(counter+1));
  return i32ToBytes(result);
}
export function getOneValue(binaryArgs:StaticArray<u8>): StaticArray<u8> {
  const val = new Args(binaryArgs).nextU32().expect('Invalid increment');
  const result = getStoredValue([],val.toString());
  generateEvent(result.toString());
  return u32ToBytes(result);
}
export function trigger_value(_: StaticArray<u8>): string {
  let message = ""
  const counter = getStoredValue([],"counter");
  generateEvent("counter value" + counter.toString());
  for(let i:u32=0;i<counter+1;i++){
   generateEvent(getStoredValue([],i.toString()).toString());
  }
  generateEvent(message);
  return message;
}
