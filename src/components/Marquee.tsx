import './Marquee.css'

const words = ['Dine', 'Drink', 'Linger', 'Above the Ordinary']

/** Slow typographic ribbon used as a breathing transition between sections. */
export function Marquee() {
  const run = (hidden: boolean) => (
    <span className="marquee__run" aria-hidden={hidden || undefined}>
      {words.map((word) => (
        <span key={word} className="marquee__word">
          {word}
          <span className="marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </span>
  )

  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        {run(true)}
        {run(true)}
      </div>
    </div>
  )
}
