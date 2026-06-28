import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from '@/app/providers'
import { AppRouter } from '@/app/router'
import { AppLayout } from '@/shared/components/ui/AppLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </Providers>
  </StrictMode>
)