import { DeepPartial } from "./deep-partial.ts";
/** Use to build random Functions like:
 * ```ts
 * import {
 *   DeepPartial,
 *   freezeMerge,
 *   RandomFn,
 * } from "https://x.nest.land/test_randomizing@0.4.0/mod.ts";
 * import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
 *
 * const randomPerson: RandomFn<Person> = (override?: DeepPartial<Person>) =>
 * freezeMerge({
 *   firstName: faker.name.firstName(),
 *   lastName: faker.name.lastName(),
 *   companyName: faker.company.companyName(),
 * }, override);
 * ```
 */
export type RandomFn<OBJ_TYPE> = (
  override?: DeepPartial<OBJ_TYPE>,
) => Readonly<OBJ_TYPE>;
