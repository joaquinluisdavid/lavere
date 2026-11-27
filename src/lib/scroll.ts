import type { SectionId } from '../data/content'

/** Smoothly scrolls to a section and moves focus there for keyboard and screen-reader users. */
export function scrollToSection(id: SectionId | string) {
  const target = document.getElementById(id)
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  target.focus({ preventScroll: true })
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
}
