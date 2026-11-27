import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import './Intro.css'

const letters = ['L', 'A', 'V', 'È', 'R', 'E']
const SEEN_KEY = 'lavere:intro-seen'

/** Brief brand curtain on first visit per session; calls onDone as it lifts. */
export function Intro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SEEN_KEY))

  useEffect(() => {
    if (!visible) {
      onDone()
      return
    }
    sessionStorage.setItem(SEEN_KEY, '1')
    const timer = window.setTimeout(() => setVisible(false), reduce ? 300 : 1900)
    return () => window.clearTimeout(timer)
  }, [visible, reduce, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro"
          aria-hidden="true"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        >
          <div className="intro__mark">
            {letters.map((letter, i) => (
              <span className="intro__mask" key={letter}>
                <motion.span
                  className={letter === 'È' ? 'intro__accent' : undefined}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.07 }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>
          <motion.span
            className="intro__rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.3 }}
          />
          <motion.span
            className="intro__tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Above the Ordinary
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
