import { Person } from "./person.ts";

export const generateEmail = (person: Person) => {
  if (!person.companyName || (!person.firstName && !person.lastName)) {
    return undefined;
  }

  return `${person.firstName}.${person.lastName}@${person.companyName}.com`;
};
