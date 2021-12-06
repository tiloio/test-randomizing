export type DeepPartial<OBJ_TYPE> = {
  [OBJ_KEY in keyof OBJ_TYPE]?: DeepPartial<OBJ_TYPE[OBJ_KEY]>;
};
