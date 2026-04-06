import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../../components/atoms/Button/Button'
import { EyeIcon, EyeOffIcon, GoogleIcon } from '../../components/icons/Icons'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { data, error } = await signUpWithEmail(email, password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else if (data && data.session === null) {
      setError('Confirmation email sent! Please check your inbox and verify your email before logging in.')
      setLoading(false)
    } else {
      navigate('/onboarding')
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
        <div className="auth-form__password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className="auth-form__input"
            placeholder="Create password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="button" className="auth-form__eye-btn" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <Button variant="primary" size="lg" fullWidth disabled={loading} type="submit">
          {loading ? 'Signing up...' : 'Create Account'}
        </Button>
      </form>

      <div className="auth-divider">or</div>

      <Button variant="secondary" size="lg" fullWidth onClick={signInWithGoogle} icon={<GoogleIcon />}>
        Sign up with Google
      </Button>

      <div className="auth-link">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  )
}
