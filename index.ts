import { SecretEntrance } from "./challenges/day-1/secret-entrance";

const SecretEntranceProblem = new SecretEntrance(`${import.meta.dir}/challenges/day-1/puzzle-input.txt`)

console.log(`[Day 1] Secret Entrance password is: ${await SecretEntranceProblem.guessPassword()}`)
