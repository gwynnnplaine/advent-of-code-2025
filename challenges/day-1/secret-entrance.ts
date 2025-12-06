import type { Direction, Rotation } from "./rotation.type";

const THRESHOLD = 100

const DEFAULT_STARTING_POSITION = 50

export class SecretEntrance {
  #rotations: Rotation[] = []

  constructor(rotations: Rotation[]) {
    this.#rotations = rotations
  }

  async guessPassword(): Promise<number> {
    return this.rotateDial(this.#rotations, DEFAULT_STARTING_POSITION)
  }

  rotateDial(rotations: Rotation[], currentPosition: number): number {
    let newPosition = currentPosition
    let password = 0

    for (const rotation of rotations) {
      const direction = this.#getDirection(rotation)
      const amount = this.#getAmount(rotation)

      switch (direction) {
        case "L":
          const leftRotation = this.#rotateLeft(newPosition, amount)
          newPosition = leftRotation[0]
          password += leftRotation[1]
          break
        case "R":
          const rightRotation = this.#rotateRight(newPosition, amount)
          newPosition = rightRotation[0]
          password += rightRotation[1]
          break
        default:
          throw new Error(`Invalid direction: ${direction}`)
      }
    }

    return password

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

  #rotateLeft(currentPosition: number, amount: number): [number, number] {
    const fullRotations = Math.floor(amount / THRESHOLD)
    const left = this.#calculateModulo(amount)
    const newPosition = this.#calculateModulo(currentPosition - left)
    
    if (currentPosition === 0) {
      return [newPosition, fullRotations]
    }

    if (left < currentPosition) {
      return [newPosition, fullRotations]
    }

   return [newPosition, fullRotations + 1]
  }

  #rotateRight(currentPosition: number, amount: number): [number, number] {
    const fullRotations = Math.floor(amount / THRESHOLD)
    const left = this.#calculateModulo(amount)
    const newPosition = this.#calculateModulo(currentPosition + left)

    if (currentPosition === 0) {
      return [newPosition, fullRotations]
    }
    
    if (left < (THRESHOLD - currentPosition)) {
      return [newPosition, fullRotations]
    }

    return [newPosition, fullRotations + 1]
  }

  #calculateModulo(position: number): number {
    if (position < 0) {
      return (THRESHOLD + position) % THRESHOLD
    }

    return position % THRESHOLD
  }
}
