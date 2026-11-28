import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { experiences } from '../data/content'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import { LineReveal } from './ui/LineReveal'
import { ParallaxImage } from './ui/ParallaxImage'
import { Picture } from './ui/Picture'
import { Reveal } from './ui/Reveal'
import './Experience.css'

export function Experience() {
  // `layer` increments on every change so the incoming slide always stacks above the outgoing one.
  const [{ active, layer }, setSlide] = useState({ active: 0, layer: 0 })
  const actsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.index)
          setSlide((prev) => (prev.active === index ? prev : { active: index, layer: prev.layer + 1 }))
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    actsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const current = experiences[active]

  return (
    <section id="experience" className="experience" aria-labelledby="experience-title" tabIndex={-1}>
      <div className="container">
        <header className="experience__head">
          <Reveal className="experience__label">
            <span className="eyebrow">The Experience</span>
          </Reveal>
          <h2 id="experience-title" className="h2 experience__title">
            <LineReveal lines={['An Evening,', <>In Three <em>Acts.</em></>]} />
          </h2>
          <Reveal delay={0.2} className="experience__intro">
            <p className="muted">
              Arrive for dinner, stay for the bar, linger for the view. Each part of the night is designed to
              stand on its own — and to flow seamlessly into the next.
            </p>
          </Reveal>
        </header>

        <div className="experience__body">
          <div className="experience__stage" aria-hidden="true">
            <div className="experience__frame">
              <div className="experience__slides">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.image}
                  className="experience__slide"
                  style={{ zIndex: layer }}
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0.999 }}
                  transition={{ duration: 1.1, ease: EASE_IN_OUT }}
                >
                  <motion.div
                    className="experience__slide-img"
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1.04 }}
                    transition={{ duration: 1.8, ease: EASE }}
                  >
                    <Picture name={current.image} alt="" sizes="(max-width: 900px) 1px, 46vw" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              </div>

              <div className="experience__counter">
                <span className="experience__counter-current">{current.index}</span>
                <span className="experience__counter-total">/ 03</span>
              </div>
              <div className="experience__progress">
                {experiences.map((exp, i) => (
                  <span key={exp.index} className={i <= active ? 'is-on' : undefined} />
                ))}
              </div>
            </div>
          </div>

          <ol className="experience__acts">
            {experiences.map((exp, i) => (
              <li
                key={exp.index}
                ref={(el) => {
                  actsRef.current[i] = el
                }}
                data-index={i}
                className={`experience__act ${i === active ? 'is-active' : ''}`}
              >
                <ParallaxImage
                  className="experience__inline-media"
                  name={exp.image}
                  alt={exp.alt}
                  speed={0.08}
                  sizes="(max-width: 900px) 92vw, 1px"
                />
                <Reveal>
                  <span className="experience__act-index">Act {exp.index}</span>
                  <h3 className="experience__act-title">
                    {exp.title} <em>{exp.italic}</em>
                  </h3>
                  <p className="experience__act-body">{exp.body}</p>
                  <p className="experience__act-meta">{exp.meta}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
