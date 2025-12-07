export class Lobby {
    #batteriesBanks: string[] = []

    constructor(batteriesBanksText: string) {
        this.#batteriesBanks = this.#parseBatteriesBanksText(batteriesBanksText)

        this.#batteriesBanks.map(this.#findMaxInEachBank)
    }

    solvePartOne(): number {
        const maxNumbers = this.#batteriesBanks.map(this.#findMaxInEachBank)
        return maxNumbers.reduce((acc, num) => acc + Number(num), 0)
    }

    #findMaxInEachBank(bank: string): string {
        const digits = bank.split("").map(Number)

        const max = Math.max(...digits.slice(0, -1))
        const nextMaxDigit = Math.max(...digits.slice(digits.indexOf(max) + 1))

        return `${max}${nextMaxDigit}`
    }

    solvePartTwo(): number {
        const maxNumbers = this.#batteriesBanks.map(this.#find12MaxInEachBank)
        return maxNumbers.reduce((acc, num) => acc + Number(num), 0)
    }

    #find12MaxInEachBank(bank: string): string {
        const EXPECTED_LENGTH = 12
        const digits = bank.split("").map(Number)

        const stack: number[] = []

        let removals = digits.length - EXPECTED_LENGTH

        for (const digit of digits) {
            if (stack.length === 0) {
                stack.push(digit)
                continue
            }

            while (stack.length > 0 && stack[stack.length - 1]! < digit && removals > 0) {
                stack.pop()
                removals--
            }

            stack.push(digit)
        }

        return stack.join("").slice(0, EXPECTED_LENGTH)
    }

    #parseBatteriesBanksText(batteriesBanksText: string): string[] {
        return batteriesBanksText.trim().split("\n").flatMap(line =>
            line.split("\t")
        )
    }
}