import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Provide utility functions
  const value = {
    user,
    loading,
    async signInWithEmail(email, password) {
      return supabase.auth.signInWithPassword({ email, password })
    },
    async signUpWithEmail(email, password, metadata = {}) {
      return supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata
        }
      })
    },
    async signInWithGoogle() {
      return supabase.auth.signInWithOAuth({ provider: 'google' })
    },
    async signOut() {
      return supabase.auth.signOut()
    }
  }

  // Don't render children until we know the auth state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
