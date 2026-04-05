import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/atoms/Button/Button'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    // Attempt signup
    const { data, error } = await signUpWithEmail(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // If successful, push to onboarding. (Supabase auto logins after signup usually)
      navigate('/onboarding')
    }
  }

  async function handleGoogleSignUp() {
    setLoading(true)
    setError(null)
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Join FitMatch</h2>
      {error && <div className="auth-error">{error}</div>}
      
      <form className="auth-form" onSubmit={handleSignUp}>
        <input
          type="email"
          className="auth-form__input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-form__input"
          placeholder="Create password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Button variant="primary" size="lg" fullWidth disabled={loading}>
          {loading ? 'Signing up...' : 'Create Account'}
        </Button>
      </form>

      <div className="auth-divider">OR</div>

      <Button variant="secondary" size="lg" fullWidth onClick={handleGoogleSignUp} disabled={loading}>
        Continue with Google
      </Button>

      <div className="auth-link">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  )
}
