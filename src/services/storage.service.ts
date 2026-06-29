export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      throw new Error('Almacenamiento local lleno. Elimina algunos favoritos para liberar espacio.', { cause: e })
    }
    throw e
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // silent
  }
}

export function clear(): void {
  try {
    localStorage.clear()
  } catch {
    // silent
  }
}

export function getUsage(): { used: number; quota: number; percent: number } {
  let used = 0
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      const value = localStorage.getItem(key)
      if (value) used += key.length + value.length
    }
  }
  const quota = 5 * 1024 * 1024
  return { used, quota, percent: Math.round((used / quota) * 100) }
}
