import type { StrengthLevel } from "@/features/generator/types"

export interface EncryptedPayload {
  ciphertext: string
  iv: string
  salt: string
}

export interface FavoriteMetadata {
  bits: number
  strength: StrengthLevel
  wordCount: number
  createdAt: number
  updatedAt: number
  label?: string
}

export interface FavoriteEntry {
  id: string
  encrypted: EncryptedPayload
  metadata: FavoriteMetadata
}

export interface FavoriteState {
  favorites: FavoriteEntry[]
  unlocked: boolean
}

export interface FavoritesStore extends FavoriteState {
  addFavorite: (
    password: string,
    passphrase: string,
    metadata: FavoriteMetadata,
  ) => Promise<void>
  removeFavorite: (id: string) => void
  copyToClipboard: (id: string, passphrase: string) => Promise<string | null>
  getAllFavorites: () => FavoriteEntry[]
  reorderFavorites: (ids: string[]) => void
}
