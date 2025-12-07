export class Cafeteria {
    #ids: number[] = []
    #ranges: [number, number][] = []

    constructor(rollsText: string) {
        const { ids, ranges } = this.#parseCafeteriaIds(rollsText)
        this.#ids = ids
        this.#ranges = ranges
    }

    solvePartOne(): number {
        const fresh: number[] = []

        for (const id of this.#ids) {
            for (const [start, end] of this.#ranges) {
                if (id >= start && id <= end) {
                    fresh.push(id)
                    break
                }
            }
        }
        return fresh.length
    }

    solvePartTwo(): number {
        let count = 0

        const sortedRanges = this.#ranges.sort((a, b) => a[0] - b[0])

        let [currentStart, currentEnd] = sortedRanges[0]!

        for (let i = 0; i < sortedRanges.length; i++) {
            let nextStart = sortedRanges[i + 1]?.[0]
            let nextEnd = sortedRanges[i + 1]?.[1]


            if (nextStart === undefined || nextEnd === undefined) {
                count += currentEnd - currentStart + 1
                return count
            }


            if (currentStart > nextEnd || currentEnd < nextStart) {
                count += currentEnd - currentStart + 1

                currentStart = nextStart
                currentEnd = nextEnd

                continue
            }

            currentEnd = Math.max(currentEnd, nextEnd)
        }

        return count
    }

    #parseCafeteriaIds(cafeteriaInputString: string): {
        ranges: [number, number][]
        ids: number[]
    } {
        const text = cafeteriaInputString.split("\n")
        const ranges = text.filter((line) => line.length > 0 && line.includes("-")).map((line) => {
            const [start, end] = line.split("-").map(Number)
            return [start, end]
        }) as [number, number][]

        const ids = text.filter((line) => line.length > 0 && !line.includes("-")).map(Number)

        return {
            ranges,
            ids,
        }
    }
}