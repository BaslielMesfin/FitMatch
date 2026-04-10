import { AnimatePresence } from 'framer-motion'
import ItemCard from '../../molecules/ItemCard/ItemCard'
import './DiscoveryFeed.css'

export default function DiscoveryFeed({ items, likedItems = new Set(), onItemClick, onLike, onSave }) {
  return (
    <div className="discovery-feed">
      <div className="masonry-grid">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <ItemCard
              key={item.id}
              item={item}
              index={index}
              isLiked={likedItems.has(item.id)}
              onClick={onItemClick}
              onLike={onLike}
              onSave={onSave}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
