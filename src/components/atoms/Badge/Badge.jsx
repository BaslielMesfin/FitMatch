import './Badge.css'

export default function Badge({ label, variant = 'default', onClick }) {
  return (
    <span
      className={`badge badge--${variant} ${onClick ? 'badge--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  )
}
