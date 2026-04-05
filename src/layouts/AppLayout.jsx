import { useState, useEffect } from 'react'
import { Outlet, useLocation, Link, Navigate, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import Avatar from '../components/atoms/Avatar/Avatar'
import { HomeIcon, SearchIcon, SparkleIcon, UserIcon, GridIcon } from '../components/icons/Icons'
import './AppLayout.css'

const NAV_ITEMS = [
  { path: '/', icon: <HomeIcon />, label: 'Home' },
  { path: '/search', icon: <SearchIcon />, label: 'Search' },
  { path: '/chat', icon: <SparkleIcon />, label: 'Stylist' },
  { path: '/boards', icon: <GridIcon />, label: 'Boards' },
  { path: '/profile', icon: <UserIcon />, label: 'Profile' },
]

export default function AppLayout() {
  const location = useLocation()
  const { user, loading } = useAuth()

  if (loading) return null // loading spinner could go here

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Use username or standard Mock Name if no onboarding profile is fetched yet
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User"

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="top-nav__inner">
          <NavLink to="/" className="top-nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SparkleIcon />
            <span className="top-nav__logo-text gradient-text">FitMatch</span>
          </NavLink>
          <nav className="top-nav__links">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="top-nav__right">
            <NavLink to="/profile">
              <Avatar name={displayName} size="sm" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="app-layout__main">
        <Outlet />
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
            }
            end={item.path === '/'}
          >
            {({ isActive }) => (
              <motion.div
                className="bottom-nav__icon"
                whileTap={{ scale: 0.8 }}
                animate={{
                  y: isActive ? -4 : 0,
                  color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-tertiary)'
                }}
              >
                {item.icon}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
