import type { Direction, Rotation } from "./rotation.type";

const THRESHOLD = 100

const DEFAULT_STARTING_POSITION = 50

export class SecretEntrance {
  #puzzleInput: Bun.BunFile
  #currentPosition = DEFAULT_STARTING_POSITION

  constructor(filePath: string) {
    this.#puzzleInput = Bun.file(filePath)
  }

  async guessPassword(): Promise<number> {
    const rotations = await this.#parseInput(this.#puzzleInput)
    let currentTicks = 0

    for (const rotation of rotations) {
      const currentPosition = this.rotateDial(rotation, this.#currentPosition)

      this.#currentPosition = currentPosition

      if (currentPosition === 0) {
        currentTicks += 1
        continue
      }
    }

    return currentTicks
  }

  rotateDial(rotation: Rotation, currentPosition: number): number {
    const direction = this.#getDirection(rotation)
    const amount = this.#getAmount(rotation)

    let newPosition = currentPosition

    switch (direction) {
      case "L":
        newPosition = this.#rotateLeft(currentPosition, amount)
        break
      case "R":
        newPosition = this.#rotateRight(currentPosition, amount)
        break
      default:
        throw new Error(`Invalid direction: ${direction}`)
    }

    return newPosition
  }

  #getDirection(rotation: Rotation): Direction {
    if (rotation.startsWith("L")) {
      return "L"
    }

    if (rotation.startsWith("R")) {
      return "R"
    }

    throw new Error(`Invalid rotation: ${rotation}`)
  }

  #getAmount(rotation: Rotation): number {
    const amountString = rotation.slice(1)

    const amount = parseInt(amountString, 10)

    if (isNaN(amount)) {
      throw new Error(`Invalid amount in rotation: ${rotation}`)
    }

    return amount
  }

  #rotateLeft(currentPosition: number, amount: number): number {
    return (currentPosition - amount + THRESHOLD) % THRESHOLD
  }

  #rotateRight(currentPosition: number, amount: number): number {
    return (currentPosition + amount + THRESHOLD) % THRESHOLD
  }

  async #parseInput(input: Bun.BunFile): Promise<Rotation[]> {
    const text = await input.text()
    return text.split("\n").map(line => line.trim()).filter(line => line.length > 0) as Rotation[]
  }
}
