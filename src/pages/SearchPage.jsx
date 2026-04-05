import { useState, useMemo, useCallback } from 'react'
import SearchBar from '../components/molecules/SearchBar/SearchBar'
import Badge from '../components/atoms/Badge/Badge'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import { MOCK_ITEMS, BRANDS } from '../data/mockData'
import { searchApi, discoveryApi } from '../services/api'
import './SearchPage.css'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeBrand, setActiveBrand] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)

  // If no search has been done, show mock items filtered by brand
  const localFiltered = useMemo(() => {
    let items = MOCK_ITEMS
    if (activeBrand) {
      items = items.filter(item => item.brand === activeBrand)
    }
    return items
  }, [activeBrand])

  const handleSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery)
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      const brands = activeBrand ? [activeBrand] : undefined
      const response = await searchApi.search(searchQuery, { brands })
      if (response.items && response.items.length > 0) {
        setSearchResults(response.items)
      } else {
        // Fallback to local filter
        const q = searchQuery.toLowerCase()
        const filtered = MOCK_ITEMS.filter(item =>
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.aesthetic_tags?.some(tag => tag.toLowerCase().includes(q))
        )
        setSearchResults(filtered)
      }
    } catch (err) {
      console.warn('Search API unavailable, filtering locally:', err.message)
      const q = searchQuery.toLowerCase()
      const filtered = MOCK_ITEMS.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.aesthetic_tags?.some(tag => tag.toLowerCase().includes(q))
      )
      setSearchResults(filtered)
    } finally {
      setLoading(false)
    }
  }, [activeBrand])

  const handleLike = useCallback(async (itemId, liked) => {
    try {
      await discoveryApi.likeItem(itemId, liked)
    } catch {
      // Silent
    }
  }, [])

  const displayItems = searchResults !== null ? searchResults : localFiltered

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Discover</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="search-page__brands">
          <Badge
            label="All Brands"
            variant={!activeBrand ? 'active' : 'default'}
            onClick={() => setActiveBrand(null)}
          />
          {BRANDS.map((brand) => (
            <Badge
              key={brand}
              label={brand}
              variant={activeBrand === brand ? 'active' : 'default'}
              onClick={() => setActiveBrand(brand)}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="search-page__loading">
          <div className="masonry-grid" style={{ padding: '0 var(--space-4)', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height={`${200 + Math.random() * 150}px`}
                style={{ borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}
              />
            ))}
          </div>
        </div>
      ) : displayItems.length > 0 ? (
        <DiscoveryFeed
          items={displayItems}
          onItemClick={setSelectedItem}
          onLike={handleLike}
          onSave={(itemId) => setSelectedItem(displayItems.find(i => i.id === itemId))}
        />
      ) : (
        <div className="search-page__empty">
          <p className="search-page__empty-icon">No Results</p>
          <h3>No matches found</h3>
          <p>Try a different search or browse all items</p>
        </div>
      )}

      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  )
}
