import { useState, useCallback } from 'react'
import SearchBar from '../components/molecules/SearchBar/SearchBar'
import Skeleton from '../components/atoms/Skeleton/Skeleton'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import { searchApi, discoveryApi } from '../services/api'
import './SearchPage.css'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery)
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      const response = await searchApi.search(searchQuery)
      if (response.items && response.items.length > 0) {
        setSearchResults(response.items)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.warn('Search API unavailable:', err.message)
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLike = useCallback(async (itemId, liked) => {
    try {
      await discoveryApi.likeItem(itemId, liked)
    } catch {
      // Silent
    }
  }, [])

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Discover</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="search-page__loading">
          <div className="masonry-grid" style={{ padding: '0 var(--space-4)', maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                width="100%"
                height={`${200 + Math.random() * 150}px`}
                style={{ borderRadius: 'var(--radius-lg)' }}
              />
            ))}
          </div>
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <DiscoveryFeed
          items={searchResults}
          onItemClick={setSelectedItem}
          onLike={handleLike}
          onSave={(itemId) => setSelectedItem(searchResults.find(i => i.id === itemId))}
        />
      ) : (
        <div className="search-page__empty">
          {searchResults === null ? (
            <>
              <p style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>🔍</p>
              <h3>Search for anything</h3>
              <p>Try "black leather jacket" or "summer dress"</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>😕</p>
              <h3>No matches found</h3>
              <p>Try a different search term</p>
            </>
          )}
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
