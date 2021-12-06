import { DeepPartial } from "./types/deep-partial.ts";
import { merge } from "./merge.ts";


export const freezeMerge = <T>(source: T, override?: DeepPartial<T>) => Object.freeze(merge(source, override)) as Readonly<T>;
