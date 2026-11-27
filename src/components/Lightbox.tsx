import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useEffect, useRef } from 'react'
import type { GalleryItem } from '../data/content'
import { useModalDialog } from '../hooks/useModalDialog'
import { EASE } from '../lib/motion'
import { Picture } from './ui/Picture'
import './Lightbox.css'

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
}

type LightboxProps = {
  items: GalleryItem[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ items, index, onChange }: LightboxProps) {
  const open = index !== null
  const close = () => onChange(null)
  const ref = useModalDialog(open, close)
  const direction = useRef(1)

  const step = (delta: number) => {
    if (index === null) return
    direction.current = delta
    onChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const item = index !== null ? items[index] : null

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Gallery viewer"
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="lightbox__bar">
        <p className="lightbox__count" aria-live="polite">
          {index !== null && (
            <>
              <span className="lightbox__count-current">{String(index + 1).padStart(2, '0')}</span>
              <span> / {String(items.length).padStart(2, '0')}</span>
            </>
          )}
        </p>
        <button type="button" className="lightbox__close" onClick={close}>
          Close<span className="sr-only"> gallery</span>
          <span className="menu-overlay__x" aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__stage">
        <AnimatePresence initial={false} mode="popLayout" custom={direction.current}>
          {item && (
            <motion.figure
              key={item.image}
              className="lightbox__figure"
              custom={direction.current}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Picture name={item.image} alt={item.alt} sizes="90vw" priority />
              <figcaption>{item.caption}</figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      <div className="lightbox__nav">
        <button type="button" className="lightbox__arrow" onClick={() => step(-1)} aria-label="Previous image">
          <span aria-hidden="true">Prev</span>
        </button>
        <button type="button" className="lightbox__arrow" onClick={() => step(1)} aria-label="Next image">
          <span aria-hidden="true">Next</span>
        </button>
      </div>
    </dialog>
  )
}
