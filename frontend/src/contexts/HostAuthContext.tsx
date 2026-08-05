import { useState, type ReactNode } from 'react'
import { HostAuthContext, HOST_AUTH_KEY, readStoredHost } from './hostAuth'

export function HostAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ email: string } | null>(readStoredHost)

  const login = (email: string) => {
    const payload = { email }
    localStorage.setItem(HOST_AUTH_KEY, JSON.stringify(payload))
    setState(payload)
  }

  const logout = () => {
    localStorage.removeItem(HOST_AUTH_KEY)
    setState(null)
  }

  return (
    <HostAuthContext.Provider
      value={{ isAuthenticated: state !== null, hostEmail: state?.email ?? null, login, logout }}
    >
      {children}
    </HostAuthContext.Provider>
  )
}
