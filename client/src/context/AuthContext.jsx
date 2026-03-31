import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

/**
 * Auth provider — manages user session state.
 * Uses localStorage for persistence.
 *
 * Provides: { user, token, isAuthenticated, login, logout }
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('rm_token')
      const storedUser = localStorage.getItem('rm_user')
      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch {
      // Corrupted data — clear it
      localStorage.removeItem('rm_token')
      localStorage.removeItem('rm_user')
    }
  }, [])

  const login = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('rm_token', authToken)
    localStorage.setItem('rm_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('rm_token')
    localStorage.removeItem('rm_user')
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
