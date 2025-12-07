import { describe, it, expect } from "bun:test"
import { TrashCompactor } from "./trash-compactor"

describe("Trash Compactor", async () => {
    const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
    const sampleInput = await SAMPLE_FILE.text()
    const trashCompactor = new TrashCompactor(sampleInput)

    it("should correct calculate grand total of adding together all of the answers to the individual problems (part one)", () => {
        const EXPECTED_RESULT_PART_ONE = 4277556
        expect(trashCompactor.solvePartOne()).toBe(EXPECTED_RESULT_PART_ONE)
    })

    it.skip("should correct calculate fresh ingredients (part two)", () => {
        const EXPECTED_RESULT_PART_TWO = 14
        expect(trashCompactor.solvePartTwo()).toBe(EXPECTED_RESULT_PART_TWO)
    })
})