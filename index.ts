import type { Rotation } from "./day-1/rotation.type";
import { SecretEntrance } from "./day-1/secret-entrance";
import { GiftShop } from './day-2/gift-shop';
import { Lobby } from "./day-3/lobby";

const days = [
    {
        day: 1,
        solver: async () => {
            const rotations = await Bun.file(`${import.meta.dir}/day-1/input.txt`).text()
                .then(text => text.split("\n").map(line => line.trim()).filter(line => line.length > 0)) as Rotation[]
            return new SecretEntrance(rotations).guessPassword()
        }
    },
    {
        day: 2,
        solver: async () => {
            const productIdsRanges = await Bun.file(`${import.meta.dir}/day-2/input.txt`).text()
            return new GiftShop(productIdsRanges).solvePartTwo()
        }
    },
    {
        day: 3,
        solver: async () => {
            const text = await Bun.file(`${import.meta.dir}/day-3/input.txt`).text()
            return new Lobby(text).solvePartOne()
        }
    }
]

const dayArg = process.argv[2] ? parseInt(process.argv[2], 10) : null

for (const { day, solver } of days) {
    if (dayArg && day !== dayArg) continue
    const result = await solver()
    console.log(`[Day ${day}] Result: ${result}`)
}