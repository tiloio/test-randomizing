// deno-lint-ignore-file no-explicit-any
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { createJestAsymmetricMatcher } from "./jest.ts";
import { merge } from "./merge.ts";

Deno.test("returns copy of sourceObject if overrideObject is undefined", () => {
  const sourceObject = {
    a: "a",
    b: "b",
  };
  const result = merge(sourceObject, undefined);

  assert(result !== sourceObject);
});

Deno.test("returns sourceObject if overrideObject is undefined", () => {
  const sourceObject = {
    a: "a",
    b: "b",
  };
  const result = merge(sourceObject, undefined);

  assertEquals(result, sourceObject);
});

Deno.test("returns overriden sourceObject if key value is null", () => {
  const sourceObject = {
    a: "a",
    b: "b",
  };
  const overrideObject = { b: null };
  const result = merge(sourceObject, overrideObject as any);

  assertEquals(result, { a: "a", b: null });
});

Deno.test("does not merge jest asymmetric matcher deeply", () => {
  const sourceObject = {
    a: "a",
    b: createJestAsymmetricMatcher(),
    c: "c",
    d: "d",
  };
  const overrideObject = {
    a: createJestAsymmetricMatcher(),
    c: "c1",
  };

  const result = merge(sourceObject, overrideObject as any);

  assertEquals(
    result,
    {
      a: createJestAsymmetricMatcher(),
      b: createJestAsymmetricMatcher(),
      c: "c1",
      d: "d",
    },
  );
});

Deno.test("merges with undefined deeply", () => {
  const result = merge(
    {
      a: "a",
      deep: {
        a: undefined as string | undefined,
        b: "b",
        c: "c",
      },
    },
    {
      deep: {
        a: "a1",
        b: undefined,
      },
    },
  );

  assertEquals(
    result,
    {
      a: "a",
      deep: {
        a: "a1",
        b: undefined,
        c: "c",
      },
    },
  );
});

Deno.test("merges deeply", () => {
  const result = merge(
    {
      a: "a",
      b: "b",
      deep: {
        a: "a",
        b: "b",
        deep2: {
          a: "a",
          b: "b",
        },
      },
    },
    {
      b: "b1",
      deep: {
        a: "a1",
        deep2: {
          b: "b1",
        },
      },
    },
  );

  assertEquals(
    result,
    {
      a: "a",
      b: "b1",
      deep: {
        a: "a1",
        b: "b",
        deep2: {
          a: "a",
          b: "b1",
        },
      },
    },
  );
});

Deno.test("overrides arrays", () => {
  const result = merge(
    {
      a: "a",
      b: ["b"],
      deep: {
        a: ["a"],
        b: "b",
      },
    },
    {
      b: ["b1"],
      deep: {
        a: ["a1"],
      },
    },
  );

  assertEquals(
    result,
    {
      a: "a",
      b: ["b1"],
      deep: {
        a: ["a1"],
        b: "b",
      },
    },
  );
});

Deno.test("overrides with undefined", () => {
  const result = merge(
    {
      a: "a",
      b: "b",
    },
    {
      b: undefined,
    },
  );

  assertEquals(
    result,
    {
      a: "a",
      b: undefined,
    },
  );
});

Deno.test("does not freezes the result", () => {
  const result = merge(
    {
      a: "a",
      b: "b",
    },
    {
      b: "b2",
    },
  );

  assert(!Object.isFrozen(result));
});

Deno.test("does not freezes deeply", () => {
  const result = merge(
    {
      a: {
        b: "b",
        c: "c",
      },
      d: "d",
    },
    {
      a: {
        b: "b2",
      },
    },
  );

  assert(!Object.isFrozen(result));
  assert(!Object.isFrozen(result.a));
});
