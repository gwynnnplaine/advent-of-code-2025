
type InstructionSet = {
    numbers: number[]
    instruction: "+" | "*"
}

export class TrashCompactor {
    #worksheet: InstructionSet[] = []

    constructor(worksheetText: string) {
        this.#worksheet = this.#parseWorksheet(worksheetText)
    }

    solvePartOne(): number {
        let sum = 0

        for (const set of this.#worksheet) {
            const { numbers, instruction } = set
            switch (instruction) {
                case "+":
                    sum += numbers.reduce((acc, curr) => acc + curr, 0)
                    break
                case "*":
                    sum += numbers.reduce((acc, curr) => acc * curr, 1)
                    break
            }
        }

        return sum
    }

    solvePartTwo(): number {
        return 0
    }

    #parseWorksheet(worksheetText: string): InstructionSet[] {
        const verticalSections = new Map<number, string[]>()
        const rows = worksheetText.split("\n").map((line) => line.trim().split(/\s+/))

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i]!.length; j++) {
                const cell = rows[i]![j]!

                if (cell === "") continue

                const previousCells = verticalSections.get(j) || []

                verticalSections.set(j, [...previousCells, cell])
            }
        }

        return [...verticalSections.values()].map(section => {
            return {
                numbers: section.slice(0, section.length - 1).map(Number),
                instruction: section[section.length - 1]!,
            } as InstructionSet
        })
    }
}