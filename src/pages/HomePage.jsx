import { useState, useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import TrendingBar from '../components/organisms/TrendingBar/TrendingBar'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import Loader from '../components/atoms/Loader/Loader'
import { discoveryApi } from '../services/api'
import './HomePage.css'

export default function HomePage() {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [likedItems, setLikedItems] = useState(new Set())
  const sentinelRef = useRef(null)

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['feed', activeTag],
    queryFn: async ({ pageParam = 1 }) => {
      return discoveryApi.getFeed({ aesthetic: activeTag, limit: 10, page: pageParam })
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.has_more ? allPages.length + 1 : undefined
    },
    initialPageParam: 1,
  })

  // Flatten all pages into a single items array
  const items = data?.pages.flatMap(page => page.items || []) ?? []

  // Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { rootMargin: '600px' }
    )

    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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

      {isLoading ? (
        <Loader fullPage />
      ) : isError ? (
        <div className="home-page__error" style={{ textAlign: 'center', padding: '64px', color: 'var(--color-text-tertiary)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-medium)', marginBottom: '8px' }}>Whoops!</h2>
          <p>{error?.message || 'Lost connection to the styling engine.'}</p>
          <button 
            style={{ marginTop: '16px', padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', border: 'none', cursor: 'pointer' }}
            onClick={() => refetch()}
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
          {hasNextPage && (
            <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />
          )}
          {isFetchingNextPage && (
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
