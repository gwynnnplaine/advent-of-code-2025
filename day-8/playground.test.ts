import { describe, expect, it } from "bun:test"
import { Playground } from "./playground"

describe("Playground", async () => {
  const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
  const sampleInput = await SAMPLE_FILE.text()
  const playground = new Playground()

  it("should correct calculate junction boxes (part one)", () => {
    const EXPECTED_RESULT_PART_ONE = 40
    expect(playground.solvePartOne(sampleInput, 10)).toBe(EXPECTED_RESULT_PART_ONE)
  })

  it.skip("should correct calculate junction boxes (part two)", () => {
    const EXPECTED_RESULT_PART_TWO = 40
    expect(playground.solvePartTwo(sampleInput)).toBe(EXPECTED_RESULT_PART_TWO)
  })
})
