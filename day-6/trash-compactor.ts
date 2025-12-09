export class TrashCompactor {

  solvePartOne(worksheetText: string): number {
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

    return [...verticalSections.values()].reduce((acc, curr) => {
      const instruction = curr.pop() as "+" | "*"
      const numbers = curr.map(Number)

      if (instruction === "+") {
        return acc + numbers.reduce((a, b) => a + b, 0)
      } else if (instruction === "*") {
        return acc + numbers.reduce((a, b) => a * b, 1)
      }
      return acc
    }, 0)

  }

  solvePartTwo(worksheetText: string): number {
    const grid = worksheetText.split("\n")

    let result = 0
    let temporaryNumbers = [] as number[]
    let instruction = ""

    for (let col = grid[0]!.length; col >= 0; col--) {
      let columnsString = ""

      for (let row = 0; row < grid.length; row++) {
        const cell = grid[row]![col]!

        if (!cell) continue

        if (cell === "+" || cell === "*") {
          instruction = cell
          continue
        }

        if (cell !== " ") {
          columnsString += cell
          continue
        }
      }

      if (columnsString) {
        temporaryNumbers.push(+columnsString)
      }

      if ((columnsString.length === 0 || col === 0) && temporaryNumbers.length > 0) {
        result += temporaryNumbers.reduce((acc, curr) => {
          if (instruction === "+") {
            return acc + curr
          } else if (instruction === "*") {
            return acc * curr
          }
          return acc
        }, instruction === "+" ? 0 : 1)

        columnsString = ""
        instruction = ""
        temporaryNumbers = []
      }
    }

    return result
  }
}
