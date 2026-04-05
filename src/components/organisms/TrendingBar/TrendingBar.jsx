import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Badge from '../../atoms/Badge/Badge'
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
        <Badge
          label="✨ For You"
          variant={!activeTag ? 'active' : 'default'}
          onClick={() => onTagClick?.(null)}
        />
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width="80px" height="32px" style={{ borderRadius: 'var(--radius-full)' }} />
          ))
        ) : (
          tags.map((tag) => (
            <Badge
              key={tag}
              label={tag}
              variant={activeTag === tag ? 'active' : 'default'}
              onClick={() => onTagClick?.(tag)}
            />
          ))
        )}
      </div>
    </div>
  )
}
