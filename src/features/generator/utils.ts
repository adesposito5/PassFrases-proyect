import wordLists from './wordLists.json'
import type { PasswordAnalysis, PasswordRecommendation, PasswordResult, ReuseWarning } from './types'

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

export function generateBatch(count: number): PasswordResult[] {
  return Array.from({ length: count }, () => generatePassword())
}

export function analyzePassword(password: string): PasswordAnalysis {
  const normalized = password.trim()
  const words = normalized.split(/[-_ ]+/).filter(Boolean)
  const recommendations: PasswordRecommendation[] = []

  if (normalized.length < 24) {
    recommendations.push({
      id: 'length',
      title: 'Contraseña corta',
      detail: 'Una contraseña de al menos 24 caracteres es más resistente y reduce el riesgo de ataques de fuerza bruta.',
      severity: 'medium',
    })
  }

  if (!/[A-Z]/.test(normalized)) {
    recommendations.push({
      id: 'uppercase',
      title: 'Usar mayúsculas',
      detail: 'Agregar al menos una letra mayúscula aumentará la diversidad de caracteres y la fuerza de la contraseña.',
      severity: 'low',
    })
  }

  if (!/[^a-zA-Z0-9]/.test(normalized)) {
    recommendations.push({
      id: 'symbols',
      title: 'Agregar símbolos',
      detail: 'Incluir símbolos como !@#$% ayuda a que la contraseña sea más difícil de adivinar.',
      severity: 'low',
    })
  }

  if (words.length < 4) {
    recommendations.push({
      id: 'word-count',
      title: 'Agregar más palabras',
      detail: 'Un passphrase de cuatro o más palabras es más seguro que un conjunto corto de palabras.',
      severity: 'medium',
    })
  }

  const duplicateWords = words.filter((word, index) => words.indexOf(word) !== index)
  if (duplicateWords.length > 0) {
    recommendations.push({
      id: 'repeated-words',
      title: 'Palabras repetidas',
      detail: `Se encontraron palabras repetidas: ${[...new Set(duplicateWords)].join(', ')}. Evita repetir palabras para mejorar la entropía.`,
      severity: 'high',
    })
  }

  if (/(.)\1{2,}/.test(normalized)) {
    recommendations.push({
      id: 'repeat-characters',
      title: 'Caracteres repetidos',
      detail: 'Evita secuencias largas de caracteres repetidos, ya que reducen la variedad del passphrase.',
      severity: 'medium',
    })
  }

  const matchNumberSuffix = normalized.match(/(\d+)$/)
  if (matchNumberSuffix) {
    const numericValue = Number(matchNumberSuffix[1])
    if (numericValue >= 10 && numericValue <= 19) {
      recommendations.push({
        id: 'weak-number',
        title: 'Número predecible al final',
        detail: 'Un sufijo numérico cercano a 10-19 es más predecible que un número aleatorio mayor.',
        severity: 'low',
      })
    }
  }

  const entropy = null

  return {
    password: normalized,
    recommendations,
    entropy,
  }
}

export function generatePassword(): PasswordResult {
  const allWords = Object.values(wordLists).flat()
  const selectedWords: string[] = []
  for (let i = 0; i < 4; i++) {
    selectedWords.push(pickRandom(allWords))
  }
  const randomArr = new Uint32Array(1)
  crypto.getRandomValues(randomArr)
  const number = 10 + (randomArr[0] % 90)
  const password = selectedWords.join('-') + '-' + number
  return { password, analysis: analyzePassword(password) }
}
