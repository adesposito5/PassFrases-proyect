import { usePasswordStore } from '@/features/generator/store'
import { Button } from '@/shared/components/ui/Button'

export function GenButton() {
  const generate = usePasswordStore((state) => state.generate)

  return (
    <Button variant="primary" size="md" onClick={generate} className="w-full">
      ✨ Generar
    </Button>
  )
}
