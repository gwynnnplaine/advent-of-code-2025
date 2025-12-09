export class Laboratories {
  solvePartOne(input: string): number {
    let beams = 0

    const queue = [] as Array<{ row: number; col: number; direction: string }>
    const visited = new Set<string>()
    const splittersReached = new Set<string>()

    const grid = input.split("\n").filter(line => line.trim() !== "")

    const startPosition = grid[0]!.indexOf("S")

    queue.push({ row: 1, col: startPosition, direction: "down" })

    while (queue.length > 0) {
      const currentBeam = queue.shift()!

      if (currentBeam.row < 0 || currentBeam.row >= grid.length || currentBeam.col < 0 || currentBeam.col >= grid[0]!.length) {
        continue
      }


      if (visited.has(`${currentBeam.row},${currentBeam.col},${currentBeam.direction}`)) {
        continue
      }

      visited.add(`${currentBeam.row},${currentBeam.col},${currentBeam.direction}`)

      const cell = grid[currentBeam.row]![currentBeam.col]!

      if (cell === ".") {
        queue.push({
          row: currentBeam.row + 1,
          col: currentBeam.col,
          direction: "down"
        })

        continue
      }

      if (cell !== "^") {
        continue
      }

      if (!splittersReached.has(`${currentBeam.row},${currentBeam.col}`)) {
        beams += 1
        splittersReached.add(`${currentBeam.row},${currentBeam.col}`)

        queue.push({
          row: currentBeam.row + 1,
          col: currentBeam.col - 1,
          direction: "left"
        })

        queue.push({
          row: currentBeam.row + 1,
          col: currentBeam.col + 1,
          direction: "right"
        })
      }
    }

    return beams
  }

  solvePartTwo(input: string): number {
    const pathCounts = new Array(input.split("\n").length).fill(0).map(() => new Array(input.split("\n")[0]!.length).fill(0))

    const grid = input.split("\n").filter(line => line.trim() !== "")

    const startPosition = grid[0]!.indexOf("S")

    pathCounts[1]![startPosition] = 1;

    for (let row = 1; row < grid.length; row++) {
      for (let col = 0; col < grid[0]!.length; col++) {

        if (grid[row - 1]![col] === ".") {
          pathCounts[row]![col] += pathCounts[row - 1]![col]
        }

        if (col > 0 && grid[row - 1]![col - 1] === "^") {
          pathCounts[row]![col] += pathCounts[row - 1]![col - 1]
        }

        if (grid[row - 1]![col + 1] === "^" && col < grid[0]!.length - 1) {
          pathCounts[row]![col] += pathCounts[row - 1]![col + 1]
        }
      }
    }

    return pathCounts[grid.length - 1]!.reduce((a, b) => a + b, 0)
  }
}
