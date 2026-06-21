import { useEffect } from 'react'
import { usePasswordStore } from '@/features/generator/store'
import { PasswordDisplay } from './PasswordDisplay'
import { GenButton } from './GenButton'

export default function GeneratorPanel() {
  const generate = usePasswordStore((state) => state.generate)

  // Generate password on mount
  useEffect(() => {
    generate()
  }, [generate])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <PasswordDisplay />
      <GenButton />
    </div>
  )
}
