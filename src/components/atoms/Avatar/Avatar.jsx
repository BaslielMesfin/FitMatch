import './Avatar.css'

export default function Avatar({ src, name, size = 'md' }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className={`avatar avatar--${size}`}>
      {src ? (
        <img
          className="avatar__img"
          src={src}
          alt={name || 'User avatar'}
          loading="lazy"
        />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  )
}
