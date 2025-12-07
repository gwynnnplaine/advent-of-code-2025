import type { Rotation } from "./day-1/rotation.type";
import { SecretEntrance } from "./day-1/secret-entrance";
import { GiftShop } from './day-2/gift-shop';
import { Lobby } from "./day-3/lobby";

const rotations = await Bun.file(`${import.meta.dir}/day-1/input.txt`).text().then(text => text.split("\n").map(line => line.trim()).filter(line => line.length > 0)) as Rotation[]
const SecretEntranceProblem = new SecretEntrance(rotations)

console.log(`[Day 1] Secret Entrance password is: ${await SecretEntranceProblem.guessPassword()}`)

const productIdsRanges = await Bun.file(`${import.meta.dir}/day-2/input.txt`).text()
const GiftShopProblem = new GiftShop(productIdsRanges)

console.log(`[Day 2] Sum of invalid product IDs is: ${GiftShopProblem.solvePartTwo()}`)


const LobbyProblem = new Lobby(await Bun.file(`${import.meta.dir}/day-3/input.txt`).text())

console.log(`[Day 3] Total output joltage is: ${LobbyProblem.solvePartOne()}`)