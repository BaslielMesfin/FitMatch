import { useState, useEffect, useRef } from 'react'
import Skeleton from '../../atoms/Skeleton/Skeleton'
import { AESTHETIC_TAGS } from '../../../data/mockData'
import { socialApi } from '../../../services/api'
import './TrendingBar.css'

export default function TrendingBar({ activeTag, onTagClick }) {
  const scrollRef = useRef(null)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrending() {
      try {
        const trending = await socialApi.getTrending(6)
        if (trending && trending.length > 0) {
          setTags(trending.map(t => t.tag))
        } else {
          setTags(AESTHETIC_TAGS)
        }
      } catch (err) {
        console.warn('Failed to fetch trending tags, using fallback', err)
        setTags(AESTHETIC_TAGS)
      } finally {
        setLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <div className="trending-bar">
      <div className="trending-bar__scroll" ref={scrollRef}>
        <button
          className={`trending-bar__tab ${!activeTag ? 'trending-bar__tab--active' : ''}`}
          onClick={() => onTagClick?.(null)}
        >
          For You
        </button>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="80px" height="24px" style={{ borderRadius: 'var(--radius-md)' }} />
          ))
        ) : (
          tags.map((tag) => (
            <button
              key={tag}
              className={`trending-bar__tab ${activeTag === tag ? 'trending-bar__tab--active' : ''}`}
              onClick={() => onTagClick?.(tag)}
            >
              {tag}
            </button>
          ))
        )}
      </div>
    </div>
  )
}
