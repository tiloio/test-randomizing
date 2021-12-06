import { DeepPartial } from "./deep-partial.ts";

export type RandomFn<OBJ_TYPE> = (override?: DeepPartial<OBJ_TYPE>) => Readonly<OBJ_TYPE>;
