import { usePasswordStore } from '@/features/generator/store'
import { PasswordDisplay } from './PasswordDisplay'
import { GenButton } from './GenButton'

const SEPARATORS = [
  { value: '-', label: '-' },
  { value: '.', label: '.' },
  { value: '_', label: '_' },
]

export default function GeneratorPanel() {
  const config         = usePasswordStore((state) => state.config)
  const setWordCount   = usePasswordStore((state) => state.setWordCount)
  const setSeparator   = usePasswordStore((state) => state.setSeparator)
  const toggleNumbers  = usePasswordStore((state) => state.toggleNumbers)
  const toggleSymbols  = usePasswordStore((state) => state.toggleSymbols)
  const toggleCapitalize = usePasswordStore((state) => state.toggleCapitalize)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      <h2 style={{
        fontSize: '1.4rem',
        fontWeight: 700,
        textAlign: 'center',
        color: 'var(--color-text)',
      }}>
        Personalizá tu contraseña
      </h2>

      {/* ── Cantidad de palabras ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
            Cantidad de palabras
          </span>
          <span style={{
            fontSize: '0.85rem',
            color: 'var(--color-accent)',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
          }}>
            {config.wordCount}
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={6}
          step={1}
          value={config.wordCount}
          aria-label="Cantidad de palabras"
          aria-valuenow={config.wordCount}
          aria-valuemin={2}
          aria-valuemax={6}
          onChange={(e) => setWordCount(Number(e.target.value))}
          style={{
            width: '100%',
            height: '5px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((config.wordCount - 2) / 4) * 100}%, var(--color-border) ${((config.wordCount - 2) / 4) * 100}%, var(--color-border) 100%)`,
            borderRadius: '99px',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
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
                transition: `all var(--duration-fast) var(--ease-out)`,
                boxShadow: config.separator === sep.value ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
              }}
            >
              {sep.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Toggles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        {[
          { label: '123', desc: 'Números',    value: config.includeNumbers,  toggle: toggleNumbers },
          { label: 'Aa',  desc: 'Mayúsculas', value: config.capitalize,      toggle: toggleCapitalize },
          { label: '!@#', desc: 'Símbolos',   value: config.includeSymbols,  toggle: toggleSymbols },
        ].map((item) => (
          <div
            key={item.desc}
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
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: 'var(--color-text)',
                userSelect: 'none',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                {item.label}
              </span>
              {item.desc}
            </label>

            {/* Toggle switch */}
            <button
              role="switch"
              aria-checked={item.value}
              aria-label={item.desc}
              onClick={item.toggle}
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: '38px',
                height: '22px',
                background: item.value ? 'var(--gradient-blue)' : 'var(--color-border)',
                borderRadius: '99px',
                position: 'relative',
                transition: `background var(--duration-fast) var(--ease-out)`,
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: item.value ? '18px' : '2px',
                width: '18px',
                height: '18px',
                background: item.value ? '#fff' : 'var(--color-text-tertiary)',
                borderRadius: '50%',
                transition: `all var(--duration-fast) var(--ease-out)`,
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* ── Password display + barra de entropía ── */}
      <PasswordDisplay />

      {/* ── Botón generar ── */}
      <GenButton />

    </div>
  )
}