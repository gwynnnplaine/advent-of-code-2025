import { describe, it, expect } from "bun:test"
import { PrintingDepartment } from "./printing-department"

describe("Printing Department", async () => {
    const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
    const sampleInput = await SAMPLE_FILE.text()
    const printingDepartment = new PrintingDepartment(sampleInput)

    it("should correct calculate rolls of paper (part one)", () => {
        const EXPECTED_RESULT_PART_ONE = 13

        expect(printingDepartment.solvePartOne()).toBe(EXPECTED_RESULT_PART_ONE)

    })

    it("should correct calculate rolls of paper (part two)", () => {
        const EXPECTED_RESULT_PART_TWO = 43

        expect(printingDepartment.solvePartTwo()).toBe(EXPECTED_RESULT_PART_TWO)

    })
})