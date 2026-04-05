import { motion, AnimatePresence } from 'framer-motion'
import Badge from '../../atoms/Badge/Badge'
import Button from '../../atoms/Button/Button'
import IconButton from '../../atoms/IconButton/IconButton'
import { CloseIcon, HeartIcon, BookmarkIcon, ExternalLinkIcon } from '../../icons/Icons'
import './ItemDetailModal.css'

export default function ItemDetailModal({ item, isOpen, onClose }) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="item-detail-modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="item-detail-modal__header">
              <IconButton
                icon={<CloseIcon />}
                label="Close"
                onClick={onClose}
                size="sm"
              />
            </div>

            <div className="item-detail-modal__content">
              <div className="item-detail-modal__image-section">
                <img
                  className="item-detail-modal__image"
                  src={item.image_url}
                  alt={item.title}
                />
              </div>

              <div className="item-detail-modal__info-section">
                <span className="item-detail-modal__brand">{item.brand}</span>
                <h2 className="item-detail-modal__title">{item.title}</h2>
                <p className="item-detail-modal__price">${item.price.toFixed(2)}</p>

                <div className="item-detail-modal__tags">
                  {item.aesthetic_tags?.map((tag) => (
                    <Badge key={tag} label={tag} />
                  ))}
                  {item.color && <Badge label={item.color} variant="muted" />}
                  {item.category && <Badge label={item.category} variant="muted" />}
                </div>

                <div className="item-detail-modal__actions">
                  <Button variant="primary" size="lg" fullWidth icon={<ExternalLinkIcon />}>
                    Shop at {item.store}
                  </Button>
                  <div className="item-detail-modal__secondary-actions">
                    <Button variant="secondary" icon={<HeartIcon />}>
                      Like
                    </Button>
                    <Button variant="secondary" icon={<BookmarkIcon />}>
                      Save
                    </Button>
                  </div>
                </div>

                <div className="item-detail-modal__ai-section">
                  <div className="item-detail-modal__ai-header">
                    <span className="gradient-text">✨ AI Stylist Match</span>
                  </div>
                  <p className="item-detail-modal__ai-text">
                    This {item.category?.toLowerCase() || 'item'} pairs perfectly with neutral tones
                    and structured silhouettes. Try it with tailored trousers and
                    minimalist accessories for a {item.aesthetic_tags?.[0] || 'classic'} look.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
