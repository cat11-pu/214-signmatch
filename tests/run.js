import assert from "node:assert";
import { signOf } from "../sign.js";
import { matchSigns } from "../match.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("signOf returns text", () => {
  assert.strictEqual(typeof signOf(3), "string");
});

check("matchSigns returns marks", () => {
  assert.ok(Array.isArray(matchSigns([1], [1]).marks));
});

check("matchSigns returns counts", () => {
  assert.strictEqual(typeof matchSigns([1], [1]).same, "number");
});

check("render counts pairs", () => {
  assert.strictEqual(typeof render({ left: [1], right: [1] }).count, "number");
});

check("render exposes total flag", () => {
  assert.strictEqual(typeof render({ left: [1], right: [1] }).total_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
