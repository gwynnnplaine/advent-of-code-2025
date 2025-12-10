export class Playground {
  solvePartOne(input: string, connections: number): number {
    const lines = input.split("\n").filter(Boolean)
    const cords = lines.map((line) => line.split(",").map(Number))

    const pairs = [] as [number, number, number][]

    for (let i = 0; i < cords.length - 1; i++) {
      for (let j = i + 1; j < cords.length; j++) {
        const first = cords[i]!
        const second = cords[j]!
        const distance = (this.#calculateDistance(first, second))

        pairs.push([i, j, distance])
      }
    }

    const sortedPairs = pairs.sort((a, b) => {
      const distanceA = a[2]!
      const distanceB = b[2]!

      return distanceA - distanceB
    })

    const parents = new Array(cords.length).fill(0).map((_, index) => index)

    const size = new Array(cords.length).fill(1)

    const find = (index: number): number => {
      if (parents[index]! === index) {
        return index
      }

      return parents[index] = find(parents[index]!)

    }

    const union = (indexA: number, indexB: number): boolean => {
      let rootA = find(indexA)
      let rootB = find(indexB)

      if (rootA === rootB) {
        return false
      }

      if (size[rootA]! < size[rootB]!) {
        [rootA, rootB] = [rootB, rootA]
      }

      parents[rootB] = rootA
      size[rootA]! += size[rootB]!

      return true
    }

    for (let i = 0; i < connections; i++) {
      const [firstIndex, secondIndex] = sortedPairs[i]!
      union(firstIndex, secondIndex)
    }

    return size
      .filter((_, i) => parents[i] === i)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1)
  }

  #calculateDistance(a: number[], b: number[]): number {
    return Math.floor(Math.pow((b[0]! - a[0]!), 2) + Math.pow((b[1]! - a[1]!), 2) + Math.pow((b[2]! - a[2]!), 2))
  }

  solvePartTwo(input: string): number {
    const lines = input.split("\n").filter(Boolean)
    const cords = lines.map((line) => line.split(",").map(Number))

    const pairs = [] as [number, number, number][]

    for (let i = 0; i < cords.length - 1; i++) {
      for (let j = i + 1; j < cords.length; j++) {
        const first = cords[i]!
        const second = cords[j]!
        const distance = (this.#calculateDistance(first, second))

        pairs.push([i, j, distance])
      }
    }

    const sortedPairs = pairs.sort((a, b) => {
      const distanceA = a[2]!
      const distanceB = b[2]!

      return distanceA - distanceB
    })

    const parents = new Array(cords.length).fill(0).map((_, index) => index)

    const size = new Array(cords.length).fill(1)

    const find = (index: number): number => {
      if (parents[index]! === index) {
        return index
      }

      return parents[index] = find(parents[index]!)
    }

    const union = (indexA: number, indexB: number): boolean => {
      let rootA = find(indexA)
      let rootB = find(indexB)

      if (rootA === rootB) {
        return false
      }

      if (size[rootA]! < size[rootB]!) {
        [rootA, rootB] = [rootB, rootA]
      }

      parents[rootB] = rootA
      size[rootA]! += size[rootB]!

      return true
    }

    let connections = 0



    for (let i = 0; i < sortedPairs.length; i++) {
      const [firstIndex, secondIndex] = sortedPairs[i]!

      if (union(firstIndex, secondIndex)) {
        connections++
      }

      if (connections === cords.length - 1) {
        const x1 = cords[firstIndex]![0]!
        const x2 = cords[secondIndex]![0]!

        return x1 * x2
      }

    }

    return 0
  }
}
