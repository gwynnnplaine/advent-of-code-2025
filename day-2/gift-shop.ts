import type { ProductIdsRange } from "./ranges.types";

export class GiftShop {
  #productIdsRanges: ProductIdsRange[] = []

  constructor(productIdsText: string) {
    this.#productIdsRanges = this.#parseProductIdsText(productIdsText)
  }

  sum(): number {
    const invalidIds = this.#productIdsRanges.flatMap(range => this.#generateInvalidIdsInRange(range))
    return invalidIds.reduce((acc, curr) => acc + curr, 0)
  }

  #generateInvalidIdsInRange([start, end]: ProductIdsRange): number[] {
    const possibleIds: number[] = []
    const maxPatternLength = Math.floor(String(end).length / 2)

    for (let i = 1; i <= maxPatternLength; i++) {
      const multiplier = (10 ** i) + 1
      const minBase = 10 ** (i - 1)
      const maxBase = (10 ** i) - 1

      for (let base = minBase; base <= maxBase; base++) {
        const result = base * multiplier
        if (result >= start && result <= end) {
          possibleIds.push(result)
        }
      }
    }

    return possibleIds
  }


  #parseProductIdsText(productIdsText: string): ProductIdsRange[] {
    return productIdsText.trim().split(",")
      .map(range => {
        const [start, end] = range.split("-")

        if (!start || !end) {
          throw new Error(`Invalid range: ${range}`)
        }

        return [parseInt(start, 10), parseInt(end, 10)]
      })
  }
}
