import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import type { Rotation } from './rotation.type';
import { SecretEntrance } from './secret-entrance';

const cases = [
  ["L68", 50, 82],
  ["L30", 82, 52],
  ["R48", 52, 0],
  ["L5", 0, 95],
  ["R60", 95, 55],
  ["L55", 55, 0],
  ["L1", 0, 99],
  ["L99", 99, 0],
  ["R14", 0, 14],
  ["L82", 14, 32],
] as Array<[Rotation, number, number]>
const content = cases.map(([rotation]) => rotation).join('\n')

const TEST_FILE_PATH = 'test-secret-entrance-input.txt'

describe('Secret Entrance', () => {
  let mockFile = mock(() => ({
    text: () => Promise.resolve(content)
  }))

  beforeEach(() => {
    globalThis.Bun.file = mockFile as any
  })

  afterEach(() => {
    mock.clearAllMocks()
  })

  it.each(cases)('should rotate dial %s to position %d', (rotation: Rotation, currentPosition: number, expected: number) => {
    const entrance = new SecretEntrance(TEST_FILE_PATH)

    const newPosition = entrance.rotateDial(rotation, currentPosition)

    expect(newPosition).toBe(expected)
  })

  it('should guess correct password after a series of rotations', async () => {
    const entrance = new SecretEntrance(TEST_FILE_PATH)

    const EXPECTED_PASSWORD = 3

    const guessedPassword = await entrance.guessPassword()

    expect(guessedPassword).toBe(EXPECTED_PASSWORD)
  })
})
