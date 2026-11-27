import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { formatPHP, signatureMenu, type MenuItem } from '../data/content'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import { FullMenu } from './FullMenu'
import { Arrow } from './ui/Arrow'
import { LineReveal } from './ui/LineReveal'
import { Picture } from './ui/Picture'
import { Reveal } from './ui/Reveal'
import './Menu.css'

const allItems = signatureMenu.flatMap((group) => group.items)

export function Menu() {
  const [{ featured, layer }, setFeature] = useState({ featured: allItems[0], layer: 0 })
  const [fullMenuOpen, setFullMenuOpen] = useState(false)
  let running = 0

  const feature = (item: MenuItem) =>
    setFeature((prev) => (prev.featured === item ? prev : { featured: item, layer: prev.layer + 1 }))

  return (
    <section id="menu" className="menu" aria-labelledby="menu-title" tabIndex={-1}>
      <div className="container">
        <header className="menu__head">
          <Reveal className="menu__label">
            <span className="section-num">03</span>
            <span className="eyebrow">Signature Menu</span>
          </Reveal>
          <h2 id="menu-title" className="h2 menu__title">
            <LineReveal lines={['Composed', <em key="s">to Savor.</em>]} />
          </h2>
        </header>

        <div className="menu__layout">
          <div className="menu__lists">
            {signatureMenu.map((group) => (
              <div className="menu__group" key={group.label}>
                <Reveal as="header" className="menu__group-head">
                  <h3 className="menu__group-title">{group.label}</h3>
                  <span className="menu__group-count">{String(group.items.length).padStart(2, '0')} selections</span>
                </Reveal>
                <ul>
                  {group.items.map((item) => {
                    running += 1
                    const isFeatured = featured.name === item.name
                    return (
                      <Reveal as="li" key={item.name} className={`menu-row ${isFeatured ? 'is-featured' : ''}`}>
                        <div className="menu-row__inner" onPointerEnter={() => feature(item)}>
                          <span className="menu-row__num">{String(running).padStart(2, '0')}</span>
                          <div className="menu-row__thumb">
                            <Picture name={item.image} alt={item.alt} sizes="(max-width: 900px) 30vw, 1px" />
                          </div>
                          <div className="menu-row__text">
                            {item.note && <span className="menu-row__note">{item.note}</span>}
                            <h4 className="menu-row__name">{item.name}</h4>
                            <p className="menu-row__desc">{item.description}</p>
                          </div>
                          <span className="menu-row__price">{formatPHP(item.price)}</span>
                        </div>
                      </Reveal>
                    )
                  })}
                </ul>
              </div>
            ))}

            <Reveal className="menu__cta">
              <button type="button" className="btn" onClick={() => setFullMenuOpen(true)} aria-haspopup="dialog">
                Discover Our Menu
                <Arrow />
              </button>
              <p className="menu__fineprint">
                Prices in Philippine pesos, inclusive of VAT and subject to a 10% service charge.
              </p>
            </Reveal>
          </div>

          <div className="menu__feature">
            <div className="menu__feature-sticky">
              <div className="menu__feature-frame">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={featured.image}
                    className="menu__feature-img"
                    style={{ zIndex: layer }}
                    initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ opacity: 0.999, transition: { duration: 0.9 } }}
                    transition={{ duration: 0.9, ease: EASE_IN_OUT }}
                  >
                    <motion.div
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.4, ease: EASE }}
                    >
                      <Picture name={featured.image} alt={featured.alt} sizes="(max-width: 900px) 1px, 40vw" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="menu__feature-caption">
                <span className="menu__feature-name">{featured.name}</span>
                <span className="menu__feature-price">{formatPHP(featured.price)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FullMenu open={fullMenuOpen} onClose={() => setFullMenuOpen(false)} />
    </section>
  )
}
