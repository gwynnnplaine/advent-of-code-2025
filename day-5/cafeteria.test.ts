import { describe, it, expect } from "bun:test"
import { Cafeteria } from "./cafeteria"

describe("Cafeteria", async () => {
    const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
    const sampleInput = await SAMPLE_FILE.text()
    const cafeteria = new Cafeteria(sampleInput)

    it("should correct calculate fresh ingredients (part one)", () => {
        const EXPECTED_RESULT_PART_ONE = 3

        expect(cafeteria.solvePartOne()).toBe(EXPECTED_RESULT_PART_ONE)

    })

    it.skip("should correct calculate fresh ingredients (part two)", () => {
        // const EXPECTED_RESULT_PART_TWO = 43
        // expect(cafeteria.solvePartTwo()).toBe(EXPECTED_RESULT_PART_TWO)
    })
})