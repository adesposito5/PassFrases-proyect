import { usePasswordStore } from '@/features/generator/store'

export function GenButton() {
  const generate = usePasswordStore((state) => state.generate)

  return (
    <button
      onClick={generate}
      aria-label="Generar nueva contraseña"
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
        transition: `all var(--duration-fast) var(--ease-out)`,
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
      ✨ Generar nueva
    </button>
  )
}