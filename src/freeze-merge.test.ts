import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { freezeMerge } from "./freeze-merge.ts";

Deno.test("freezeMerge freezes the merged object", () => {
  const sourceObject = {
    a: "a",
    b: "b",
  };
  const overrideObject = { b: "b1" };

  const result = freezeMerge(sourceObject, overrideObject);

  assert(Object.isFrozen(result));
});

Deno.test("freezeMerge freezes nested objects", () => {
  const sourceObject = { a: { b: { c: "d1" } } };
  const overrideObject = { a: { b: { c: "d1" } } };

  const result = freezeMerge(sourceObject, overrideObject);

  assert(Object.isFrozen(result.a));
  assert(Object.isFrozen(result.a.b));
  assert(Object.isFrozen(result.a.b.c));
});

Deno.test("freezeMerge freezes nested arrays", () => {
  const sourceObject = {
    a: [0],
  };
  const overrideObject = { a: [1] };

  const result = freezeMerge(sourceObject, overrideObject);

  assert(Object.isFrozen(result.a));
});

Deno.test("freezeMerge freezes strings", () => {
  const sourceObject = {
    a: "Hello",
  };
  const overrideObject = { a: "bye" };

  const result = freezeMerge(sourceObject, overrideObject);

  assert(Object.isFrozen(result.a));
});

Deno.test("freezeMerge freezes non overwridden values", () => {
  const sourceObject = {
    a: 1,
    b: {
      c: { d: "Hello world" },
    },
  };
  const overrideObject = { a: 2 };

  const result = freezeMerge(sourceObject, overrideObject);

  assert(Object.isFrozen(result.b));
  assert(Object.isFrozen(result.b.c));
  assert(Object.isFrozen(result.b.c.d));
});

Deno.test("freezeMerge merges two objects", () => {
  const sourceObject = {
    a: "a",
    b: "b",
  };
  const overrideObject = { b: "b1" };

  const result = freezeMerge(sourceObject, overrideObject);

  assertEquals(result, { a: "a", b: "b1" });
});
