import { describe, expect, it } from 'bun:test'
import { GiftShop } from './gift-shop'

  describe('Gift Shop', async () => {
   const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
   const productIdsRanges = await SAMPLE_FILE.text()
    const shop = new GiftShop(productIdsRanges)

  it("should correctly calculate sum from invalid ids (part one)", async () => {
    const EXPECTED_SUM = 1227775554
    expect(shop.solvePartOne()).toBe(EXPECTED_SUM)
  })

  it("should correctly calculate sum from invalid ids (part two)", async () => {
    const EXPECTED_SUM = 4174379265

    expect(shop.solvePartTwo()).toBe(EXPECTED_SUM)
  })
})
