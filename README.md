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

```sh
npm install --save-dev test-randomizing
```

## 🤷🏽‍♂️ How to use

You can use test randomizing in JavaScript and TypeScript projects.

We recommend using a library (like [faker.js](https://github.com/marak/Faker.js/)) to create randomized objects.

Typescript example:

```typescript
import { RandomFn, freezeMerge } from "test-randomizing";
import { name } from "faker";

type Person = {
    firstName: string;
    lastName: string;
    gender: string;
    title: string;
}

const randomPerson: RandomFn<Person> = (override?) =>
    freezeMerge({
        firstName: name.firstName(),
        lastName: name.lastName(),
        gender: name.gender(),
        title: name.title(),
    }, override);
```

More complete examples in the `./examples` directory:
- NodeJS TypeScript [`./examples/nodejs-ts`](https://github.com/tiloio/test-randomizing/examples/nodejs-ts)

## License

MIT License

Copyright (c) 2021 Ti/o