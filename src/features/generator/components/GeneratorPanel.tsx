import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'
import { PasswordDisplay } from './PasswordDisplay'
import { GenButton } from './GenButton'

const SEPARATORS = [
  { value: '-', label: '-' },
  { value: '.', label: '.' },
  { value: '_', label: '_' },
] as const

const LEVELS = [
  { label: 'Básica',   words: 2 },
  { label: 'Media',    words: 4 },
  { label: 'Alta',     words: 6 },
] as const

const TOGGLES = [
  { icon: '⬆️', label: 'Mayúscula inicial',  key: 'capitalize' as const },
  { icon: '🔢', label: 'Incluir número',     key: 'includeNumbers' as const },
  { icon: '🔣', label: 'Símbolo especial',   key: 'includeSymbols' as const },
  { icon: '🧠', label: 'Palabras memorables', key: 'memorable' as const },
]

export default function GeneratorPanel() {
  const config = usePasswordStore((state) => state.config)
  const currentStep = usePasswordStore((state) => state.currentStep)
  const setWordCount = usePasswordStore((state) => state.setWordCount)
  const setSeparator = usePasswordStore((state) => state.setSeparator)
  const toggleNumbers = usePasswordStore((state) => state.toggleNumbers)
  const toggleSymbols = usePasswordStore((state) => state.toggleSymbols)
  const toggleCapitalize = usePasswordStore((state) => state.toggleCapitalize)
  const toggleMemorable = usePasswordStore((state) => state.toggleMemorable)
  const generate = usePasswordStore((state) => state.generate)
  const setStep = usePasswordStore((state) => state.setStep)
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const toggleMap: Record<string, () => void> = {
    capitalize: toggleCapitalize,
    includeNumbers: toggleNumbers,
    includeSymbols: toggleSymbols,
    memorable: toggleMemorable,
  }

  const toggleValues: Record<string, boolean> = {
    capitalize: config.capitalize,
    includeNumbers: config.includeNumbers,
    includeSymbols: config.includeSymbols,
    memorable: config.memorable,
  }

  function handleGenerate() {
    generate()
    setStep(3)
  }

  async function handleCopy() {
    const result = usePasswordStore.getState().currentResult
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleBackToStep2() {
    setStep(2)
  }

  function handleBackToStart() {
    setStep(1)
    navigate('/')
  }

  const currentResult = usePasswordStore((state) => state.currentResult)

  /* ═══════════════ STEP 2: PERSONALIZAR ═══════════════ */
  if (currentStep === 2) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', color: 'var(--color-text)' }}>
          Personalizá tu contraseña
        </h2>

        {/* ── Cantidad de palabras ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
              Cantidad de palabras
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {config.wordCount}
            </span>
          </div>
          <input
            type="range"
            min={2}
            max={8}
            step={1}
            value={config.wordCount}
            aria-label="Cantidad de palabras"
            aria-valuenow={config.wordCount}
            aria-valuemin={2}
            aria-valuemax={8}
            onChange={(e) => setWordCount(Number(e.target.value))}
            style={{
              width: '100%',
              height: '5px',
              appearance: 'none',
              WebkitAppearance: 'none',
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((config.wordCount - 2) / 6) * 100}%, var(--color-border) ${((config.wordCount - 2) / 6) * 100}%, var(--color-border) 100%)`,
              borderRadius: '99px',
              outline: 'none',
              cursor: 'pointer',
            }}
          />
        </div>

        {/* ── Nivel de seguridad ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Nivel de seguridad
          </span>
          <div role="radiogroup" aria-label="Nivel de seguridad" style={{ display: 'flex', gap: '0.5rem' }}>
            {LEVELS.map((level) => (
              <button
                key={level.words}
                role="radio"
                aria-checked={config.wordCount === level.words}
                onClick={() => setWordCount(level.words)}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.5rem',
                  border: `1px solid ${config.wordCount === level.words ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: config.wordCount === level.words ? 'var(--color-accent-soft)' : 'transparent',
                  color: config.wordCount === level.words ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  boxShadow: config.wordCount === level.words ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
                }}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Separador ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Separador
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {SEPARATORS.map((sep) => (
              <button
                key={sep.value}
                onClick={() => setSeparator(sep.value)}
                aria-selected={config.separator === sep.value}
                style={{
                  flex: 1,
                  padding: '0.65rem 0.5rem',
                  border: `1px solid ${config.separator === sep.value ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: config.separator === sep.value ? 'var(--color-accent-soft)' : 'transparent',
                  color: config.separator === sep.value ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  boxShadow: config.separator === sep.value ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
                }}
              >
                {sep.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Toggles (2x2 grid) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
          {TOGGLES.map((item) => (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.85rem',
                background: 'var(--color-accent-soft)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: 'var(--color-text)',
                userSelect: 'none',
              }}>
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </label>
              <button
                role="switch"
                aria-checked={toggleValues[item.key]}
                aria-label={item.label}
                onClick={toggleMap[item.key]}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  width: '38px',
                  height: '22px',
                  background: toggleValues[item.key] ? 'var(--gradient-blue)' : 'var(--color-border)',
                  borderRadius: '99px',
                  position: 'relative',
                  transition: 'background var(--duration-fast) var(--ease-out)',
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: toggleValues[item.key] ? '18px' : '2px',
                  width: '18px',
                  height: '18px',
                  background: toggleValues[item.key] ? '#fff' : 'var(--color-text-tertiary)',
                  borderRadius: '50%',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* ── Botón generar ── */}
        <GenButton onClick={handleGenerate} label="✨ Generar nueva contraseña" />

        {/* ── Volver a inicio ── */}
        <button
          onClick={handleBackToStart}
          style={{
            all: 'unset',
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: '0.25rem',
            fontSize: '0.85rem',
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-sans)',
            padding: '4px 0',
            transition: 'color var(--duration-fast) var(--ease-out)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-pink)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
        >
          ← Volver a inicio
        </button>
      </div>
    )
  }

  /* ═══════════════ STEP 3: RESULTADO ═══════════════ */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.8rem', display: 'inline-block', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 24px rgba(99,102,241,0.35))' }}>
        🛡️
      </div>

      <PasswordDisplay />

      {currentResult && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            onClick={handleGenerate}
            style={{
              all: 'unset',
              cursor: 'pointer',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.85rem',
              borderRadius: '12px',
              background: 'var(--gradient-blue)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              transition: 'all var(--duration-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,102,241,0.3)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = ''
              e.currentTarget.style.transform = ''
            }}
          >
            🔄 Generar nueva
          </button>
          <button
            onClick={handleCopy}
            style={{
              all: 'unset',
              cursor: 'pointer',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.85rem',
              borderRadius: '12px',
              background: copied ? 'var(--color-success-soft)' : 'var(--color-accent-soft)',
              color: copied ? 'var(--color-success)' : 'var(--color-text)',
              border: `1px solid ${copied ? 'rgba(34,197,94,0.2)' : 'var(--color-border)'}`,
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              transition: 'all var(--duration-fast) var(--ease-out)',
            }}
            onMouseEnter={(e) => {
              if (!copied) e.currentTarget.style.background = 'rgba(99,102,241,0.2)'
            }}
            onMouseLeave={(e) => {
              if (!copied) e.currentTarget.style.background = 'var(--color-accent-soft)'
            }}
          >
            {copied ? '✅ Copiado!' : '📋 Copiar'}
          </button>
        </div>
      )}

      <button
        onClick={handleBackToStep2}
        style={{
          all: 'unset',
          cursor: 'pointer',
          textAlign: 'center',
          marginTop: '0.25rem',
          fontSize: '0.85rem',
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-sans)',
          padding: '4px 0',
          transition: 'color var(--duration-fast) var(--ease-out)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-pink)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
      >
        ← Personalizar
      </button>
    </div>
  )
}
