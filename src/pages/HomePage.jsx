import { useState, useEffect, useCallback, useRef } from 'react'
import TrendingBar from '../components/organisms/TrendingBar/TrendingBar'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import { MOCK_ITEMS } from '../data/mockData'
import { discoveryApi } from '../services/api'
import './HomePage.css'

const ROTATION_QUERIES = [
  'trendy fashion clothing',
  'designer outfits style',
  'casual streetwear looks',
  'luxury fashion accessories',
  'modern wardrobe essentials',
]

export default function HomePage() {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const fetchFeed = useCallback(async (aesthetic, pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true)
    else setLoadingMore(true)

    try {
      const response = await discoveryApi.getFeed({ aesthetic, limit: 20, page: pageNum })
      if (response.items && response.items.length > 0) {
        if (append) {
          setItems(prev => [...prev, ...response.items])
        } else {
          setItems(response.items)
        }
        setHasMore(response.has_more)
      } else if (!append) {
        // Fallback to mock
        const filtered = aesthetic
          ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(aesthetic))
          : MOCK_ITEMS
        setItems(filtered)
        setHasMore(false)
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.warn('API unavailable, using mock data:', err.message)
      if (!append) {
        const filtered = aesthetic
          ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(aesthetic))
          : MOCK_ITEMS
        setItems(filtered)
      }
      setHasMore(false)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Initial load & tag change
  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchFeed(activeTag, 1, false)
  }, [activeTag, fetchFeed])

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchFeed(activeTag, nextPage, true)
        }
      },
      { rootMargin: '400px' }
    )

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current)
    }

    return () => observerRef.current?.disconnect()
  }, [hasMore, loadingMore, loading, page, activeTag, fetchFeed])

  async function handleLike(itemId, liked) {
    try {
      await discoveryApi.likeItem(itemId, liked)
    } catch {
      // Silent
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
        <>
          <DiscoveryFeed
            items={items}
            onItemClick={setSelectedItem}
            onLike={handleLike}
            onSave={(itemId) => setSelectedItem(items.find(i => i.id === itemId))}
          />
          {/* Sentinel for infinite scroll */}
          {hasMore && (
            <div ref={sentinelRef} style={{ height: '1px' }} />
          )}
          {loadingMore && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-6)' }}>
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </>
      )}

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
