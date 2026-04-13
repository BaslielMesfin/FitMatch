import { useState } from 'react'
import { motion } from 'framer-motion'
import IconButton from '../../atoms/IconButton/IconButton'
import { HeartIcon, BookmarkIcon } from '../../icons/Icons'
import StarBorder from '../../atoms/StarBorder/StarBorder'
import PixelCard from '../../atoms/PixelCard/PixelCard'
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

  function handleShop(e) {
    e.stopPropagation()
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
      <PixelCard variant="pink">
        <div className="item-card__content-wrapper">
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

          {/* Hover-to-Shop — centered pill */}
          {item.product_url && (
            <div className="item-card__shop-zone">
              <StarBorder
                as="a"
                href={item.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="item-card__shop-btn"
                color="#c084fc"
                speed="3s"
                onClick={handleShop}
              >
                Shop
              </StarBorder>
            </div>
          )}

          {/* Bottom gradient with price + genre */}
          <div className="item-card__gradient">
            <span className="item-card__price">${item.price.toFixed(2)}</span>
            {item.aesthetic_tags?.[0] && (
              <span className="item-card__genre">{item.aesthetic_tags[0]}</span>
            )}
          </div>
        </div>
      </PixelCard>
    </motion.article>
  )
}
