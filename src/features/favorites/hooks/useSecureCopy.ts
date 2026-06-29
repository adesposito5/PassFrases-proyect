import { useState, useCallback } from "react"
import { useFavoriteStore } from "@/features/favorites/store"

export function useSecureCopy() {
  const [isCopying, setIsCopying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copy = useFavoriteStore((s) => s.copyToClipboard)

  const secureCopy = useCallback(
    async (id: string, passphrase: string): Promise<boolean> => {
      setIsCopying(true)
      setError(null)

      try {
        const result = await copy(id, passphrase)

        if (result === null) {
          setError("Passphrase incorrecta. No se puede descifrar esta contraseña.")
          setIsCopying(false)
          return false
        }

        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
        setIsCopying(false)
        return true
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "Error al descifrar la contraseña."
        setError(msg)
        setIsCopying(false)
        return false
      }
    },
    [copy],
  )

  return { secureCopy, isCopying, error, copiedId }
}
