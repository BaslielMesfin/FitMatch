import Masonry from 'react-masonry-css'
import ItemCard from '../../molecules/ItemCard/ItemCard'
import './DiscoveryFeed.css'

export default function DiscoveryFeed({ items, likedItems = new Set(), onItemClick, onLike, onSave }) {
  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1
  };

  return (
    <div className="discovery-feed">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
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
      </Masonry>
    </div>
  )
}
