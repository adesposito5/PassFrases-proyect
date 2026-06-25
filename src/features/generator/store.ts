import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PasswordConfig, PasswordResult, SessionEntry, BatchResult, ReuseWarning } from './types'
import { generatePassword, generateBatch, checkReuseWarnings } from './utils'

const defaultConfig: PasswordConfig = {
  wordCount: 4,
  separator: '-',
  includeNumbers: true,
  includeSymbols: false,
  capitalize: true,
}
interface PasswordState {
  config: PasswordConfig
  currentResult: PasswordResult | null
  sessionHistory: SessionEntry[]
  batchResults: BatchResult | null
  batchCount: number
  batchWarnings: ReuseWarning[]
  currentStep: 1 | 2 | 3
  historyOpen: boolean

  setStep: (step: 1 | 2 | 3) => void
  toggleHistory: () => void

  generate: () => void
  generateBatch: () => void
  setBatchCount: (n: number) => void
  clearHistory: () => void
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      currentResult: null,
      sessionHistory: [],
      batchResults: null,
      batchCount: 5,
      batchWarnings: [],
      currentStep: 1 as const,
      historyOpen: false,

      setStep: (step) => set({ currentStep: step }),
      toggleHistory: () => set((state) => ({ historyOpen: !state.historyOpen })),

      generate: () => {
        const state = get()
        const result = generatePassword()
        const entry: SessionEntry = {
          id: crypto.randomUUID(),
          password: result.password,
          timestamp: Date.now(),
        }
        set({
          currentResult: result,
          sessionHistory: [entry, ...state.sessionHistory].slice(0, 50),
        })
      },

      generateBatch: () => {
        const state = get()
        const results = generateBatch(state.batchCount)

        const entries: SessionEntry[] = results.map((r) => ({
          id: crypto.randomUUID(),
          password: r.password,
          timestamp: Date.now(),
        }))

        const historyPasswords = state.sessionHistory.map((e) => e.password)
        const newPasswords = entries.map((e) => e.password)
        const warnings = checkReuseWarnings(newPasswords, historyPasswords)

        set({
          batchResults: { results, generatedAt: Date.now() },
          batchWarnings: warnings,
          sessionHistory: [...entries, ...state.sessionHistory].slice(0, 50),
        })
      },

      setBatchCount: (n) => set({ batchCount: n }),
      clearHistory: () => set({ sessionHistory: [], batchResults: null, batchWarnings: [] }),
    }),
    {
      name: 'passfrases-config',
      partialize: (state) => ({ config: state.config }),
    },
  ),
)

export type { PasswordState }
