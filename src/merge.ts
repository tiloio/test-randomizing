import { isJestAsymmetricMatcher } from "./jest.ts";
import { DeepPartial } from "./types/deep-partial.ts";

export const merge = <T>(sourceObject: T, overrideObject?: DeepPartial<T>): T => {
  if (!overrideObject) return { ...sourceObject };

  return Object.keys(overrideObject).reduce((result, untypedKey) => {
    const key = untypedKey as keyof typeof sourceObject;
    const newElement = overrideObject[key]!;

    return {
      ...result,
      [key]: assignDeeply(newElement) ? merge(result[key], newElement) : (newElement as any)
    };
  }, sourceObject) as T;
};

const assignDeeply = <T>(newElement: DeepPartial<T>) =>
  typeof newElement === 'object' &&
  newElement !== null &&
  !Array.isArray(newElement) &&
  isJestAsymmetricMatcher(newElement);


