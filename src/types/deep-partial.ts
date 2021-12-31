/**
 * Like [Partial<>]{@link https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype} but also for nested objects.
 */
export type DeepPartial<OBJ_TYPE> = {
  [OBJ_KEY in keyof OBJ_TYPE]?: DeepPartial<OBJ_TYPE[OBJ_KEY]>;
};
