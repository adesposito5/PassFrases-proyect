import { Shield } from 'lucide-react'
import type { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--color-surface)',
        color: '#e2e2f0',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          borderBottom: `1px solid var(--color-border)`,
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <Shield
          size={24}
          style={{ color: 'var(--color-accent)' }}
        />
        <span
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          PassFrases
        </span>
      </nav>

      {/* Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 'min(100%, 960px)',
          }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
