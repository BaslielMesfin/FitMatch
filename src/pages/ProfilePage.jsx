import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Avatar from '../components/atoms/Avatar/Avatar'
import Button from '../components/atoms/Button/Button'
import Badge from '../components/atoms/Badge/Badge'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import { discoveryApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const display_name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'
  const username = `@${display_name.toLowerCase().replace(' ', '')}`
  const stats = { followers: 1240, following: 180 }
  
  const [tasteProfile, setTasteProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTasteProfile() {
      try {
        const data = await discoveryApi.getTasteProfile()
        setTasteProfile(data)
      } catch (err) {
        console.warn('Failed to load taste profile:', err.message)
      } finally {
        setLoading(false)
      }
    }
    loadTasteProfile()
  }, [])

  // Top aesthetics fallback if API fails
  const topAesthetics = tasteProfile?.top_aesthetics || [
    { name: 'Quiet Luxury', score: 0.85 },
    { name: 'Minimalist', score: 0.78 },
    { name: 'Dark Academia', score: 0.62 },
    { name: 'Streetwear', score: 0.35 }
  ]

  const preferredBrands = tasteProfile?.preferred_brands?.length > 0
    ? tasteProfile.preferred_brands.join(', ')
    : 'Zara, ASOS, SSENSE'

  return (
    <div className="profile-page">
      <motion.div
        className="profile-page__hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar name={display_name} size="xl" />
        <h1 className="profile-page__name">{display_name}</h1>
        <p className="profile-page__username">@{username}</p>

        <div className="profile-page__stats">
          <div className="profile-page__stat">
            <span className="profile-page__stat-number">{stats.boards}</span>
            <span className="profile-page__stat-label">Boards</span>
          </div>
          <div className="profile-page__stat">
            <span className="profile-page__stat-number">{tasteProfile?.interaction_count || stats.likes}</span>
            <span className="profile-page__stat-label">Likes</span>
          </div>
          <div className="profile-page__stat">
            <span className="profile-page__stat-number">{stats.following}</span>
            <span className="profile-page__stat-label">Following</span>
          </div>
          <div className="profile-page__stat">
            <span className="profile-page__stat-number">{stats.followers}</span>
            <span className="profile-page__stat-label">Followers</span>
          </div>
        </div>

        <Button variant="secondary" size="sm">Edit Profile</Button>
      </motion.div>

      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="profile-page__section-title">Your Style DNA</h2>
        <p className="profile-page__section-desc">
          Based on your likes and searches, AI has identified your core aesthetic.
        </p>
        <div className="profile-page__taste-tags">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="80px" height="28px" style={{ borderRadius: 'var(--radius-full)' }} />
            ))
          ) : (
            topAesthetics.filter(a => a.score > 0).map((tag) => (
              <Badge key={tag.name} label={tag.name} variant="active" />
            ))
          )}
          {!loading && topAesthetics.filter(a => a.score > 0).length === 0 && (
             <span className="text-secondary">Like some items to build your DNA</span>
          )}
        </div>
      </motion.div>

      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="profile-page__section-title">Taste Profile</h2>
        <div className="profile-page__taste-bars">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
                <Skeleton width="100%" height="24px" />
              </div>
            ))
          ) : (
            topAesthetics.map((item) => {
              // Convert decimal score to percentage, max 100
              const percent = Math.min(Math.round(item.score * 100), 100)
              
              return (
                <div key={item.name} className="taste-bar">
                  <div className="taste-bar__header">
                    <span className="taste-bar__label">{item.name}</span>
                    <span className="taste-bar__value">{percent}%</span>
                  </div>
                  <div className="taste-bar__track">
                    <motion.div
                      className="taste-bar__fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </motion.div>

      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="profile-page__section-title">Settings & Info</h2>
        <div className="profile-page__settings">
          <div className="profile-page__setting-item">
            <span>Age / Gender</span>
            <span className="profile-page__setting-value">
              {user?.user_metadata?.age || '?'} / {user?.user_metadata?.gender || 'Not specified'}
            </span>
          </div>
          <div className="profile-page__setting-item">
            <span>Fit Preference</span>
            <span className="profile-page__setting-value">{user?.user_metadata?.fit_preference || 'Not specified'}</span>
          </div>
          <div className="profile-page__setting-item">
            <span>Preferred Brands</span>
            <span className="profile-page__setting-value">
              {user?.user_metadata?.preferred_brands?.join(', ') || 'Global Defaults'}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <Button variant="secondary" onClick={signOut}>Log Out</Button>
        </div>
      </motion.div>
    </div>
  )
}
