import { DeepPartial } from "./types/deep-partial.ts";
import { merge } from "./merge.ts";

export const freezeMerge = <T>(source: T, override?: DeepPartial<T>) =>
  merge(source, override, true) as Readonly<T>;
