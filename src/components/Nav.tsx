import { motion, useMotionValueEvent, useScroll, type Variants } from 'motion/react'
import { useState } from 'react'
import { navLinks, venue, type SectionId } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useModalDialog } from '../hooks/useModalDialog'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import './Nav.css'

const sectionIds = [...navLinks.map((l) => l.id), 'visit'] as const

const menuList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const menuItem: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`}>
      LAV<span className="wordmark__accent">È</span>RE
    </span>
  )
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const active = useActiveSection(sectionIds)
  const dialogRef = useModalDialog(menuOpen, () => setMenuOpen(false))
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 640 && y > previous + 2)
    if (y < previous - 2) setHidden(false)
  })

  const go = (id: SectionId) => (event: React.MouseEvent) => {
    event.preventDefault()
    setMenuOpen(false)
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''}`}>
        <div className="nav__inner">
          <a href="#home" className="nav__brand" onClick={go('home')} aria-label="LAVÈRE — back to top">
            <Wordmark />
          </a>

          <nav className="nav__links" aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    className={active === link.id ? 'is-active' : undefined}
                    aria-current={active === link.id ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <a href="#reservations" className="nav__cta" onClick={go('reservations')}>
              <span>Reserve a Table</span>
            </a>
            <button
              type="button"
              className="nav__toggle"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <dialog ref={dialogRef} className="menu-overlay" aria-label="Site menu">
        <div className="menu-overlay__top">
          <Wordmark />
          <button type="button" className="menu-overlay__close" onClick={() => setMenuOpen(false)}>
            Close
            <span aria-hidden="true" className="menu-overlay__x" />
          </button>
        </div>

        <nav aria-label="Mobile">
          <motion.ul className="menu-overlay__list" variants={menuList} initial="hidden" animate={menuOpen ? 'show' : 'hidden'}>
            {navLinks.map((link, i) => (
              <li key={link.id} className="menu-overlay__item">
                <motion.a href={`#${link.id}`} onClick={go(link.id)} variants={menuItem}>
                  <span className="menu-overlay__num">0{i + 1}</span>
                  {link.label}
                </motion.a>
              </li>
            ))}
          </motion.ul>
        </nav>

        <div className="menu-overlay__foot">
          <p>
            {venue.floor}, {venue.street}
            <br />
            {venue.city}
          </p>
          <a href="#reservations" className="btn" onClick={go('reservations')}>
            Reserve a Table
          </a>
        </div>
      </dialog>
    </>
  )
}
