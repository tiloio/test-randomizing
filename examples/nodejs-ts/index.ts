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
