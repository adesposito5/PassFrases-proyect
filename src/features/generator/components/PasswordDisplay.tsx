import { usePasswordStore } from '@/features/generator/store'
import { Card } from '@/shared/components/ui/Card'

export function PasswordDisplay() {
  const currentResult = usePasswordStore((state) => state.currentResult)

  return (
    <Card>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.875rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          wordBreak: 'break-all',
          color: 'var(--color-accent)',
          minHeight: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {currentResult ? currentResult.password : 'Generando...'}
      </div>
    </Card>
  )
}
