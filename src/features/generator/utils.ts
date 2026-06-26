import wordLists from './wordLists.json'
import type { PasswordResult, ReuseWarning } from './types'
import type { PasswordConfig } from './types'

export function pickRandom<T>(list: T[]): T {
  const randomArray = new Uint32Array(1)
  crypto.getRandomValues(randomArray)
  const randomIndex = randomArray[0] % list.length
  return list[randomIndex]
}

let _uniqueId = 0

export function batchId(): string {
  return `b_${++_uniqueId}`
}

export function phraseSimilarity(a: string, b: string): number {
  const bigrams = (s: string) => {
    const map = new Map<string, number>()
    for (let i = 0; i < s.length - 1; i++) {
      const bg = s.slice(i, i + 2)
      map.set(bg, (map.get(bg) ?? 0) + 1)
    }
    return map
  }

  const bgA = bigrams(a.toLowerCase())
  const bgB = bigrams(b.toLowerCase())
  let intersect = 0

  for (const [bg, count] of bgA) {
    intersect += Math.min(count, bgB.get(bg) ?? 0)
  }

  const total = [...bgA.values()].reduce((s, c) => s + c, 0) +
                [...bgB.values()].reduce((s, c) => s + c, 0)

  return total === 0 ? 0 : (2 * intersect) / total
}

export function checkReuseWarnings(
  passwords: string[],
  history: string[],
  threshold = 0.6,
): ReuseWarning[] {
  const warnings: ReuseWarning[] = []

  for (let i = 0; i < passwords.length; i++) {
    for (const historic of history) {
      const sim = phraseSimilarity(passwords[i], historic)
      if (sim >= threshold) {
        warnings.push({
          index: i,
          password: passwords[i],
          similarTo: historic,
          similarity: Math.round(sim * 100),
        })
        break
      }
    }
  }

  return warnings
}

export function generateBatch(count: number, options: PasswordConfig): PasswordResult[] {
  return Array.from({ length: count }, () => generatePassword(options))
}

export function generatePassword(options: PasswordConfig): PasswordResult {
  const allWords = Object.values(wordLists).flat()
  const selectedWords: string[] = []
  for (let i = 0; i < options.wordCount; i++) {
    let word = pickRandom(allWords)
    if (options.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1)
    }
    selectedWords.push(word)
  }

  const parts = [...selectedWords]

  if (options.includeSymbols) {
    const symbols = ['!', '@', '#', '$', '%', '&', '*']
    parts.push(pickRandom(symbols))
  }

  if (options.includeNumbers) {
    const randomArr = new Uint32Array(1)
    crypto.getRandomValues(randomArr)
    parts.push(String(10 + (randomArr[0] % 90)))
  }

  return { password: parts.join(options.separator) }
}
