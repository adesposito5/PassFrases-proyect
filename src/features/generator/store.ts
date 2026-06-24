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
  category: 'mixed',
  wordLength: 'medium',
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

  setWordCount: (n: number) => void
  setSeparator: (s: string) => void
  toggleNumbers: () => void
  toggleSymbols: () => void
  toggleCapitalize: () => void
  setCategory: (c: string) => void
  setWordLength: (l: string) => void

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

      setWordCount: (n) =>
        set((state) => ({ config: { ...state.config, wordCount: n as 2 | 3 | 4 | 5 | 6 } })),
      setSeparator: (s) =>
        set((state) => ({ config: { ...state.config, separator: s as '-' | '.' | '_' } })),
      toggleNumbers: () =>
        set((state) => ({ config: { ...state.config, includeNumbers: !state.config.includeNumbers } })),
      toggleSymbols: () =>
        set((state) => ({ config: { ...state.config, includeSymbols: !state.config.includeSymbols } })),
      toggleCapitalize: () =>
        set((state) => ({ config: { ...state.config, capitalize: !state.config.capitalize } })),
      setCategory: (c) =>
        set((state) => ({ config: { ...state.config, category: c as any } })),
      setWordLength: (l) =>
        set((state) => ({ config: { ...state.config, wordLength: l as 'short' | 'medium' | 'long' } })),

      generate: () => {
        const state = get()
        const result = generatePassword(state.config)
        const entry: SessionEntry = {
          id: crypto.randomUUID(),
          password: result.password,
          bits: result.bits,
          timestamp: Date.now(),
        }
        set({
          currentResult: result,
          sessionHistory: [entry, ...state.sessionHistory].slice(0, 50),
        })
      },

      generateBatch: () => {
        const state = get()
        const results = generateBatch(state.config, state.batchCount)

        const entries: SessionEntry[] = results.map((r) => ({
          id: crypto.randomUUID(),
          password: r.password,
          bits: r.bits,
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
