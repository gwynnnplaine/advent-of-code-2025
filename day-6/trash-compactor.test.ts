import { describe, expect, it } from "bun:test"
import { TrashCompactor } from "./trash-compactor"

describe("Trash Compactor", async () => {
  const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
  const sampleInput = await SAMPLE_FILE.text()
  const trashCompactor = new TrashCompactor()

  it("should correct calculate grand total of adding together all of the answers to the individual problems (part one)", () => {
    const EXPECTED_RESULT_PART_ONE = 4277556
    expect(trashCompactor.solvePartOne(sampleInput)).toBe(EXPECTED_RESULT_PART_ONE)
  })

  it("should correct calculate grand total of adding together all of the answers to the individual problems  (part two)", () => {
    const EXPECTED_RESULT_PART_TWO = 3263827
    expect(trashCompactor.solvePartTwo(sampleInput)).toBe(EXPECTED_RESULT_PART_TWO)
  })
})
