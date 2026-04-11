import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Avatar from '../components/atoms/Avatar/Avatar'
import Button from '../components/atoms/Button/Button'
import Badge from '../components/atoms/Badge/Badge'
import Loader from '../components/atoms/Loader/Loader'
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

  const [tasteProfile, setTasteProfile] = useState(null)
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()

  // Editable fields
  const [editName, setEditName] = useState(display_name)
  const [editBio, setEditBio] = useState(meta.bio || '')
  const [editAvatar, setEditAvatar] = useState(meta.avatar_url || '')
  const [editAge, setEditAge] = useState(meta.age || '')
  const [editGender, setEditGender] = useState(meta.gender || '')
  const [editFit, setEditFit] = useState(meta.fit_preference || '')
  const fileInputRef = useRef(null)

  function handleAvatarUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const size = 200
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        // Crop to square center
        const min = Math.min(img.width, img.height)
        const sx = (img.width - min) / 2
        const sy = (img.height - min) / 2
        ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setEditAvatar(dataUrl)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

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
          display_name: editName,
          bio: editBio,
          avatar_url: editAvatar,
          age: parseInt(editAge) || null,
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
  const interactionCount = tasteProfile?.interaction_count || 0
  
  // Real social stats from the backend
  const followers = tasteProfile?.followers_count || 0
  const following = tasteProfile?.following_count || 0

  return (
    <div className="profile-page">
      {/* Header */}
      <motion.div
        className="profile-page__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar src={meta.avatar_url} name={display_name} size="lg" />
        <h1 className="profile-page__name">{display_name}</h1>
        {meta.bio && (
          <p className="profile-page__bio" style={{ fontSize: 'var(--text-md)', margin: '4px 0 12px 0', maxWidth: '400px' }}>
            {meta.bio}
          </p>
        )}
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
          <Loader size={80} />
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
          <Loader size={80} />
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
                <span>Display Name</span>
                <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="auth-form__input" style={{ width: '100%', padding: '6px 10px', fontSize: '13px' }} />
              </div>
              <div className="profile-page__setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <span>Bio</span>
                <textarea value={editBio} onChange={e => setEditBio(e.target.value)} className="auth-form__input" style={{ width: '100%', padding: '6px 10px', fontSize: '13px', minHeight: '60px', resize: 'vertical' }} />
              </div>
              <div className="profile-page__setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                <span>Profile Picture</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {editAvatar && (
                    <img src={editAvatar} alt="Preview" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="auth-form__input"
                    style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', background: 'var(--color-bg-subtle)', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-md)' }}
                  >
                    {editAvatar ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
              
              <div className="profile-page__setting-item" style={{ marginTop: '12px' }}>
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
