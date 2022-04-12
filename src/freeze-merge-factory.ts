import { DeepPartial, freezeMerge } from "../mod.ts";

/**
 * A factory which creates a function to deeply merge and freeze (with Object.freeze()) two objects into one.
 *
 * @param source The object which has all properties.
 * @param override The object which has a subset of the properties of the source object.
 * @returns {Function} A function which deeply freezes objects with all attributes from the override object and the rest of the soruce object.
 */
export function freezeMergeFactory<T>(source: T) {
  return (override?: DeepPartial<T>) => freezeMerge(source, override);
}
