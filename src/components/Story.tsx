import { Reveal } from './ui/Reveal'
import { LineReveal } from './ui/LineReveal'
import { ParallaxImage } from './ui/ParallaxImage'
import './Story.css'

const stats = [
  { value: '52', label: 'Floors above Makati' },
  { value: '180°', label: 'Of uninterrupted skyline' },
  { value: '12', label: 'House cocktails, rotated by season' },
]

export function Story() {
  return (
    <section id="story" className="story" aria-labelledby="story-title" tabIndex={-1}>
      <div className="container">
        <header className="story__head">
          <Reveal className="story__label">
            <span className="section-num">01</span>
            <span className="eyebrow">Our Story</span>
          </Reveal>
          <h2 id="story-title" className="h2 story__title">
            <LineReveal lines={['An Escape', 'Above the', <em key="e">Everyday.</em>]} />
          </h2>
        </header>

        <div className="story__grid">
          <div className="story__media">
            <ParallaxImage
              className="story__img-main"
              name="dusk"
              speed={0.08}
              sizes="(max-width: 760px) 92vw, 50vw"
              alt="A guest silhouetted against a glass balustrade as the sun sets over the city"
            />
            <ParallaxImage
              className="story__img-sub"
              name="coupes"
              speed={0.12}
              reveal="left"
              sizes="(max-width: 760px) 50vw, 24vw"
              alt="Champagne coupes catching warm golden light"
            />
            <p className="story__caption" aria-hidden="true">
              Golden hour, the West Terrace
            </p>
          </div>

          <div className="story__text">
            <Reveal>
              <p className="lead story__lead">
                LAVÈRE was imagined as a pause from the city — a place to rise above the noise and let the
                evening unfold slowly.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="story__body">
                Here, exceptional dining meets elevated nightlife. Dinner drifts into cocktails, cocktails into
                late-night sets, and the skyline does the rest. Every detail — from the weight of the glassware to
                the warmth of the lighting — is considered, so you never have to.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="story__sign">
                <span className="story__sign-name">The House of LAVÈRE</span>
                <span className="story__sign-role">Makati, Metro Manila</span>
              </p>
            </Reveal>

            <dl className="story__stats">
              {stats.map((stat, i) => (
                <Reveal className="story__stat" key={stat.label} delay={0.1 * i}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
