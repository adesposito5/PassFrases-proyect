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
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: `1px solid var(--border)`,
          backgroundColor: 'var(--bg)',
        }}
      >
        <Shield
          size={24}
          style={{ color: 'var(--accent)' }}
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
          padding: 'var(--space-6)',
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
