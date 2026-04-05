import { motion } from 'framer-motion'
import './IconButton.css'

export default function IconButton({
  icon,
  label,
  variant = 'default',
  active = false,
  size = 'md',
  onClick,
  ...props
}) {
  return (
    <motion.button
      type="button"
      className={`icon-btn icon-btn--${variant} icon-btn--${size} ${active ? 'icon-btn--active' : ''}`}
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {icon}
    </motion.button>
  )
}
