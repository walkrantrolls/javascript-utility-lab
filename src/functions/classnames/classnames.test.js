import assert from "node:assert/strict";
import test from "node:test";
import classNames from "./classnames.js";

test("joins strings in argument order", () => assert.equal(classNames("button", "primary"), "button primary"));
test("includes truthy object keys only", () => assert.equal(classNames({ active: true, disabled: false, compact: 1 }), "active compact"));
test("combines strings, numbers, and objects", () => assert.equal(classNames("button", 12, { active: true }), "button 12 active"));
test("recursively flattens nested arrays", () => assert.equal(classNames(["button", ["primary", [false, "rounded"]]]), "button primary rounded"));
test("ignores nullish, boolean, empty string, and zero values", () => assert.equal(classNames(null, undefined, false, true, "", 0), ""));
test("ignores object keys with falsy values", () => assert.equal(classNames({ no: false, alsoNo: 0, empty: "", yes: "ok" }), "yes"));
test("uses only own enumerable object keys", () => { const input = Object.create({ inherited: true }); input.own = true; assert.equal(classNames(input), "own"); });
test("preserves duplicate names", () => assert.equal(classNames("button", ["button", { button: true }]), "button button button"));
test("does not mutate arrays or objects", () => { const flags = { active: true }; const input = ["button", flags]; classNames(input); assert.deepEqual(input, ["button", flags]); assert.deepEqual(flags, { active: true }); });
test("ignores unsupported function and symbol values", () => assert.equal(classNames(() => "x", Symbol("x"), "kept"), "kept"));
test("returns empty string without arguments", () => assert.equal(classNames(), ""));
test("exports lowercase alias", async () => { const { classnames } = await import("./classnames.js"); assert.equal(classnames("a", { b: true }), "a b"); });
