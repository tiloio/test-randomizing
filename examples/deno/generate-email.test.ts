import { freezeMergeFactory } from "https://x.nest.land/test_randomizing@0.5.0/mod.ts";
// or via deno.land "https://deno.land/x/test_randomizing@0.5.0/mod.ts"
// or via Arweave "https://arweave.net/S_ht0jVRH-4Z-LmwEWSI5q0d6jgB8y-j2MLP73h_pnI/mod.ts"
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { assertEquals } from "https://deno.land/x/std@0.119.0/testing/asserts.ts";
import { generateEmail } from "./generate-email.ts";

const randomPerson = freezeMergeFactory<Person>({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  companyName: faker.company.companyName(),
});

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
