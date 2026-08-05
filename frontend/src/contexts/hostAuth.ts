import { createContext, useContext } from 'react'

export const HOST_AUTH_KEY = 'funcbook_host_auth'

export interface HostAuthContextValue {
  isAuthenticated: boolean
  hostEmail: string | null
  login: (email: string) => void
  logout: () => void
}

export const HostAuthContext = createContext<HostAuthContextValue | null>(null)

export function readStoredHost(): { email: string } | null {
  try {
    const raw = localStorage.getItem(HOST_AUTH_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed.email === 'string' ? parsed : null
  } catch {
    return null
  }
}

export function useHostAuth() {
  const ctx = useContext(HostAuthContext)
  if (!ctx) throw new Error('useHostAuth must be used within a HostAuthProvider')
  return ctx
}
