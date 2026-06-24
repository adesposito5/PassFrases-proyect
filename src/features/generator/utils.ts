import wordLists from './wordLists.json'
import type { PasswordConfig, PasswordResult, StrengthLevel, ReuseWarning } from './types'

/**
 * Returns a cryptographically random element from an array
 */
export function pickRandom<T>(list: T[]): T {
  const randomArray = new Uint32Array(1)
  crypto.getRandomValues(randomArray)
  const randomIndex = randomArray[0] % list.length
  return list[randomIndex]
}

/**
 * Calculates entropy (bits) for a generated password
 */
export function calculateEntropy(
  password: string,
  config: PasswordConfig,
): number {
  let alphabetSize = 26

  if (config.capitalize) {
    alphabetSize += 26
  }

  if (config.includeNumbers) {
    alphabetSize += 10
  }

  if (config.includeSymbols) {
    alphabetSize += 32
  }

  const allWords = Object.values(wordLists).flat()
  const wordPoolSize = allWords.length
  const wordEntropy = Math.log2(wordPoolSize) * config.wordCount

  let extraBits = 0
  if (config.includeNumbers) {
    extraBits += Math.log2(90)
  }
  if (config.includeSymbols) {
    extraBits += Math.log2(7)
  }

  const result = Math.log2(alphabetSize) + wordEntropy + extraBits
  return Math.round(result)
}

/**
 * Returns the strength level based on entropy bits
 */
export function getStrengthLevel(bits: number): StrengthLevel {
  if (bits < 28) {
    return 'weak'
  }
  if (bits < 36) {
    return 'medium'
  }
  if (bits < 60) {
    return 'strong'
  }
  return 'very-strong'
}

/**
 * Returns an array of actionable recommendation strings in Spanish
 */
export function getRecommendations(
  config: PasswordConfig,
  level: StrengthLevel,
): string[] {
  if (level === 'very-strong') {
    return ['¡Contraseña excelente! Lista para usar.']
  }

  const recommendations: string[] = []

  if (level === 'weak') {
    if (!config.includeSymbols) {
      recommendations.push('Habilita símbolos para mejorar la seguridad.')
    }
    if (!config.includeNumbers) {
      recommendations.push('Agrega números para más complejidad.')
    }
    if (config.wordCount < 6) {
      recommendations.push('Aumenta el número de palabras.')
    }
  } else if (level === 'medium') {
    if (!config.includeSymbols) {
      recommendations.push('Habilita símbolos para mayor seguridad.')
    }
    if (config.wordCount < 6) {
      recommendations.push('Agrega una palabra más para más entropía.')
    }
  } else if (level === 'strong') {
    if (!config.includeSymbols) {
      recommendations.push(
        'Habilita símbolos para alcanzar nivel muy fuerte.',
      )
    }
  }

  return recommendations
}

let _uniqueId = 0

/**
 * Generates a unique sequential ID for batch results
 */
export function batchId(): string {
  return `b_${++_uniqueId}`
}

/**
 * Computes a simple character-level similarity ratio (0–1) between two strings.
 * Uses dice coefficient on bigrams.
 */
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

/**
 * Checks a list of passwords against history for reuse warnings
 */
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

/**
 * Generates a batch of passwords
 */
export function generateBatch(config: PasswordConfig, count: number): PasswordResult[] {
  return Array.from({ length: count }, () => generatePassword(config))
}

/**
 * Generates a password based on the provided configuration
 */
export function generatePassword(config: PasswordConfig): PasswordResult {
  const allWords = Object.values(wordLists).flat()
  const categories = Object.entries(wordLists).map(([name, words]) => ({
    words,
    name,
  }))

  let selectedWords: string[] = []
  let lastCategory: string | null = null

  // Pick words without repeating the same category consecutively
  for (let i = 0; i < config.wordCount; i++) {
    let word: string
    let category: string

    // Keep picking until we get a word from a different category (if possible)
    do {
      const cat = pickRandom(categories)
      word = pickRandom(cat.words)
      category = cat.name
    } while (
      lastCategory !== null &&
      category === lastCategory &&
      categories.length > 1
    )

    selectedWords.push(word)
    lastCategory = category
  }

  // Capitalize if requested
  if (config.capitalize) {
    selectedWords = selectedWords.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    )
  }

  // Join with separator
  let password = selectedWords.join(config.separator)

  // Append number if requested
  if (config.includeNumbers) {
    const randomNum = 10 + pickRandom(Array.from({ length: 90 }, (_, i) => i))
    password += config.separator + randomNum
  }

  // Append symbol if requested
  if (config.includeSymbols) {
    const symbols = ['!', '@', '#', '$', '%', '&', '*']
    password += pickRandom(symbols)
  }

  // Calculate entropy and strength
  const bits = calculateEntropy(password, config)
  const strength = getStrengthLevel(bits)
  const recommendations = getRecommendations(config, strength)

  return {
    password,
    bits,
    strength,
    recommendations,
  }
}
