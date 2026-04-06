import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/atoms/Button/Button'
import { EyeIcon, EyeOffIcon, GoogleIcon } from '../../components/icons/Icons'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        <div className="auth-form__password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className="auth-form__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="auth-form__eye-btn" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={loading} type="submit">
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <div className="auth-divider">or</div>

      <Button variant="secondary" size="lg" fullWidth onClick={signInWithGoogle} icon={<GoogleIcon />}>
        Continue with Google
      </Button>

      <div className="auth-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}
