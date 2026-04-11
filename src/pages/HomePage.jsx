import { useState, useEffect, useCallback, useRef } from 'react'
import Masonry from 'react-masonry-css'
import TrendingBar from '../components/organisms/TrendingBar/TrendingBar'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Loader from '../components/atoms/Loader/Loader'
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
  const [likedItems, setLikedItems] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)
  const sentinelRef = useRef(null)

  const breakpointColumnsObj = {
    default: 5,
    1024: 4,
    768: 3,
    480: 2
  };

  const fetchFeed = useCallback(async (aesthetic, pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true)
    else setLoadingMore(true)

    try {
      const response = await discoveryApi.getFeed({ aesthetic, limit: 10, page: pageNum })
      if (response.items && response.items.length > 0) {
        if (append) {
          setItems(prev => [...prev, ...response.items])
        } else {
          setItems(response.items)
        }
        setHasMore(response.has_more)
      } else if (!append) {
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
      if (append) {
        const moreMocks = Array.from({ length: 10 }).map((_, i) => ({
          ...MOCK_ITEMS[i % MOCK_ITEMS.length],
          id: `mock-p${pageNum}-${i}`,
          title: `Sample: ${aesthetic || 'Discovery'} — Item ${items.length + i + 1}`
        }))
        setItems(prev => [...prev, ...moreMocks])
      } else {
        const filtered = aesthetic
          ? MOCK_ITEMS.filter(item => item.aesthetic_tags?.includes(aesthetic))
          : MOCK_ITEMS
        setItems(filtered)
      }
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
