import type { PasswordConfig, StrengthLevel } from "./types";
import wordLists from "./wordLists.json";

export function calculateEntropy(config: PasswordConfig): number {
	const wordList = Object.values(wordLists).flat();
	const listSize = wordList.length;
	const wordCombinations = Math.pow(listSize, config.wordCount);
	const numberRange = config.includeNumbers ? 990 : 1;
	const symbolCount = config.includeSymbols ? 8 : 1;
	const totalCombinations = wordCombinations * numberRange * symbolCount;
	return Math.log2(totalCombinations);
}

export function getStrengthLevel(bits: number): StrengthLevel {
	if (bits < 40) return 'weak';
	if (bits < 60) return 'medium';
	if (bits < 80) return 'strong';
	return 'very-strong';
}
