import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE, viewportOnce } from '../../lib/motion'

type LineRevealProps = {
  lines: ReactNode[]
  className?: string
  delay?: number
  stagger?: number
  /** Animate immediately on mount instead of when scrolled into view. */
  play?: boolean
}

const line: Variants = {
  hidden: { y: '108%' },
  show: { y: '0%', transition: { duration: 1.25, ease: EASE } },
}

/** Editorial headline reveal: each line rises from behind a mask. */
export function LineReveal({ lines, className, delay = 0, stagger = 0.11, play }: LineRevealProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: viewportOnce }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <motion.span className={`line-reveal ${className ?? ''}`} variants={container} initial="hidden" {...trigger}>
      {lines.map((content, i) => (
        <span className="line-reveal__mask" key={i}>
          <motion.span className="line-reveal__line" variants={line}>
            {content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
