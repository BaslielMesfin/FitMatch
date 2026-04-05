import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './AuthLayout.css'

export default function AuthLayout() {
  const { user, loading } = useAuth()

  // If already logged in, redirect to app
  if (!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <div className="auth-layout__logo">
          ✨ FitMatch
        </div>
        <Outlet />
      </div>
    </div>
  )
}
