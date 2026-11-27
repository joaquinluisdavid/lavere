import { navLinks, venue, type SectionId } from '../data/content'
import { scrollToSection } from '../lib/scroll'
import { Wordmark } from './Nav'
import './Footer.css'

export function Footer() {
  const go = (id: SectionId) => (event: React.MouseEvent) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark />
            <p className="footer__tagline">{venue.tagline}</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h2 className="footer__heading">Explore</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={go(link.id)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#visit" onClick={go('visit')}>
                  Visit Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">Contact</h2>
            <ul>
              <li>
                {venue.floor}, {venue.street}
              </li>
              <li>{venue.city}</li>
              <li>
                <a href={venue.phoneHref}>{venue.phone}</a>
              </li>
              <li>
                <a href={`mailto:${venue.email}`}>{venue.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Hours</h2>
            <ul>
              {venue.hours.map((row) => (
                <li key={row.days}>
                  <span className="footer__muted">{row.days}</span>
                  <br />
                  {row.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">Follow</h2>
            <ul>
              {venue.socials.map((social) => (
                <li key={social.label}>
                  <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${social.label} (placeholder link)`}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__giant" aria-hidden="true">
          LAV<span>È</span>RE
        </p>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} LAVÈRE. A fictional hospitality concept created for a design portfolio.</p>
          <p>Photography via Unsplash.</p>
          <a href="#home" className="footer__top-link" onClick={go('home')}>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
