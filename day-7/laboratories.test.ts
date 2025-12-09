import { describe, expect, it } from "bun:test"
import { Laboratories } from "./laboratories"

describe("Laboratories", async () => {
  const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
  const sampleInput = await SAMPLE_FILE.text()
  const laboratories = new Laboratories()

  it("should correct calculate how many times the beam be splitted (part one)", () => {
    const EXPECTED_RESULT_PART_ONE = 21
    expect(laboratories.solvePartOne(sampleInput)).toBe(EXPECTED_RESULT_PART_ONE)
  })

  // it("should correct calculate grand total of adding together all of the answers to the individual problems  (part two)", () => {
  //   const EXPECTED_RESULT_PART_TWO = 3263827
  //   expect(laboratories.solvePartTwo(sampleInput)).toBe(EXPECTED_RESULT_PART_TWO)
  // })
})
