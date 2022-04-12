<h1 align="center">
  test-randomizing
</h1>
<p align="center">
  Helps you to build randomized objects for your tests.
</p>

<p align="center">
 <a href="https://github.com/tiloio/test-randomizing/releases"><img alt="GitHub release" src="https://img.shields.io/github/v/release/tiloio/test-randomizing?logo=github"></a>
 <a href="https://github.com/tiloio/test-randomizing"><img alt="GitHub stars" src="https://img.shields.io/github/stars/tiloio/test-randomizing?logo=github"></a>
 <a href="#badge"><img alt="vr scripts" src="https://badges.velociraptor.run/flat.svg"/></a>
 <a href="https://doc.deno.land/https://deno.land/x/test_randomizing/mod.ts"><img alt="deno docs" src="https://img.shields.io/badge/Deno-doc-informational?logo=deno"/></a>
 <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-success"/></a>
 <img alt="0 dependencies" src="https://img.shields.io/badge/dependencies-0-success"/>
</p>

<p align="center"> 
<img alt="works in with esm, cjs..." src="https://img.shields.io/badge/JavaScript-all-success?logo=javascript">
<img alt="works in with esm, cjs..." src="https://img.shields.io/badge/TypeScript-%5E2.0.0-success?logo=typescript">
<img alt="works with Node.js" src="https://img.shields.io/badge/Node.js-%5E12.0.0-success?logo=node.js">
<img alt="works with Deno" src="https://img.shields.io/badge/Deno-%5E1.0.0-success?logo=deno">
</p>

<p align="center">
  <a href="https://nest.land/package/test_randomizing"><img alt="published on nest.land" src="https://nest.land/badge.svg"></a>
 <a href="https://deno.land/x/test_randomizing"><img alt="published on deno.land" src="https://img.shields.io/badge/PUBLISHED%20ON%20DENO.LAND-272727?logo=deno"/></a>
 <a href="https://www.npmjs.com/package/test-randomizing"><img alt="published on npm" src="https://img.shields.io/badge/PUBLISHED%20ON%20NPM-272727?logo=npm"/></a>
</p>

## 🏗 Install

### Deno ([nest.land](https://nest.land/package/test_randomizing) and [deno.land](https://deno.land/x/test_randomizing))

```javascript
import {
  freezeMerge,
  merge,
  RandomFn,
  freezeMergeFactory
} from "https://x.nest.land/test_randomizing@0.5.0/mod.ts";
// or
import {
  freezeMerge,
  merge,
  RandomFn,
  freezeMergeFactory
} from "https://deno.land/x/test_randomizing@0.5.0/mod.ts";
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
[fakerjs](https://github.com/faker-js/faker) or deno
[faker](https://cdn.skypack.dev/@faker-js/faker)) to create randomized
objects.

Deno example
[`./examples/deno`](https://github.com/tiloio/test-randomizing/tree/main/examples/deno):

```typescript
import { freezeMergeFactory } from "https://x.nest.land/test_randomizing@0.5.0/mod.ts";
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

## Development

Use `vr` ([Velociraptor](https://velociraptor.run/)) to run all commands like `vr check` and `vr publish`.
