import { DeepPartial } from "./types/deep-partial.ts";
import { merge } from "./merge.ts";

/**
 * Deeply merges and freezes (with Object.freeze()) two objects into one.
 * 
 * @param source The object which has all properties.
 * @param override The object which has a subset of the properties of the source object.
 * @returns A deeply freezed object with all attributes from the override object and the rest of the soruce object.
 */
export const freezeMerge = <T>(source: T, override?: DeepPartial<T>) =>
  merge(source, override, true) as Readonly<T>;
