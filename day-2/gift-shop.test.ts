import { describe, expect, it } from 'bun:test'
import { GiftShop } from './gift-shop'

describe('Gift Shop', () => {
  it("should correctly calculate sum from invalid ids", async () => {
    const SAMPLE_FILE = Bun.file(`${import.meta.dir}/sample-input.txt`)
    const EXPECTED_SUM = 1227775554

    const productIdsRanges = await SAMPLE_FILE.text()
    const shop = new GiftShop(productIdsRanges)
    expect(shop.sum()).toBe(EXPECTED_SUM)
  })
})
