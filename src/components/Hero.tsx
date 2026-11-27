import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { venue } from '../data/content'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/scroll'
import { Arrow } from './ui/Arrow'
import { LineReveal } from './ui/LineReveal'
import { Picture } from './ui/Picture'
import './Hero.css'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.2, ease: EASE, delay },
  })

  const jump = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <motion.div className="hero__media" style={reduce ? undefined : { y: imageY }}>
        <motion.div
          className="hero__zoom"
          initial={{ scale: reduce ? 1 : 1.16 }}
          animate={ready ? { scale: 1.02 } : undefined}
          transition={{ duration: 3.2, ease: EASE }}
        >
          <Picture
            name="hero"
            priority
            alt="LAVÈRE's rooftop lounge at night — low sofas, lantern light and the city glowing beyond the terrace"
          />
        </motion.div>
      </motion.div>
      <div className="hero__shade" aria-hidden="true" />

      <motion.div className="hero__content container" style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}>
        <motion.p className="eyebrow hero__eyebrow" {...fade(0.15)}>
          Rooftop Dining &amp; Cocktail Bar · Makati
        </motion.p>

        <h1 id="hero-title" className="display hero__title">
          <LineReveal play={ready} delay={0.25} lines={['Above the', <em key="o">Ordinary.</em>]} />
        </h1>

        <div className="hero__foot">
          <motion.p className="hero__copy" {...fade(0.75)}>
            Fifty-two floors above the city, LAVÈRE pairs refined dining and handcrafted cocktails with an
            unbroken view of the Makati skyline — an evening composed, from golden hour to the last glass.
          </motion.p>
          <motion.div className="hero__ctas" {...fade(0.9)}>
            <a href="#experience" className="btn" onClick={jump('experience')}>
              Explore the Experience
              <Arrow />
            </a>
            <a href="#reservations" className="btn btn--ghost" onClick={jump('reservations')}>
              Reserve a Table
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.p className="hero__est" {...fade(1.1)}>
        <span>Est. {venue.established}</span>
        <span className="hero__est-rule" aria-hidden="true" />
        <span>{venue.floor}</span>
      </motion.p>

      <motion.p className="hero__coords" aria-hidden="true" {...fade(1.2)}>
        {venue.coordinates}
      </motion.p>

      <motion.a href="#story" className="hero__scroll" onClick={jump('story')} {...fade(1.3)}>
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-track" aria-hidden="true">
          <span className="hero__scroll-thumb" />
        </span>
        <span className="sr-only">to Our Story</span>
      </motion.a>
    </section>
  )
}
