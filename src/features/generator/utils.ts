import objects from './data/words-objects.json'
import actions from './data/words-actions.json'
import places from './data/words-places.json'
import type { PasswordConfig, PasswordResult, StrengthLevel } from './types'

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
  let alphabetSize = 26 // lowercase letters always present

  if (config.capitalize) {
    alphabetSize += 26
  }

  if (config.includeNumbers) {
    alphabetSize += 10
  }

  if (config.includeSymbols) {
    alphabetSize += 32
  }

  // Factor in word pool size
  const wordPoolSize = objects.length + actions.length + places.length
  const wordEntropy = Math.log2(wordPoolSize) * config.wordCount

  // Entropy from separator and any appended numbers/symbols
  let extraBits = 0
  if (config.includeNumbers) {
    extraBits += Math.log2(90) // 10–99 range
  }
  if (config.includeSymbols) {
    extraBits += Math.log2(7) // 7 symbols
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

/**
 * Generates a password based on the provided configuration
 */
export function generatePassword(config: PasswordConfig): PasswordResult {
  const allWords = [...objects, ...actions, ...places]
  const categories = [
    { words: objects, name: 'objects' },
    { words: actions, name: 'actions' },
    { words: places, name: 'places' },
  ]

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
