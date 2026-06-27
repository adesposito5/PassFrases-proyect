import { useNavigate } from 'react-router-dom'
import { usePasswordStore } from '@/features/generator/store'

export default function GeneratorPanel() {
  const currentResult = usePasswordStore((state) => state.currentResult)
  const currentStep = usePasswordStore((state) => state.currentStep)
  const generate = usePasswordStore((state) => state.generate)
  const setStep = usePasswordStore((state) => state.setStep)
  const navigate = useNavigate()

  function handleGenerate() {
    generate()
    setStep(3)
  }

  function handleBackToStep2() {
    setStep(2)
  }

  function handleBackToStart() {
    setStep(1)
    navigate('/')
  }

  /* ═══════════════ STEP 2: PERSONALIZAR ═══════════════ */
  if (currentStep === 2) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-[1.4rem] font-bold text-center text-[var(--color-text)]">
          Personalizá tu contraseña
        </h2>

        <div className="text-center p-6 text-[var(--color-text-tertiary)] text-sm border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)]">
          <p>Opciones de personalización próximamente</p>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          aria-label="Generar nueva contraseña"
          className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-[14px] text-white text-[1.05rem] font-bold transition-all duration-[var(--duration-fast)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(99,102,241,0.35)] cursor-pointer"
          style={{ background: 'var(--gradient-blue)' }}
        >
          ✨ Generar nueva
        </button>

        <button
          type="button"
          onClick={handleBackToStart}
          className="text-center text-sm text-[var(--color-text-tertiary)] py-1 transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-pink)] cursor-pointer"
        >
          ← Volver a inicio
        </button>
      </div>
    )
  }

  /* ═══════════════ STEP 3: RESULTADO ═══════════════ */
  return (
    <div className="flex flex-col gap-5 text-center">
      <div className="text-[2.8rem] inline-block mb-2 drop-shadow-[0_0_24px_rgba(99,102,241,0.35)]">
        🛡️
      </div>

      <div className="font-mono text-[1.4rem] font-bold tracking-tight px-6 py-5 bg-black/30 border border-[var(--color-border)] rounded-[14px] break-all leading-relaxed select-all text-[var(--color-text)] min-h-16 flex items-center justify-center">
        {currentResult?.password ?? 'Generando…'}
      </div>

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={handleGenerate}
          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-[12px] text-white text-sm font-semibold transition-all duration-[var(--duration-fast)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:-translate-y-px cursor-pointer"
          style={{ background: 'var(--gradient-blue)' }}
        >
          🔄 Generar nueva
        </button>
      </div>

      <button
        type="button"
        onClick={handleBackToStep2}
        className="text-center text-sm text-[var(--color-text-tertiary)] py-1 transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-pink)] cursor-pointer"
      >
        ← Personalizar
      </button>
    </div>
  )
}