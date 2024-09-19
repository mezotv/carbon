import { expect, test } from "vitest"
import { splitCustomId } from "../src/utils.js"

test("splitCustomId", () => {
	expect(splitCustomId("12345678901234567890")).toEqual([
		"12345678901234567890",
		{}
	])
	expect(splitCustomId("12345678901234567890:test=1")).toEqual([
		"12345678901234567890",
		{ test: "1" }
	])
	expect(splitCustomId("12345678901234567890:test=1:test2=2")).toEqual([
		"12345678901234567890",
		{ test: "1", test2: "2" }
	])
})
