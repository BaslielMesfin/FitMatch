import { useState, useCallback } from 'react'
import SearchBar from '../components/molecules/SearchBar/SearchBar'
import Loader from '../components/atoms/Loader/Loader'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import { searchApi, discoveryApi } from '../services/api'
import './SearchPage.css'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery)
    setError(null)
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
      console.error('Search API error:', err.message)
      setError('Unable to reach the search engine. Please check your connection and try again.')
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
        <Loader fullPage />
      ) : error ? (
        <div className="search-page__empty" style={{ color: 'var(--color-text-tertiary)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-medium)', marginBottom: '8px' }}>Whoops!</h2>
          <p>{error}</p>
          <button 
            style={{ marginTop: '16px', padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', border: 'none', cursor: 'pointer' }}
            onClick={() => handleSearch(query)}
          >
            Retry Search
          </button>
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
              <h3>Search for anything</h3>
              <p>Try "black leather jacket" or "summer dress"</p>
            </>
          ) : (
            <>
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
