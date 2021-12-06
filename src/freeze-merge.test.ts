import { assertEquals, assert  } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { freezeMerge } from "./freeze-merge.ts";

Deno.test("freezeMerge freezes the merged object", () => {
    const sourceObject = {
      a: 'a',
      b: 'b'
    };
    const overrideObject = { b: 'b1' };

    const result = freezeMerge(sourceObject, overrideObject);

    assert(Object.isFrozen(result));
});

Deno.test("freezeMerge merges two objects", () => {
    const sourceObject = {
      a: 'a',
      b: 'b'
    };
    const overrideObject = { b: 'b1' };
    
    const result = freezeMerge(sourceObject, overrideObject);

    assertEquals(result, { a: 'a', b: 'b1' });
});
