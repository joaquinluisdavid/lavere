import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE, viewportOnce } from '../../lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'li' | 'span' | 'header' | 'footer'
}

export function Reveal({ children, delay = 0, y = 36, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}
