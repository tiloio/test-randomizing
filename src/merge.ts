import { isJestAsymmetricMatcher } from "./jest.ts";
import { DeepPartial } from "./types/deep-partial.ts";

export const merge = <T>(
  sourceObject: T,
  overrideObject?: DeepPartial<T>,
  freeze?: boolean,
): T => {
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
};

const deepMerge = <T>(
  source: DeepPartial<T>,
  result: T,
  key: keyof T,
  freeze: boolean | undefined,
) => {
  const element = mergeIfMergeable(source, result, key, freeze);
  return addKey(result, key, element, freeze);
};

const mergeIfMergeable = <T>(
  source: DeepPartial<T>,
  result: T,
  key: keyof T,
  freeze: boolean | undefined,
) => {
  const element = source[key];
  return assignDeeply(element) ? merge(result[key]!, element, freeze) : element;
};

const addKey = <T>(
  result: T,
  key: keyof T,
  element: DeepPartial<T[keyof T]> | undefined,
  freeze: boolean | undefined,
): T => ({
  ...result,
  [key]: freezeIfNeeded(element, freeze),
});

const assignDeeply = <T>(newElement: DeepPartial<T> | undefined) =>
  typeof newElement === "object" &&
  newElement !== null &&
  !Array.isArray(newElement) &&
  !isJestAsymmetricMatcher(newElement);

const freezeIfNeeded = <T>(obj: T, freeze?: boolean) =>
  freeze ? Object.freeze(obj) : obj;

const hasKey = <T>(
  overrideObject: DeepPartial<T>,
  key: string | number | symbol,
) => !Object.prototype.hasOwnProperty.call(overrideObject, key);
