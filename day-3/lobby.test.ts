import { describe, it, expect } from "bun:test"
import { Lobby } from "./lobby"

describe("Lobby", async () => {
    const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
    const sampleInput = await SAMPLE_FILE.text()
    const lobby = new Lobby(sampleInput)

    it("should correct calculate total output joltage (part one)", () => {
        const EXPECTED_TOTAL_OUTPUT_JOLTS = 357

        expect(lobby.solvePartOne()).toBe(EXPECTED_TOTAL_OUTPUT_JOLTS)
    })
})