import { useRef } from 'react'
import { motion } from 'framer-motion'
import Badge from '../../atoms/Badge/Badge'
import { AESTHETIC_TAGS } from '../../../data/mockData'
import './TrendingBar.css'

export default function TrendingBar({ activeTag, onTagClick }) {
  const scrollRef = useRef(null)

  return (
    <div className="trending-bar">
      <div className="trending-bar__scroll" ref={scrollRef}>
        <Badge
          label="✨ For You"
          variant={!activeTag ? 'active' : 'default'}
          onClick={() => onTagClick?.(null)}
        />
        {AESTHETIC_TAGS.map((tag) => (
          <Badge
            key={tag}
            label={tag}
            variant={activeTag === tag ? 'active' : 'default'}
            onClick={() => onTagClick?.(tag)}
          />
        ))}
      </div>
    </div>
  )
}
