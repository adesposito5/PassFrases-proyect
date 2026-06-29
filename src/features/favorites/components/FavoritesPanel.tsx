import { useState } from "react"
import type { FavoriteEntry } from "@/features/favorites/types"
import { useSecureCopy } from "@/features/favorites/hooks/useSecureCopy"

interface FavoritesPanelProps {
  favorites: FavoriteEntry[]
  onRemove: (id: string) => void
  onCopy: (id: string) => void
  compact?: boolean
}

export function FavoritesPanel({
  favorites,
  onRemove,
  compact,
}: FavoritesPanelProps) {
  const { secureCopy, isCopying, copiedId } = useSecureCopy()
  const [passphraseInput, setPassphraseInput] = useState<string>("")
  const [activeId, setActiveId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const displayFavorites = compact ? favorites.slice(0, 3) : favorites

  async function handleCopy(id: string) {
    if (!passphraseInput) {
      setActiveId(id)
      return
    }
    setError(null)
    const ok = await secureCopy(id, passphraseInput)
    if (!ok) {
      setError("Passphrase incorrecta. Intenta de nuevo.")
    }
    setPassphraseInput("")
    setActiveId(null)
  }

  if (favorites.length === 0) return null

  return (
    <div
      style={{
        borderTop: compact ? "1px solid rgba(99,102,241,0.12)" : undefined,
        marginTop: compact ? "0.75rem" : undefined,
        paddingTop: compact ? "0.75rem" : undefined,
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--color-text-tertiary)",
          margin: "0 0 0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        ⭐ Tus favoritas ({favorites.length})
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {displayFavorites.map((fav) => (
          <div
            key={fav.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.4rem",
              borderRadius: "8px",
              background: "rgba(99,102,241,0.04)",
              fontSize: "0.75rem",
            }}
          >
            <span
              style={{
                flex: 1,
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {fav.metadata.label ?? `Passphrase (${fav.metadata.bits} bits)`}
            </span>

            {activeId === fav.id && (
              <input
                type="password"
                placeholder="Ingresa tu passphrase..."
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCopy(fav.id)
                }}
                style={{
                  all: "unset",
                  width: "100px",
                  fontSize: "0.7rem",
                  padding: "0.15rem 0.35rem",
                  borderRadius: "4px",
                  border: "1px solid var(--color-border-focus)",
                  background: "rgba(0,0,0,0.2)",
                  color: "var(--color-text)",
                  fontFamily: "var(--font-mono)",
                }}
                autoFocus
              />
            )}

            <span style={{ fontSize: "0.6rem", color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }}>
              {fav.metadata.bits}b
            </span>

            <button
              type="button"
              onClick={() => {
                if (compact) setActiveId(fav.id)
                else handleCopy(fav.id)
              }}
              disabled={isCopying}
              aria-label="Copiar favorita"
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: "0.75rem",
                color:
                  copiedId === fav.id
                    ? "var(--color-success)"
                    : "var(--color-text-tertiary)",
                padding: "0.15rem 0.3rem",
                borderRadius: "4px",
                transition: "color var(--duration-fast) var(--ease-out)",
              }}
            >
              {copiedId === fav.id ? "✅" : "📋"}
            </button>

            <button
              type="button"
              onClick={() => onRemove(fav.id)}
              aria-label="Eliminar favorita"
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: "0.7rem",
                color: "var(--color-text-tertiary)",
                padding: "0.15rem 0.3rem",
                borderRadius: "4px",
                transition: "color var(--duration-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-error)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-tertiary)"
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {error && (
        <p style={{ fontSize: "0.65rem", color: "var(--color-error)", margin: "0.25rem 0 0" }}>
          {error}
        </p>
      )}
    </div>
  )
}
