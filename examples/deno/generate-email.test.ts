import {
  DeepPartial,
  freezeMerge,
  RandomFn,
} from "https://deno.land/x/test_randomizing@0.2.1/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
import { generateEmail } from "./generate-email.ts";

const randomPerson: RandomFn<Person> = (override?: DeepPartial<Person>) =>
  freezeMerge({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    companyName: faker.company.companyName(),
  }, override);

Deno.test("consist of firstname.lastname@companyname.com", () => {
  const person = randomPerson({
    firstName: "steve",
    lastName: "jobs",
    companyName: "apple",
  });

  const email = generateEmail(person);

  assertEquals(email, "steve.jobs@apple.com");
});

Deno.test("returns undefined if firstName and lastName is empty", () => {
  const person = randomPerson({ firstName: "", lastName: "" });

  const email = generateEmail(person);

  assertEquals(email, undefined);
});

Deno.test("returns undefined if companyName is empty", () => {
  const person = randomPerson({ companyName: "" });

  const email = generateEmail(person);

  assertEquals(email, undefined);
});
