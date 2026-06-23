import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PasswordConfig, PasswordResult, SessionEntry } from './types'
import { generatePassword } from './utils'

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
  // State
  config: PasswordConfig
  currentResult: PasswordResult | null
  sessionHistory: SessionEntry[]
  currentStep: 1 | 2 | 3;
  setStep: (step: 1 | 2 | 3) => void;
  // Config actions (for D2)
  setWordCount: (n: number) => void
  setSeparator: (s: string) => void
  toggleNumbers: () => void
  toggleSymbols: () => void
  toggleCapitalize: () => void
  setCategory: (c: string) => void
  setWordLength: (l: string) => void
  // Generation action
  generate: () => void
  clearHistory: () => void
}

export const usePasswordStore = create<PasswordState>(
  persist(
    (set, get) => ({
      config: defaultConfig,
      currentResult: null,
      sessionHistory: [],
      currentStep: 1 as const,
      setStep: (step) => set({ currentStep: step }),

      setWordCount: (n) =>
        set((state) => ({ config: { ...state.config, wordCount: n as 2 | 3 | 4 | 5 | 6 } })),
      setSeparator: (s) =>
        set((state) => ({ config: { ...state.config, separator: s as '-' | '.' | '_' } })),
      toggleNumbers: () =>
        set((state) => ({
          config: { ...state.config, includeNumbers: !state.config.includeNumbers },
        })),
      toggleSymbols: () =>
        set((state) => ({
          config: { ...state.config, includeSymbols: !state.config.includeSymbols },
        })),
      toggleCapitalize: () =>
        set((state) => ({
          config: { ...state.config, capitalize: !state.config.capitalize },
        })),
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
          sessionHistory: [entry, ...state.sessionHistory].slice(0, 10),
        })
      },

      clearHistory: () => set({ sessionHistory: [] }),
    }),
    {
      name: 'passfrases-config',
      partialize: (state) => ({ config: state.config }),
    },
  ),
)

export type { PasswordState }
