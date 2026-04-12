import { useState, useEffect, useCallback, useRef } from 'react'
import Masonry from 'react-masonry-css'
import TrendingBar from '../components/organisms/TrendingBar/TrendingBar'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Loader from '../components/atoms/Loader/Loader'
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
  const [likedItems, setLikedItems] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const [error, setError] = useState(null)

  const fetchFeed = useCallback(async (aesthetic, pageNum = 1, append = false) => {
    if (pageNum === 1) {
      setLoading(true)
      setError(null)
    } else {
      setLoadingMore(true)
    }

    try {
      const response = await discoveryApi.getFeed({ aesthetic, limit: 10, page: pageNum })
      if (response.items && response.items.length > 0) {
        if (append) {
          setItems(prev => [...prev, ...response.items])
        } else {
          setItems(response.items)
        }
        setHasMore(response.has_more)
      } else {
        if (!append) setItems([])
        setHasMore(false)
      }
    } catch (err) {
      console.error('API Error:', err.message)
      if (!append) {
        setError('Lost connection to the styling engine. Please check your network and try again.')
        setItems([])
      }
      setHasMore(false)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    setHasMore(true)
    fetchFeed(activeTag, 1, false)
  }, [activeTag, fetchFeed])

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
      { rootMargin: '600px' }
    )
    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current)
    return () => observerRef.current?.disconnect()
  }, [hasMore, loadingMore, loading, page, activeTag, fetchFeed])

  async function handleLike(itemId, liked, itemObj) {
    setLikedItems(prev => {
      const next = new Set(prev)
      if (liked) next.add(itemId)
      else next.delete(itemId)
      return next
    })
    try {
      await discoveryApi.likeItem(itemId, liked, itemObj)
    } catch { }
  }

  return (
    <div className="home-page">
      <TrendingBar activeTag={activeTag} onTagClick={setActiveTag} />

      {loading ? (
        <Loader fullPage />
      ) : error ? (
        <div className="home-page__error" style={{ textAlign: 'center', padding: '64px', color: 'var(--color-text-tertiary)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-medium)', marginBottom: '8px' }}>Whoops!</h2>
          <p>{error}</p>
          <button 
            style={{ marginTop: '16px', padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', border: 'none', cursor: 'pointer' }}
            onClick={() => fetchFeed(activeTag, 1, false)}
          >
            Retry Connection
          </button>
        </div>
      ) : (
        <>
          <DiscoveryFeed
            items={items}
            likedItems={likedItems}
            onItemClick={setSelectedItem}
            onLike={handleLike}
            onSave={(itemId) => setSelectedItem(items.find(i => i.id === itemId))}
          />
          {/* Sentinel for infinite scroll */}
          {hasMore && (
            <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />
          )}
          {loadingMore && (
            <Loader size={60} />
          )}
        </>
      )}

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        isLiked={selectedItem ? likedItems.has(selectedItem.id) : false}
        onLikeToggle={(liked) => handleLike(selectedItem.id, liked, selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
