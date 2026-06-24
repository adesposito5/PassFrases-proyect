import { useEffect } from 'react'
import { usePasswordStore } from '@/features/generator/store'
import { WizardLayout } from '@/features/generator/components/WizardLayout'
import GeneratorPanel from '@/features/generator/components/GeneratorPanel'

export default function GeneratorPage() {
  const generate = usePasswordStore((state) => state.generate)

  // Genera una contraseña al entrar a esta pantalla
  useEffect(() => {
    generate()
  }, [generate])

  return (
    <WizardLayout>
      <GeneratorPanel />
    </WizardLayout>
  )
}