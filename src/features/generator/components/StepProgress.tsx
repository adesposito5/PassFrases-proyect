import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'

const STEPS = [
  { number: 1, label: 'Inicio' },
  { number: 2, label: 'Personalizar' },
  { number: 3, label: 'Resultado' },
]

export function StepProgress() {
  const currentStep = usePasswordStore((state) => state.currentStep)
  const setStep = usePasswordStore((state) => state.setStep)
  const navigate = useNavigate()

  function handleStepClick(step: number) {
    if (step === 3) return
    if (step === 1) {
      setStep(1)
      navigate('/')
      return
    }
    if (step === 2) {
      setStep(2)
      navigate('/generator')
      return
    }
  }

  return (
    <div
      className="steps"
      data-step={currentStep}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem',
        position: 'relative',
        width: '100%',
        padding: '0.5rem 0',
      }}
    >
      {/* Connecting line track */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 'calc(50% - 140px)',
        right: 'calc(50% - 140px)',
        height: '2px',
        background: 'var(--color-border)',
        transform: 'translateY(-50%)',
        borderRadius: '1px',
        zIndex: 0,
      }} />

      {/* Connecting line fill */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 'calc(50% - 140px)',
        height: '2px',
        background: 'linear-gradient(90deg, var(--color-pink), var(--color-accent))',
        transform: 'translateY(-50%)',
        borderRadius: '1px',
        zIndex: 1,
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
      }} />

      {STEPS.map((step) => {
        const isActive = currentStep === step.number
        const isDone = currentStep > step.number

        return (
          <div
            key={step.number}
            onClick={() => handleStepClick(step.number)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleStepClick(step.number)
              }
            }}
            role="tab"
            aria-selected={isActive}
            tabIndex={step.number === 3 ? -1 : 0}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              position: 'relative',
              zIndex: 2,
              width: '100px',
              cursor: step.number === 3 ? 'default' : 'pointer',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontSize: '0.9rem',
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              ...(isActive
                ? {
                    background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                    border: 'none',
                    color: '#fff',
                    boxShadow: '0 0 20px var(--color-pink-glow)',
                  }
                : isDone
                ? {
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    color: '#fff',
                  }
                : {
                    background: 'rgba(12,18,40,0.8)',
                    border: '2px solid var(--color-border)',
                    color: 'var(--color-text-tertiary)',
                  }),
            }}>
              {step.number}
            </div>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontFamily: 'var(--font-sans)',
              transition: 'color 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              color: isActive
                ? 'var(--color-pink)'
                : isDone
                ? 'var(--color-accent)'
                : 'var(--color-text-tertiary)',
            }}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
