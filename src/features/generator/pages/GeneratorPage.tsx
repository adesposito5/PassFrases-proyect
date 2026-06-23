import { useEffect } from 'react'
import { usePasswordStore } from '@/features/generator/store'
import { WizardLayout } from '@/features/generator/components/WizardLayout'
import GeneratorPanel from '@/features/generator/components/GeneratorPanel'

export default function GeneratorPage() {
  const setStep = usePasswordStore((state) => state.setStep)

  useEffect(() => {
    setStep(2)
  }, [setStep])

  return (
    <WizardLayout>
      <GeneratorPanel />
    </WizardLayout>
  )
}
