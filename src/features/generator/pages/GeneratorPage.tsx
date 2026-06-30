import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'
import { WizardLayout } from '@/shared/components/ui/WizardLayout'
import GeneratorPanel from '@/features/generator/components/GeneratorPanel'

export default function GeneratorPage() {
  const navigate = useNavigate()
  const generate = usePasswordStore((state) => state.generate)
  const setStep  = usePasswordStore((state) => state.setStep)

  useEffect(() => {
    generate()
  }, [generate])

  function handleBack() {
    setStep(1)
    navigate('/')
  }

  return (
    <WizardLayout>
      {/* Botón volver */}
      <button
        onClick={handleBack}
        aria-label="Volver al inicio"
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '1.25rem',
          fontFamily: 'var(--font-sans)',
          transition: `color var(--duration-fast) var(--ease-out)`,
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
      >
        ← Volver
      </button>

      <GeneratorPanel />
    </WizardLayout>
  )
}