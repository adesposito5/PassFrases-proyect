import { Routes, Route, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'

const WizardStartPage = lazy(
  () => import('@/features/generator/pages/WizardStartPage'),
)
const GeneratorPage = lazy(
  () => import('@/features/generator/pages/GeneratorPage'),
)
const BatchPage = lazy(
  () => import('@/features/batch/pages/BatchPage'),
)

const LoadingFallback = (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
    Cargando…
  </div>
)

export function AppRouter() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/', { replace: true })
  }, [])

  return (
    <Suspense fallback={LoadingFallback}>
      <Routes>
        <Route path="/"          element={<WizardStartPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/batch"     element={<BatchPage />} />
      </Routes>
    </Suspense>
  )
}