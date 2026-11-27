import { fullMenu, formatPHP } from '../data/content'
import { useModalDialog } from '../hooks/useModalDialog'
import { Wordmark } from './Nav'
import './FullMenu.css'

export function FullMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useModalDialog(open, onClose)

  return (
    <dialog
      ref={ref}
      className="full-menu"
      aria-labelledby="full-menu-title"
      onClick={(event) => {
        // Clicking the backdrop (outside the panel) closes the drawer.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="full-menu__panel">
        <div className="full-menu__top">
          <Wordmark />
          <button type="button" className="full-menu__close" onClick={onClose}>
            Close<span className="sr-only"> menu</span>
            <span className="menu-overlay__x" aria-hidden="true" />
          </button>
        </div>

        <p className="eyebrow">À la carte · Evening</p>
        <h2 id="full-menu-title" className="full-menu__title">
          The <em>Menu</em>
        </h2>

        {fullMenu.map((section) => (
          <section className="full-menu__section" key={section.label} aria-label={section.label}>
            <h3 className="full-menu__section-title">{section.label}</h3>
            <ul>
              {section.items.map((item) => (
                <li className="full-menu__item" key={item.name}>
                  <div className="full-menu__line">
                    <span className="full-menu__name">{item.name}</span>
                    <span className="full-menu__leader" aria-hidden="true" />
                    <span className="full-menu__price">{formatPHP(item.price)}</span>
                  </div>
                  <p className="full-menu__desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="full-menu__note">
          LAVÈRE is a fictional concept created for a design portfolio. Dishes and prices are illustrative only.
        </p>
      </div>
    </dialog>
  )
}
