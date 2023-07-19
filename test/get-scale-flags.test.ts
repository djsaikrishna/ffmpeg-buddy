import { assertEquals } from "./helpers.ts";
import scale from "../src/lib/get-scale-flag.js";

Deno.test("does nothing if inputs are -1 or 100%", () => {
  assertEquals(scale("100%", "100%"), null);
  assertEquals(scale("-1", "-1"), null);
  assertEquals(scale("-1", "100%"), null);
  assertEquals(scale("100%", "-1"), null);
});

Deno.test("can handle a % and -1", () => {
  assertEquals(scale("55.123%", "-1"), "-vf 'scale=iw*0.55123:-1'");
});

Deno.test("can handle a -1 and %", () => {
  assertEquals(scale("-1", "55.123%"), "-vf 'scale=-1:ih*0.55123'");
});

Deno.test("can handle two percentages", () => {
  assertEquals(scale("50%", "25%"), "-vf 'scale=iw*0.5:ih*0.25'");
});

Deno.test("can handle a number and -1", () => {
  assertEquals(scale("320", "-1"), "-vf 'scale=320:-1'");
});

Deno.test("can handle -1 and a number", () => {
  assertEquals(scale("-1", "320"), "-vf 'scale=-1:320'");
});

Deno.test("can handle two numbers", () => {
  assertEquals(scale("666", "420"), "-vf 'scale=666:420'");
});
