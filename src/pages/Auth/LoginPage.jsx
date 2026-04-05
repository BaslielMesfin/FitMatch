import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/atoms/Button/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signInWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await signInWithEmail(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  async function handleGoogleLogin() {
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
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Welcome Back</h2>
      {error && <div className="auth-error">{error}</div>}
      
      <form className="auth-form" onSubmit={handleLogin}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="primary" size="lg" fullWidth disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <div className="auth-divider">OR</div>

      <Button variant="secondary" size="lg" fullWidth onClick={handleGoogleLogin} disabled={loading}>
        Continue with Google
      </Button>

      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}
