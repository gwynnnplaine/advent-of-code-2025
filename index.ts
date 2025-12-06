import type { Rotation } from "./challenges/day-1/rotation.type";
import { SecretEntrance } from "./challenges/day-1/secret-entrance";

const rotations = await Bun.file(`${import.meta.dir}/challenges/day-1/puzzle-input.txt`).text().then(text => text.split("\n").map(line => line.trim()).filter(line => line.length > 0)) as Rotation[]
const SecretEntranceProblem = new SecretEntrance(rotations)

console.log(`[Day 1] Secret Entrance password is: ${await SecretEntranceProblem.guessPassword()}`)
