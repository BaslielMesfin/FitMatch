import { useState, useEffect, useCallback } from 'react'
import TrendingBar from '../components/organisms/TrendingBar/TrendingBar'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import { MOCK_ITEMS } from '../data/mockData'
import { discoveryApi } from '../services/api'
import './HomePage.css'

export default function HomePage() {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState(MOCK_ITEMS) // Start with mock data
  const [loading, setLoading] = useState(false)
  const [useApi, setUseApi] = useState(true) // Toggle for API vs mock

  const fetchFeed = useCallback(async (aesthetic) => {
    setLoading(true)
    try {
      const response = await discoveryApi.getFeed({ aesthetic, limit: 20 })
      if (response.items && response.items.length > 0) {
        setItems(response.items)
      } else {
        // If API returns empty, fall back to mock data filtered by tag
        const filtered = aesthetic
          ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(aesthetic))
          : MOCK_ITEMS
        setItems(filtered)
      }
    } catch (err) {
      console.warn('API unavailable, using mock data:', err.message)
      // Graceful fallback to mock data
      const filtered = aesthetic
        ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(aesthetic))
        : MOCK_ITEMS
      setItems(filtered)
      setUseApi(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (useApi) {
      fetchFeed(activeTag)
    } else {
      // Use client-side filtering on mock data
      const filtered = activeTag
        ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(activeTag))
        : MOCK_ITEMS
      setItems(filtered)
    }
  }, [activeTag, useApi, fetchFeed])

  async function handleLike(itemId, liked) {
    try {
      await discoveryApi.likeItem(itemId, liked)
    } catch {
      // Silent fail — taste profile is a nice-to-have
    }
  }

  return (
    <div className="home-page">
      <TrendingBar activeTag={activeTag} onTagClick={setActiveTag} />

      {loading ? (
        <div className="home-page__loading">
          <div className="masonry-grid" style={{ padding: '0 var(--space-4)' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height={`${200 + Math.random() * 150}px`}
                style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}
              />
            ))}
          </div>
        </div>
      ) : (
        <DiscoveryFeed
          items={items}
          onItemClick={setSelectedItem}
          onLike={handleLike}
        />
      )}

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
