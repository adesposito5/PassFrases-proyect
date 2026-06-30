import type { ReactNode } from 'react'
import { StepProgress } from './StepProgress'

interface WizardLayoutProps {
  children: ReactNode
}

export function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ width: '100%', maxWidth: '520px' }}>
        <StepProgress />

        {/* Glass card */}
        <div
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--glass-shadow)',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow interior sutil */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background:
                'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.03) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />
          {children}
        </div>
      </div>
    </div>
  )
}