import { isJestAsymmetricMatcher } from "./jest.ts";
import { DeepPartial } from "./types/deep-partial.ts";

export type MergeOptions = {
  freeze?: boolean;
};

/**
 * Deeply merges and optonally freezes (with Object.freeze()) two objects into one.
 *
 * @param sourceObject The object which has all properties.
 * @param overrideObject The object which has a subset of the properties of the source object.
 * @returns A object with all attributes from the override object and the rest of the soruce object, optional deeply freezed.
 */
export function merge<T>(
  sourceObject: T,
  overrideObject?: DeepPartial<T>,
  options?: MergeOptions,
): T {
  const freeze = options?.freeze ?? false;

  if (!overrideObject && !freeze) return { ...sourceObject };

  return freezeIfNeeded(
    Object.keys(sourceObject).reduce((result, untypedKey) => {
      const key = untypedKey as keyof typeof sourceObject;

      if (!overrideObject || hasKey(overrideObject, key)) {
        return deepMerge(sourceObject, result, key, freeze);
      }

      return deepMerge(overrideObject, result, key, freeze);
    }, sourceObject),
    freeze,
  );
}

const deepMerge = <T>(
  source: DeepPartial<T>,
  result: T,
  key: keyof T,
  freeze: boolean,
) => {
  const element = mergeIfMergeable(source, result, key, freeze);
  return addKey(result, key, element, freeze);
};

const mergeIfMergeable = <T>(
  source: DeepPartial<T>,
  result: T,
  key: keyof T,
  freeze: boolean,
) => {
  const element = source[key];
  return assignDeeply(element)
    ? merge(result[key]!, element, { freeze: freeze })
    : element;
};

const addKey = <T>(
  result: T,
  key: keyof T,
  element: DeepPartial<T[keyof T]> | undefined,
  freeze: boolean,
): T => ({
  ...result,
  [key]: freezeIfNeeded(element, freeze),
});

const assignDeeply = <T>(newElement: DeepPartial<T> | undefined) =>
  typeof newElement === "object" &&
  newElement !== null &&
  !Array.isArray(newElement) &&
  !isJestAsymmetricMatcher(newElement);

const freezeIfNeeded = <T>(obj: T, freeze: boolean) =>
  freeze ? Object.freeze(obj) : obj;

const hasKey = <T>(
  overrideObject: DeepPartial<T>,
  key: string | number | symbol,
) => !Object.prototype.hasOwnProperty.call(overrideObject, key);
