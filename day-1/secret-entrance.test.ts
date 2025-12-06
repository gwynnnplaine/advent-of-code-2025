import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import type { Rotation } from './rotation.type';
import { SecretEntrance } from './secret-entrance';

describe('Secret Entrance', () => {
  it.each([
    { name: 'Complex case -> 6', rotations: ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"] as Rotation[], expected: 6 },
    { name: 'Complex case 2 -> 16', rotations: ["R1000", "L149", "L1", "R1", "L2", "R1", "L1", "R2", "R99"] as Rotation[], expected: 16 },
    { name: 'L50, R50 -> 1', rotations: ["L50", "R50"] as Rotation[], expected: 1 },
    { name: 'L50, L50 -> 1', rotations: ["L50", "L50"] as Rotation[], expected: 1 },
    { name: 'R50, L50 -> 1', rotations: ["R50", "L50"] as Rotation[], expected: 1 },
    { name: 'R50, R50 -> 1', rotations: ["R50", "R50"] as Rotation[], expected: 1 },
    { name: 'L150, L50 -> 2', rotations: ["L150", "L50"] as Rotation[], expected: 2 },
    { name: 'L150, R50 -> 2', rotations: ["L150", "R50"] as Rotation[], expected: 2 },
    { name: 'R150, L50 -> 2', rotations: ["R150", "L50"] as Rotation[], expected: 2 },
    { name: 'R150, R50 -> 2', rotations: ["R150", "R50"] as Rotation[], expected: 2 },
  ])('$name', async ({ rotations, expected }) => {
    const entrance = new SecretEntrance(rotations)
    const password = await entrance.guessPassword()
    expect(password).toBe(expected)
  })
})