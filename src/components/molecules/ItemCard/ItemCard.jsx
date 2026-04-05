import { useState } from 'react'
import { motion } from 'framer-motion'
import Badge from '../../atoms/Badge/Badge'
import IconButton from '../../atoms/IconButton/IconButton'
import { HeartIcon, BookmarkIcon } from '../../icons/Icons'
import './ItemCard.css'

export default function ItemCard({ item, onLike, onSave, onClick, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  function handleLike(e) {
    e.stopPropagation()
    setLiked(!liked)
    onLike?.(item.id, !liked)
  }

  function handleSave(e) {
    e.stopPropagation()
    setSaved(!saved)
    onSave?.(item.id, !saved)
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
      <div className="item-card__image-wrapper">
        {!imgLoaded && <div className="item-card__skeleton" />}
        <img
          className={`item-card__image ${imgLoaded ? 'item-card__image--loaded' : ''}`}
          src={item.image_url}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="item-card__overlay">
          <div className="item-card__actions">
            <IconButton
              icon={<HeartIcon filled={liked} />}
              label={liked ? 'Unlike' : 'Like'}
              variant="glass"
              active={liked}
              size="sm"
              onClick={handleLike}
            />
            <IconButton
              icon={<BookmarkIcon filled={saved} />}
              label={saved ? 'Unsave' : 'Save to board'}
              variant="glass"
              active={saved}
              size="sm"
              onClick={handleSave}
            />
          </div>
        </div>
      </div>

      <div className="item-card__info">
        <p className="item-card__brand">{item.brand}</p>
        <h3 className="item-card__title">{item.title}</h3>
        <div className="item-card__meta">
          <span className="item-card__price">
            ${item.price.toFixed(2)}
          </span>
          {item.aesthetic_tags?.[0] && (
            <Badge label={item.aesthetic_tags[0]} variant="default" />
          )}
        </div>
      </div>
    </motion.article>
  )
}
