import { useState } from "react"
import type { FavoriteEntry } from "@/features/favorites/types"

interface FavoritesPanelProps {
  favorites: FavoriteEntry[]
  onRemove: (id: string) => void
  compact?: boolean
}

export function FavoritesPanel({
  favorites,
  onRemove,
  compact,
}: FavoritesPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  async function handleCopy(id: string, ciphertext: string) {
    try {
      await navigator.clipboard.writeText(ciphertext)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // silent
    }
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
        {favorites.slice(0, compact ? 3 : undefined).map((fav) => (
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
            <span style={{ fontSize: "0.7rem", flexShrink: 0, opacity: 0.6 }}>🔒</span>

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

            <span style={{ fontSize: "0.6rem", color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }}>
              {fav.metadata.bits}b
            </span>

            <button
              type="button"
              onClick={() => handleCopy(fav.id, fav.encrypted.ciphertext)}
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
    </div>
  )
}
