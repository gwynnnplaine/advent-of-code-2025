export class PrintingDepartment {
    #rolls: string[] = []

    constructor(rollsText: string) {
        this.#rolls = this.#parseRollsText(rollsText)
    }

    solvePartOne(): number {
        let totalRefinedPapers = 0

        for (let x = 0; x < this.#rolls.length; x++) {
            for (let y = 0; y < this.#rolls[x]!.length; y++) {
                const cell = this.#rolls[x]![y]!
                let papersInCell = 0

                if (!this.#isRollOfPaper(cell)) continue

                for (const direction of this.#getDirections()) {
                    const adjacentX = x + direction.x
                    const adjacentY = y + direction.y

                    if (adjacentX < 0 || adjacentX >= this.#rolls.length) continue
                    if (adjacentY < 0 || adjacentY >= this.#rolls[adjacentX]!.length) continue

                    const adjacentCell = this.#rolls[adjacentX]![adjacentY]!

                    if (!this.#isRollOfPaper(adjacentCell)) {
                        continue
                    }

                    papersInCell++
                }

                if (this.#isBelowThreshold(papersInCell)) {
                    totalRefinedPapers++
                }
            }
        }

        return totalRefinedPapers
    }

    #isRollOfPaper(roll: string): boolean {
        return roll === "@"
    }

    #isBelowThreshold(papersInCell: number): boolean {
        return papersInCell < 4
    }

    #getDirections(): { x: number, y: number }[] {
        return [
            {
                x: -1,
                y: 0,
            },
            {
                x: +1,
                y: 0,
            },
            {
                x: 0,
                y: +1,
            },
            {
                x: +1,
                y: +1,
            },
            {
                x: -1,
                y: +1,
            },
            {
                x: 0,
                y: -1,
            },
            {
                x: - 1,
                y: -1,
            },
            {
                x: + 1,
                y: -1,
            },
        ]
    }

    #parseRollsText(rollsText: string): string[] {
        return rollsText.split("\n")
    }
}