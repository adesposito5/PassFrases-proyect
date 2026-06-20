import { useEffect } from 'react'
import { useGeneratorStore } from '@/features/generator/store'
import { generatePassword } from '@/features/generator/utils'
import type { SessionEntry } from '@/features/generator/types'

export default function GeneratorPanel() {
  const { config, currentResult, isGenerating, setGenerating, setResult, addToHistory } =
    useGeneratorStore()

  // Generate password on mount
  useEffect(() => {
    handleGenerate()
  }, [])

  const handleGenerate = () => {
    setGenerating(true)

    // Generate password
    const result = generatePassword(config)

    // Update store
    setResult(result)

    // Add to history
    const entry: SessionEntry = {
      id: crypto.randomUUID(),
      password: result.password,
      bits: result.bits,
      timestamp: Date.now(),
    }
    addToHistory(entry)

    setGenerating(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Password Display Card */}
      <div
        style={{
          padding: 'var(--space-6)',
          backgroundColor: 'var(--glass)',
          border: `1px solid var(--glass-border)`,
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--glass-shadow)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.75rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            wordBreak: 'break-all',
            color: 'var(--accent)',
            minHeight: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isGenerating ? 'Generando...' : currentResult?.password ?? '—'}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--gradient-cta)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          opacity: isGenerating ? 0.5 : 1,
          transition: 'opacity var(--duration-fast)',
        }}
      >
        Generar nueva
      </button>
    </div>
  )
}
