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