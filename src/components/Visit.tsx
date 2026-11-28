import { venue } from '../data/content'
import { Arrow } from './ui/Arrow'
import { LineReveal } from './ui/LineReveal'
import { ParallaxImage } from './ui/ParallaxImage'
import { Reveal } from './ui/Reveal'
import './Visit.css'

function MapIllustration() {
  return (
    <svg className="map" viewBox="0 0 400 300" role="img" aria-labelledby="map-title map-desc">
      <title id="map-title">Illustrative location map</title>
      <desc id="map-desc">
        Stylised, not-to-scale sketch placing LAVÈRE on Ayala Avenue near Paseo de Roxas in Makati.
      </desc>
      <rect width="400" height="300" fill="#141311" />
      <g stroke="rgb(242 237 227 / 0.08)" strokeWidth="1">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30 - 60} y2="300" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30 + 40} />
        ))}
      </g>
      {/* EDSA */}
      <path d="M-10 250 C 90 230, 170 170, 260 110 S 380 30, 420 10" stroke="rgb(242 237 227 / 0.28)" strokeWidth="5" fill="none" />
      {/* Ayala Avenue */}
      <path d="M20 40 L 380 260" stroke="rgb(242 237 227 / 0.5)" strokeWidth="2.5" fill="none" />
      {/* Paseo de Roxas */}
      <path d="M60 290 L 320 20" stroke="rgb(242 237 227 / 0.34)" strokeWidth="1.5" fill="none" />
      {/* Makati Avenue */}
      <path d="M150 0 L 250 300" stroke="rgb(242 237 227 / 0.18)" strokeWidth="1.2" fill="none" />
      {/* Ayala Triangle */}
      <path d="M180 120 L 236 172 L 196 178 Z" fill="rgb(128 104 75 / 0.35)" stroke="rgb(197 166 117 / 0.5)" strokeWidth="1" />
      <g fontFamily="Manrope Variable, sans-serif" fontSize="7.5" letterSpacing="2" fill="rgb(242 237 227 / 0.55)">
        <text x="300" y="205" transform="rotate(31.4 300 205)">AYALA AVE</text>
        <text x="88" y="232" transform="rotate(-46 88 232)">PASEO DE ROXAS</text>
        <text x="300" y="60" transform="rotate(-32 300 60)">EDSA</text>
      </g>
      <g transform="translate(232 196)">
        <circle r="18" fill="none" stroke="#C5A675" strokeWidth="0.8" className="map__pulse" />
        <circle r="5" fill="#C5A675" />
        <line x1="0" y1="0" x2="34" y2="-34" stroke="#C5A675" strokeWidth="0.8" />
        <text x="38" y="-38" fontFamily="Cormorant Garamond Variable, serif" fontSize="15" letterSpacing="3" fill="#F2EDE3">
          LAVÈRE
        </text>
        <text x="38" y="-25" fontFamily="Manrope Variable, sans-serif" fontSize="6.5" letterSpacing="1.5" fill="rgb(242 237 227 / 0.6)">
          LEVEL 52
        </text>
      </g>
      <text x="16" y="286" fontFamily="Manrope Variable, sans-serif" fontSize="6.5" letterSpacing="1.5" fill="rgb(242 237 227 / 0.4)">
        ILLUSTRATIVE · NOT TO SCALE
      </text>
    </svg>
  )
}

export function Visit() {
  return (
    <section id="visit" className="visit" aria-labelledby="visit-title" tabIndex={-1}>
      <div className="container visit__grid">
        <div className="visit__info">
          <Reveal className="visit__label">
            <span className="eyebrow">Visit Us</span>
          </Reveal>
          <h2 id="visit-title" className="h2 visit__title">
            <LineReveal lines={['Find Us', <em key="m">Above Makati.</em>]} />
          </h2>

          <Reveal delay={0.1}>
            <address className="visit__address">
              <span>{venue.floor}, {venue.building}</span>
              <span>{venue.street}</span>
              <span>{venue.city}</span>
            </address>
          </Reveal>

          <div className="visit__cols">
            <Reveal className="visit__block" delay={0.15}>
              <h3 className="visit__block-title">Hours</h3>
              <dl className="visit__hours">
                {venue.hours.map((row) => (
                  <div key={row.days}>
                    <dt>{row.days}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="visit__note">{venue.kitchen}</p>
            </Reveal>
            <Reveal className="visit__block" delay={0.2}>
              <h3 className="visit__block-title">Contact</h3>
              <ul className="visit__contact">
                <li>
                  <a href={venue.phoneHref}>{venue.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${venue.email}`}>{venue.email}</a>
                </li>
              </ul>
              <p className="visit__note">Private dining &amp; events by enquiry</p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="visit__actions">
            <a className="btn btn--dark" href={venue.directionsHref} target="_blank" rel="noreferrer noopener">
              Get Directions
              <Arrow />
              <span className="sr-only">(opens Google Maps in a new tab)</span>
            </a>
          </Reveal>

          <p className="visit__disclaimer">
            LAVÈRE is a fictional concept. The building, phone number and email above are placeholders — directions
            point to Ayala Avenue for illustration only.
          </p>
        </div>

        <div className="visit__visual">
          <ParallaxImage
            className="visit__photo"
            name="makati"
            speed={0.1}
            sizes="(max-width: 1080px) 92vw, 50vw"
            alt="The Makati skyline lit up at night beneath low clouds"
          />
          <Reveal className="visit__map" y={60} delay={0.2}>
            <MapIllustration />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
