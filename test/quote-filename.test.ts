import { assertEquals } from "./helpers.ts";
import quote from "../src/lib/quote-filename.js";

Deno.test("leaves a boring filename untouched", () => {
  assertEquals(quote("yas.txt"), "yas.txt");
});

Deno.test("escapes a filename with an apostrophe", () => {
  assertEquals(quote("fart's.butt"), "fart\\'s.butt");
});

Deno.test("quotes a filename with a space", () => {
  assertEquals(quote("memes on the web.txt"), "'memes on the web.txt'");
});

Deno.test("handles a filename with a space and a single quote", () => {
  assertEquals(quote("meme's on the web.txt"), "'meme'\\''s on the web.txt'");
});
