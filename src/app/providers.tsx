import { BrowserRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import HistoryPanel from '@/features/batch/components/HistoryPanel'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      {children}
      <HistoryPanel />
    </BrowserRouter>
  )
}
