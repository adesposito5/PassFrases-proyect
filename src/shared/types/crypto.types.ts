export interface EncryptedPayload {
  ciphertext: string
  iv: string
  salt: string
}

export interface CryptoConfig {
  iterations: number
  hash: 'SHA-256' | 'SHA-512'
  keyLength: number
}

export const DEFAULT_CRYPTO_CONFIG: CryptoConfig = {
  iterations: 600000,
  hash: 'SHA-256',
  keyLength: 256,
}
