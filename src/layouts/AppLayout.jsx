import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Avatar from '../components/atoms/Avatar/Avatar'
import { HomeIcon, SearchIcon, ChatIcon, GridIcon, UserIcon } from '../components/icons/Icons'
import { MOCK_USER } from '../data/mockData'
import './AppLayout.css'

const NAV_ITEMS = [
  { to: '/', icon: <HomeIcon />, label: 'Home' },
  { to: '/search', icon: <SearchIcon />, label: 'Search' },
  { to: '/chat', icon: <ChatIcon />, label: 'Stylist' },
  { to: '/boards', icon: <GridIcon />, label: 'Boards' },
  { to: '/profile', icon: <UserIcon />, label: 'Profile' },
]

export default function AppLayout() {
  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="top-nav__inner">
          <NavLink to="/" className="top-nav__logo">
            <span className="top-nav__logo-text gradient-text">FitMatch</span>
          </NavLink>
          <nav className="top-nav__links">
            {NAV_ITEMS.slice(0, 3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `top-nav__link ${isActive ? 'top-nav__link--active' : ''}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="top-nav__right">
            <NavLink to="/profile">
              <Avatar name={MOCK_USER.display_name} size="sm" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="app-layout__main">
        <Outlet />
      </main>

      {/* Bottom Mobile Navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
            }
            end={item.to === '/'}
          >
            <motion.div
              className="bottom-nav__icon"
              whileTap={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {item.icon}
            </motion.div>
            <span className="bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
