import { MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Marquee } from './components/Marquee'
import { Menu } from './components/Menu'
import { Nav } from './components/Nav'
import { Reservations } from './components/Reservations'
import { Story } from './components/Story'
import { Visit } from './components/Visit'

export default function App() {
  const [ready, setReady] = useState(false)
  const handleIntroDone = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Intro onDone={handleIntroDone} />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Story />
        <Marquee />
        <Experience />
        <Menu />
        <Gallery />
        <Reservations />
        <Visit />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
