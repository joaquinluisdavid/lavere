import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef } from 'react'
import type { ImageName } from '../../data/imageManifest'
import { EASE_IN_OUT, viewportOnce } from '../../lib/motion'
import { Picture } from './Picture'

type ParallaxImageProps = {
  name: ImageName
  alt: string
  sizes?: string
  /** Fraction of frame height the image drifts across the viewport. */
  speed?: number
  className?: string
  /** Direction the mask opens from when entering the viewport. */
  reveal?: 'up' | 'down' | 'left' | 'right' | false
  priority?: boolean
}

const hiddenClip = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  right: 'inset(0% 100% 0% 0%)',
}

export function ParallaxImage({
  name,
  alt,
  sizes,
  speed = 0.1,
  className,
  reveal = 'up',
  priority,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])
  const animateMask = reveal && !reduce

  const mask: Variants | undefined = animateMask
    ? {
        hidden: { clipPath: hiddenClip[reveal] },
        shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.5, ease: EASE_IN_OUT } },
      }
    : undefined

  // The observed element stays unclipped: a fully collapsed clip-path can stop
  // IntersectionObserver from ever reporting it as visible.
  return (
    <motion.div
      ref={ref}
      className={`parallax ${className ?? ''}`}
      initial={animateMask ? 'hidden' : false}
      whileInView={animateMask ? 'shown' : undefined}
      viewport={viewportOnce}
    >
      <motion.div className="parallax__mask" variants={mask}>
        <motion.div className="parallax__inner" style={reduce ? undefined : { y, scale: 1 + speed * 2 }}>
          <Picture name={name} alt={alt} sizes={sizes} priority={priority} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
