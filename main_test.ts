import { assertEquals } from "https://deno.land/std@0.194.0/testing/asserts.ts";

// Ideally, we would actually test something about the application here. Instead, for now we have a simple assert.
Deno.test("main test", () => {
  assertEquals(1 + 1, 2);
});
