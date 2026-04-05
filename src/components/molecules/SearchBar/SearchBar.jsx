import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchIcon, CloseIcon, SparkleIcon } from '../../icons/Icons'
import Badge from '../../atoms/Badge/Badge'
import './SearchBar.css'

const AI_SUGGESTIONS = [
  'Old Money interview outfit',
  'Summer beach wedding',
  'First date casual',
  'Streetwear for winter',
  'Dark academia essentials',
]

export default function SearchBar({ onSearch, onTagClick }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
    }
  }

  function handleSuggestionClick(suggestion) {
    setQuery(suggestion)
    onSearch?.(suggestion)
    setFocused(false)
  }

  return (
    <div className="search-bar-wrapper">
      <form className={`search-bar ${focused ? 'search-bar--focused' : ''}`} onSubmit={handleSubmit}>
        <span className="search-bar__icon">
          <SearchIcon />
        </span>
        <input
          id="search-input"
          className="search-bar__input"
          type="text"
          placeholder="Search styles, brands, or describe a vibe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => { setQuery(''); }}
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        )}
      </form>

      <AnimatePresence>
        {focused && !query && (
          <motion.div
            className="search-bar__suggestions"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="search-bar__suggestions-header">
              <SparkleIcon />
              <span>AI Suggestions</span>
            </div>
            <div className="search-bar__suggestions-list">
              {AI_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className="search-bar__suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
