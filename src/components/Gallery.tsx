import { motion, useReducedMotion, useScroll, useTransform, type MotionValue, type Variants } from 'motion/react'
import { useRef, useState } from 'react'
import { gallery, type GalleryItem } from '../data/content'
import { EASE_IN_OUT, viewportOnce } from '../lib/motion'
import { Lightbox } from './Lightbox'
import { LineReveal } from './ui/LineReveal'
import { Picture } from './ui/Picture'
import { Reveal } from './ui/Reveal'
import './Gallery.css'

// Differential drift (px) per tile so columns move at subtly different speeds.
const drift = [0, 70, -40, 50, -30, 60, -20, 80]

const tileMask: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE_IN_OUT } },
}

function Tile({
  item,
  index,
  progress,
  onOpen,
}: {
  item: GalleryItem
  index: number
  progress: MotionValue<number>
  onOpen: () => void
}) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [drift[index], -drift[index]])

  return (
    <motion.figure
      className={`tile ${item.layout}`}
      style={reduce ? undefined : { y }}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={viewportOnce}
    >
      <motion.button
        type="button"
        className="tile__button"
        onClick={onOpen}
        aria-label={`View larger: ${item.caption}`}
        aria-haspopup="dialog"
        variants={reduce ? undefined : tileMask}
      >
        <Picture name={item.image} alt={item.alt} sizes="(max-width: 760px) 92vw, 50vw" />
        <span className="tile__view" aria-hidden="true">
          View
        </span>
      </motion.button>
      <figcaption className="tile__caption">
        <span className="tile__num">({String(index + 1).padStart(2, '0')})</span>
        {item.caption}
      </figcaption>
    </motion.figure>
  )
}

export function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start end', 'end start'] })

  return (
    <section id="gallery" className="gallery" aria-labelledby="gallery-title" tabIndex={-1}>
      <div className="container">
        <header className="gallery__head">
          <Reveal className="gallery__label">
            <span className="eyebrow">Gallery</span>
          </Reveal>
          <h2 id="gallery-title" className="h2 gallery__title">
            <LineReveal lines={['Moments,', <em key="e">Elevated.</em>]} />
          </h2>
          <Reveal delay={0.15} className="gallery__intro">
            <p className="muted">
              Candlelit tables, a gold-lit bar and the city spread out below — a glimpse of the evenings that
              unfold on the fifty-second floor.
            </p>
          </Reveal>
        </header>

        <div className="gallery__grid" ref={gridRef}>
          {gallery.map((item, i) => (
            <Tile key={item.image} item={item} index={i} progress={scrollYProgress} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      <Lightbox items={gallery} index={openIndex} onChange={setOpenIndex} />
    </section>
  )
}
