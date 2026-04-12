import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '../components/molecules/SearchBar/SearchBar'
import Loader from '../components/atoms/Loader/Loader'
import DiscoveryFeed from '../components/organisms/DiscoveryFeed/DiscoveryFeed'
import ItemDetailModal from '../components/organisms/ItemDetailModal/ItemDetailModal'
import { searchApi, discoveryApi } from '../services/api'
import './SearchPage.css'

const BRAND_FILTERS = ['All', 'Zara', 'ASOS', 'SSENSE', 'H&M', 'Uniqlo', 'Aritzia']
const AESTHETIC_FILTERS = ['All', 'Streetwear', 'Old Money', 'Minimalist', 'Y2K', 'Dark Academia']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeBrand, setActiveBrand] = useState('All')
  const [activeAesthetic, setActiveAesthetic] = useState('All')

  const { data: searchResults, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['search', query, activeBrand, activeAesthetic],
    queryFn: () => searchApi.search(query, {
      brands: activeBrand !== 'All' ? [activeBrand] : null,
      aesthetic: activeAesthetic !== 'All' ? activeAesthetic : null,
    }),
    enabled: query.trim().length > 0,
    select: (data) => data.items || [],
  })

  function handleSearch(searchQuery) {
    setQuery(searchQuery)
  }

  async function handleLike(itemId, liked) {
    try {
      await discoveryApi.likeItem(itemId, liked)
    } catch { }
  }

  return (
    <div className="search-page">
      <div className="search-page__header">
        <h1 className="search-page__title">Discover</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Filter Chips */}
      <div className="search-page__filters">
        <div className="search-page__filter-row">
          {BRAND_FILTERS.map(brand => (
            <button
              key={brand}
              className={`search-page__filter-chip ${activeBrand === brand ? 'search-page__filter-chip--active' : ''}`}
              onClick={() => setActiveBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
        <div className="search-page__filter-row">
          {AESTHETIC_FILTERS.map(aes => (
            <button
              key={aes}
              className={`search-page__filter-chip search-page__filter-chip--aesthetic ${activeAesthetic === aes ? 'search-page__filter-chip--active' : ''}`}
              onClick={() => setActiveAesthetic(aes)}
            >
              {aes}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Loader fullPage />
      ) : isError ? (
        <div className="search-page__empty" style={{ color: 'var(--color-text-tertiary)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-medium)', marginBottom: '8px' }}>Whoops!</h2>
          <p>{error?.message || 'Unable to reach the search engine.'}</p>
          <button 
            style={{ marginTop: '16px', padding: '8px 16px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-600)', border: 'none', cursor: 'pointer' }}
            onClick={() => refetch()}
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
          {!query.trim() ? (
            <>
              <h3>Search for anything</h3>
              <p>Try "black leather jacket" or "Old Money polo"</p>
            </>
          ) : (
            <>
              <h3>No matches found</h3>
              <p>Try a different search term or adjust your filters</p>
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
