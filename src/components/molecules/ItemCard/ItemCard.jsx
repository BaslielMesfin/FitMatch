import { useState } from 'react'
import { motion } from 'framer-motion'
import IconButton from '../../atoms/IconButton/IconButton'
import { HeartIcon, BookmarkIcon } from '../../icons/Icons'
import './ItemCard.css'

export default function ItemCard({ item, isLiked = false, onLike, onSave, onClick, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  function handleLike(e) {
    e.stopPropagation()
    onLike?.(item.id, !isLiked, item)
  }

  function handleSave(e) {
    e.stopPropagation()
    onSave?.(item.id)
  }

  return (
    <motion.article
      className="item-card"
      onClick={() => onClick?.(item)}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.33, 1, 0.68, 1]
      }}
    >
      {!imgLoaded && <div className="item-card__skeleton" />}
      <img
        className={`item-card__image ${imgLoaded ? 'item-card__image--loaded' : ''}`}
        src={item.image_url}
        alt={item.title}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
      />

      {/* Hover actions — top right */}
      <div className="item-card__actions-overlay">
        <div className="item-card__actions">
          <IconButton
            icon={<HeartIcon filled={isLiked} />}
            label={isLiked ? 'Unlike' : 'Like'}
            variant="glass"
            active={isLiked}
            size="sm"
            onClick={handleLike}
          />
          <IconButton
            icon={<BookmarkIcon filled={false} />}
            label="Save to board"
            variant="glass"
            size="sm"
            onClick={handleSave}
          />
        </div>
      </div>

      {/* Bottom gradient with price + genre */}
      <div className="item-card__gradient">
        <span className="item-card__price">${item.price.toFixed(2)}</span>
        {item.aesthetic_tags?.[0] && (
          <span className="item-card__genre">{item.aesthetic_tags[0]}</span>
        )}
      </div>
    </motion.article>
  )
}
