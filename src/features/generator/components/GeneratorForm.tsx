// src/features/generator/components/GeneratorForm.tsx
// D2 — Personalización · Integrante 2
// Fase 1: Maquetado estático con estado local (sin Zustand todavía)

// ─── 1. Imports de React ──────────────────────────────────────────────────────
import { useState } from 'react'

// ─── 2. Tipo local de opciones (a mover a types.ts en coordinación con I1) ───
//    Nota al equipo: PasswordOptions debe agregarse a types.ts para que
//    las fases 2 y 3 puedan consumirlo desde el store. Requiere consenso.
export interface PasswordOptions {
  wordCount: number    // 2 | 3 | 4 | 5 | 6
  separator: string    // '-' | '.' | '_' | ' '
  includeNumbers: boolean
  includeSymbols: boolean
  capitalize: boolean
}

// ─── 3. Valores por defecto ───────────────────────────────────────────────────
const DEFAULT_OPTIONS: PasswordOptions = {
  wordCount: 4,
  separator: '-',
  includeNumbers: true,
  includeSymbols: false,
  capitalize: true,
}

// ─── 4. Estilos reutilizables (inline, siguiendo el patrón de GeneratorPanel) ─
const labelStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--color-text-secondary)',
  marginBottom: '0.5rem',
  fontFamily: 'var(--font-sans)',
}

const sectionStyle: React.CSSProperties = {
  marginBottom: '1.25rem',
}

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: 'var(--color-border)',
  margin: '1.25rem 0',
}

// ─── 5. Componente principal ──────────────────────────────────────────────────
export function GeneratorForm() {
  // Estado LOCAL: vive solo en este componente por ahora
  // En Fase 3 se conectará al store mediante generate(options)
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS)

  // Helper tipado para actualizar un campo sin mutar el objeto
  function updateOption<K extends keyof PasswordOptions>(
    key: K,
    value: PasswordOptions[K],
  ) {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div>
      {/* ── Título ─────────────────────────────────────────────────────── */}
      <h2
        style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-sans)',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em',
        }}
      >
        Personalizá tu contraseña
      </h2>

      {/* ── SLIDER: Cantidad de palabras ───────────────────────────────── */}
      <div style={sectionStyle}>
        <label
          htmlFor="wordCount"
          style={labelStyle}
        >
          <span>Cantidad de palabras</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: 'var(--color-accent)',
              minWidth: '1.5rem',
              textAlign: 'right',
            }}
          >
            {options.wordCount}
          </span>
        </label>

        <input
          id="wordCount"
          type="range"
          min={2}
          max={6}
          step={1}
          value={options.wordCount}
          onChange={(e) => updateOption('wordCount', Number(e.target.value))}
          aria-label={`Cantidad de palabras: ${options.wordCount}`}
          style={{
            width: '100%',
            accentColor: 'var(--color-accent)',
            cursor: 'pointer',
            height: '4px',
            appearance: 'auto',
          }}
        />

        {/* Marcadores del rango */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.35rem',
          }}
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <span
              key={n}
              style={{
                fontSize: '0.7rem',
                color: options.wordCount === n
                  ? 'var(--color-accent)'
                  : 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontWeight: options.wordCount === n ? 700 : 400,
                transition: 'color 150ms',
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div style={dividerStyle} />

      {/* ── SELECT: Separador ──────────────────────────────────────────── */}
      <div style={sectionStyle}>
        <label
          htmlFor="separator"
          style={labelStyle}
        >
          Separador
        </label>

        <select
          id="separator"
          value={options.separator}
          onChange={(e) => updateOption('separator', e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border-color 150ms',
            appearance: 'auto',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-focus)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)'
          }}
        >
          <option value="-">Guión  ( - )</option>
          <option value=".">Punto  ( . )</option>
          <option value="_">Guión bajo  ( _ )</option>
          <option value=" ">Espacio</option>
        </select>
      </div>

      <div style={dividerStyle} />

      {/* ── TOGGLES: Opciones booleanas ────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
        <ToggleOption
          id="includeNumbers"
          label="Incluir números"
          description="Agrega un número al final (ej: 42)"
          checked={options.includeNumbers}
          onChange={(val) => updateOption('includeNumbers', val)}
        />
        <ToggleOption
          id="includeSymbols"
          label="Incluir símbolos"
          description="Agrega un símbolo especial (ej: !)"
          checked={options.includeSymbols}
          onChange={(val) => updateOption('includeSymbols', val)}
        />
        <ToggleOption
          id="capitalize"
          label="Capitalizar"
          description="Primera letra de cada palabra en mayúscula"
          checked={options.capitalize}
          onChange={(val) => updateOption('capitalize', val)}
        />
      </div>

      {/* ── BOTÓN: Generar ─────────────────────────────────────────────── */}
      {/* En Fase 3: onClick conectará con generate(options) del store     */}
      <button
        type="button"
        aria-label="Generar contraseña con las opciones seleccionadas"
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%',
          padding: '1rem',
          borderRadius: '14px',
          background: 'var(--gradient-blue)',
          color: '#fff',
          fontSize: '1.05rem',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          transition: 'all var(--duration-fast) var(--ease-out)',
          boxSizing: 'border-box',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.35)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.boxShadow = ''
        }}
      >
        ✨ Generar contraseña
      </button>
    </div>
  )
}

// ─── 6. Subcomponente: Toggle individual ─────────────────────────────────────
//        Sigue el mismo patrón visual que los botones de GeneratorPanel

interface ToggleOptionProps {
  id: string
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}

function ToggleOption({ id, label, description, checked, onChange }: ToggleOptionProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      {/* Textos */}
      <div>
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          {label}
        </label>
        <p
          style={{
            margin: 0,
            fontSize: '0.75rem',
            color: 'var(--color-text-tertiary)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {description}
        </p>
      </div>

      {/* Toggle switch */}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0,
          position: 'relative',
          width: '2.75rem',
          height: '1.5rem',
          borderRadius: '99px',
          border: 'none',
          cursor: 'pointer',
          background: checked ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)',
          transition: 'background 200ms var(--ease-out)',
          outline: 'none',
          padding: 0,
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-border-focus)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = ''
        }}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? 'calc(100% - 21px)' : '3px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
            transition: 'left 200ms var(--ease-out)',
          }}
        />
      </button>
    </div>
  )
}