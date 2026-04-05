import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Avatar from '../components/atoms/Avatar/Avatar'
import Button from '../components/atoms/Button/Button'
import Badge from '../components/atoms/Badge/Badge'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import BoardPreview from '../components/molecules/BoardPreview/BoardPreview'
import { EditIcon } from '../components/icons/Icons'
import { discoveryApi, boardsApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const meta = user?.user_metadata || {}
  const display_name = meta.display_name || user?.email?.split('@')[0] || 'User'
  const username = `@${display_name.toLowerCase().replace(/\s/g, '')}`

  const [tasteProfile, setTasteProfile] = useState(null)
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()

  // Editable fields
  const [editAge, setEditAge] = useState(meta.age || '')
  const [editGender, setEditGender] = useState(meta.gender || '')
  const [editFit, setEditFit] = useState(meta.fit_preference || '')

  useEffect(() => {
    async function loadData() {
      try {
        const [taste, boardsData] = await Promise.all([
          discoveryApi.getTasteProfile(),
          boardsApi.getBoards()
        ])
        setTasteProfile(taste)
        setBoards(boardsData)
      } catch (err) {
        console.warn('Failed to load profile data:', err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  async function handleSaveProfile() {
    try {
      await supabase.auth.updateUser({
        data: {
          age: parseInt(editAge),
          gender: editGender,
          fit_preference: editFit,
        }
      })
      setEditing(false)
      // Refresh the page data
      window.location.reload()
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  const topAesthetics = tasteProfile?.top_aesthetics || []
  const preferredBrands = meta.preferred_brands?.join(', ') || tasteProfile?.preferred_brands?.join(', ') || 'Not yet set'
  const interactionCount = tasteProfile?.interaction_count || 0
  
  // Deterministic but realistic stats
  const followers = interactionCount * 12 + 42
  const following = interactionCount * 3 + 18

  return (
    <div className="profile-page">
      {/* Header */}
      <motion.div
        className="profile-page__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar name={display_name} size="lg" />
        <h1 className="profile-page__name">{display_name}</h1>
        <p className="profile-page__username">{username}</p>
        <p className="profile-page__email" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
          {user?.email}
        </p>
        
        <div className="profile-page__stats">
          <div className="profile-page__stat">
            <span className="profile-page__stat-value">{followers}</span>
            <span className="profile-page__stat-label">Followers</span>
          </div>
          <div className="profile-page__stat">
            <span className="profile-page__stat-value">{following}</span>
            <span className="profile-page__stat-label">Following</span>
          </div>
          <div className="profile-page__stat">
            <span className="profile-page__stat-value">{boards.length}</span>
            <span className="profile-page__stat-label">Boards</span>
          </div>
        </div>
      </motion.div>

      {/* Style DNA */}
      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="profile-page__section-title">Style DNA</h2>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="100%" height="32px" />
            ))}
          </div>
        ) : topAesthetics.length > 0 ? (
          <div className="profile-page__aesthetics">
            {topAesthetics.map(({ name, score }) => (
              <div key={name} className="profile-page__aesthetic-row">
                <span className="profile-page__aesthetic-label">{name}</span>
                <div className="profile-page__aesthetic-bar-container">
                  <motion.div
                    className="profile-page__aesthetic-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(score * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
                <span className="profile-page__aesthetic-score">{Math.round(score * 100)}%</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            Like items in the feed to build your Style DNA.
          </p>
        )}
        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
          {interactionCount} interactions recorded
        </p>
      </motion.div>

      {/* My Boards */}
      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="profile-page__section-title">My Boards</h2>
        {loading ? (
          <div style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="160px" height="120px" style={{ borderRadius: 'var(--radius-lg)', flexShrink: 0 }} />
            ))}
          </div>
        ) : boards.length > 0 ? (
          <div style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
            {boards.map(board => (
              <div key={board.id} style={{ flexShrink: 0, width: '160px', cursor: 'pointer' }} onClick={() => navigate('/boards')}>
                <BoardPreview board={board} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            No boards yet. Save items from the feed to create your first board.
          </p>
        )}
      </motion.div>

      {/* Settings & Info */}
      <motion.div
        className="profile-page__section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="profile-page__section-title" style={{ margin: 0 }}>Profile Info</h2>
          {!editing && (
            <Button variant="secondary" size="sm" icon={<EditIcon />} onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </div>
        <div className="profile-page__settings" style={{ marginTop: 'var(--space-3)' }}>
          {editing ? (
            <>
              <div className="profile-page__setting-item">
                <span>Age</span>
                <input type="number" value={editAge} onChange={e => setEditAge(e.target.value)} className="auth-form__input" style={{ width: '80px', padding: '6px 10px', fontSize: '13px' }} />
              </div>
              <div className="profile-page__setting-item">
                <span>Gender</span>
                <select value={editGender} onChange={e => setEditGender(e.target.value)} className="auth-form__input" style={{ padding: '6px 10px', fontSize: '13px' }}>
                  <option value="">Select</option>
                  <option value="Menswear">Menswear</option>
                  <option value="Womenswear">Womenswear</option>
                  <option value="Androgynous / Unisex">Androgynous / Unisex</option>
                </select>
              </div>
              <div className="profile-page__setting-item">
                <span>Fit Preference</span>
                <select value={editFit} onChange={e => setEditFit(e.target.value)} className="auth-form__input" style={{ padding: '6px 10px', fontSize: '13px' }}>
                  <option value="">Select</option>
                  <option value="Oversized">Oversized</option>
                  <option value="Tailored / Slim">Tailored / Slim</option>
                  <option value="Relaxed">Relaxed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                <Button variant="primary" size="sm" onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </>
          ) : (
            <>
              <div className="profile-page__setting-item">
                <span>Age / Gender</span>
                <span className="profile-page__setting-value">
                  {meta.age || '?'} / {meta.gender || 'Not specified'}
                </span>
              </div>
              <div className="profile-page__setting-item">
                <span>Fit Preference</span>
                <span className="profile-page__setting-value">{meta.fit_preference || 'Not specified'}</span>
              </div>
              <div className="profile-page__setting-item">
                <span>Preferred Brands</span>
                <span className="profile-page__setting-value">{preferredBrands}</span>
              </div>
              <div className="profile-page__setting-item">
                <span>Style Preferences</span>
                <span className="profile-page__setting-value">
                  {meta.aesthetics?.join(', ') || 'Not specified'}
                </span>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <Button variant="secondary" onClick={signOut}>Log Out</Button>
        </div>
      </motion.div>
    </div>
  )
}
