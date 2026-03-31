import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

/**
 * Convenience hook for accessing auth context.
 *
 * Usage: const { user, token, isAuthenticated, login, logout } = useAuth()
 */
export default function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
