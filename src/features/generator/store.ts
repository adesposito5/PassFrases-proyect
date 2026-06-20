import { create } from 'zustand'
import type { PasswordConfig, PasswordResult, SessionEntry } from './types'

const defaultConfig: PasswordConfig = {
  wordCount: 4,
  separator: '-',
  includeNumbers: true,
  includeSymbols: false,
  capitalize: true,
  category: 'mixed',
  wordLength: 'medium',
}

interface GeneratorState {
  config: PasswordConfig
  currentResult: PasswordResult | null
  sessionHistory: SessionEntry[]
  isGenerating: boolean
}

interface GeneratorActions {
  setConfig: (patch: Partial<PasswordConfig>) => void
  setResult: (result: PasswordResult) => void
  addToHistory: (entry: SessionEntry) => void
  clearHistory: () => void
  setGenerating: (value: boolean) => void
}

export const useGeneratorStore = create<GeneratorState & GeneratorActions>(
  (set) => ({
    config: defaultConfig,
    currentResult: null,
    sessionHistory: [],
    isGenerating: false,

    setConfig: (patch) =>
      set((state) => ({ config: { ...state.config, ...patch } })),
    setResult: (result) => set({ currentResult: result }),
    addToHistory: (entry) =>
      set((state) => ({
        sessionHistory: [entry, ...state.sessionHistory].slice(0, 10),
      })),
    clearHistory: () => set({ sessionHistory: [] }),
    setGenerating: (value) => set({ isGenerating: value }),
  }),
)

export type { GeneratorState, GeneratorActions }
