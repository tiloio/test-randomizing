# test-randomizing

Test randomizing helps you to build randomized objects for your tests.

- ✅ 0 Dependencies
- ✅ JavaScript
- ✅ TypeScript
- ✅ Deno
- ✅ Node.js
- ✅ esm
- ✅ Browser

## 🏗 Install

### Deno ([nest.land](https://nest.land/package/test_randomizing) and [deno.land](https://deno.land/x/test_randomizing))

```javascript
import {
  freezeMerge,
  merge,
  RandomFn,
} from "https://x.nest.land/test_randomizing@0.4.0/mod.ts";
// or
import {
  freezeMerge,
  merge,
  RandomFn,
} from "https://deno.land/x/test_randomizing@0.2.1/mod.ts";
```

### Node.js ([npm.js](https://www.npmjs.com/package/test-randomizing))

```sh
npm install --save-dev test-randomizing
# or
yarn add --dev test-randomizing
```

## 🤷🏽‍♂️ How to use

You can use test randomizing in JavaScript and TypeScript projects.

We recommend using a library (like
[faker.js](https://github.com/marak/Faker.js/) or deno port
[deno_faker](https://deno.land/x/deno_faker@v1.0.3)) to create randomized
objects.

Deno example
[`./examples/deno`](https://github.com/tiloio/test-randomizing/tree/main/examples/deno):

```typescript
import {
  DeepPartial,
  freezeMerge,
  RandomFn,
} from "https://x.nest.land/test_randomizing@0.4.0/mod.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";

// Implementation
const generateEmail = (person: Person) => {
  if (!person.companyName || (!person.firstName && !person.lastName)) {
    return undefined;
  }

  return `${person.firstName}.${person.lastName}@${person.companyName}.com`;
};

// Types
type Person = {
  firstName: string;
  lastName: string;
  companyName: string;
};

// Test code
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
```

Typescript Node.js example
[`./examples/nodejs-ts`](https://github.com/tiloio/test-randomizing/tree/main/examples/nodejs-ts):

```typescript
import { DeepPartial, freezeMerge, RandomFn } from "test-randomizing";
import { company, name } from "faker";

// Implementation
const generateEmail = (person: Person) => {
  if (!person.companyName || (!person.firstName && !person.lastName)) {
    return undefined;
  }

  return `${person.firstName}.${person.lastName}@${person.companyName}.com`;
};

// Types
type Person = {
  firstName: string;
  lastName: string;
  companyName: string;
};

// Test code
const randomPerson: RandomFn<Person> = (override?: DeepPartial<Person>) =>
  freezeMerge({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    companyName: faker.company.companyName(),
  }, override);

test("consist of firstname.lastname@companyname.com", () => {
  const person = randomPerson({
    firstName: "steve",
    lastName: "jobs",
    companyName: "apple",
  });

  const email = generateEmail(person);

  expect(email).toEqual("steve.jobs@apple.com");
});

test("returns undefined if firstName and lastName is empty", () => {
  const person = randomPerson({ firstName: "", lastName: "" });

  const email = generateEmail(person);

  expect(email).toBeUndefined();
});

test("returns undefined if companyName is empty", () => {
  const person = randomPerson({ companyName: "" });

  const email = generateEmail(person);

  expect(email).toBeUndefined();
});
```

More complete examples in the `./examples` directory:

- NodeJS TypeScript
  [`./examples/nodejs-ts`](https://github.com/tiloio/test-randomizing/tree/main/examples/nodejs-ts)
- Deno
  [`./examples/deno`](https://github.com/tiloio/test-randomizing/tree/main/examples/deno)

## License

MIT License

Copyright (c) 2021 Ti/o

# Development

Use `vr` ([Velociraptor](https://velociraptor.run/)) to run all commands like `vr check` and `vr publish`.
