import { freezeMerge, RandomFn } from "test-randomizing";
import { name } from "faker";

type Person = {
  firstName: string;
  lastName: string;
  gender: string;
  title: string;
};

const randomPerson: RandomFn<Person> = (override?) =>
  freezeMerge({
    firstName: name.firstName(),
    lastName: name.lastName(),
    gender: name.gender(),
    title: name.title(),
  }, override);

const steve = randomPerson({ lastName: "Jobs", gender: "male" });
const bill = randomPerson({ lastName: "Gates", gender: "male" });
console.log(steve);
console.log(bill);

const melania = freezeMerge(bill, { firstName: "Melania", gender: "female" });
console.log(melania);
