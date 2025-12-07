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

    #parseBatteriesBanksText(batteriesBanksText: string): string[] {
        return batteriesBanksText.trim().split("\n").flatMap(line =>
            line.split("\t")
        )
    }
}