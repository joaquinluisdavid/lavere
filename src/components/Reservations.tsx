import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { venue } from '../data/content'
import { EASE } from '../lib/motion'
import {
  REQUESTS_MAX,
  bookingBounds,
  emptyReservation,
  guestOptions,
  submitReservation,
  timeSlots,
  validateField,
  validateReservation,
  type ReservationErrors,
  type ReservationForm,
} from '../lib/reservation'
import { Arrow } from './ui/Arrow'
import { LineReveal } from './ui/LineReveal'
import { ParallaxImage } from './ui/ParallaxImage'
import { Reveal } from './ui/Reveal'
import './Reservations.css'

type Status = 'idle' | 'submitting' | 'success'
type Field = keyof ReservationForm

const policies = [
  { term: 'Dress code', detail: 'Smart elegant. No sportswear or beachwear after 6:00 PM.' },
  { term: 'Arrival', detail: 'Tables are held for 15 minutes past your reservation time.' },
  { term: 'The Terrace', detail: 'Outdoor seating is subject to weather and allocated on arrival.' },
  { term: 'Parties of 9+', detail: 'Our events team curates private dining for larger groups.' },
]

function FieldShell({
  id,
  label,
  error,
  hint,
  className = '',
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      {children}
      <div className="field__meta">
        {error ? (
          <p id={`${id}-error`} className="field__error">
            {error}
          </p>
        ) : (
          hint
        )}
      </div>
    </div>
  )
}

export function Reservations() {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const returningRef = useRef(false)
  const [form, setForm] = useState<ReservationForm>(emptyReservation)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [reference, setReference] = useState('')
  const [announcement, setAnnouncement] = useState('')
  const bounds = bookingBounds()

  const id = (field: Field) => `${uid}-${field}`

  const update = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field
    const next = { ...form, [field]: event.target.value }
    setForm(next)
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }))
    }
    // Changing the date can invalidate (or fix) a previously chosen same-day time.
    if (field === 'date' && touched.time) {
      setErrors((prev) => ({ ...prev, time: validateField('time', next) }))
    }
  }

  const blur = (event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, form) }))
  }

  const describedBy = (field: Field, hint = false) =>
    errors[field] ? `${id(field)}-error` : hint ? `${id(field)}-hint` : undefined

  const control = (field: Field, hint = false) => ({
    id: id(field),
    name: field,
    value: form[field],
    onChange: update,
    onBlur: blur,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(field, hint),
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === 'submitting') return
    const found = validateReservation(form)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, date: true, time: true, guests: true, requests: true })

    const invalid = Object.keys(found) as Field[]
    if (invalid.length) {
      setAnnouncement(`Please review ${invalid.length} field${invalid.length > 1 ? 's' : ''} before continuing.`)
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus()
      return
    }

    setAnnouncement('Sending your request…')
    setStatus('submitting')
    const result = await submitReservation(form)
    setReference(result.reference)
    setStatus('success')
    setAnnouncement(`Request received. Reference ${result.reference}.`)
  }

  const reset = () => {
    returningRef.current = true
    setForm(emptyReservation)
    setErrors({})
    setTouched({})
    setStatus('idle')
    setAnnouncement('')
  }

  const focusSuccess = () => successRef.current?.focus()
  const focusFormStart = () => {
    if (!returningRef.current) return
    returningRef.current = false
    formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus({ preventScroll: true })
  }

  const slotLabel = timeSlots.find((s) => s.value === form.time)?.label
  const dateLabel = form.date
    ? new Date(`${form.date}T00:00`).toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' })
    : ''

  return (
    <section id="reservations" className="reservations" aria-labelledby="reservations-title" tabIndex={-1}>
      <ParallaxImage
        className="reservations__bg"
        name="diningroom"
        alt=""
        speed={0.12}
        reveal={false}
        sizes="100vw"
      />
      <div className="reservations__shade" aria-hidden="true" />

      <div className="container reservations__grid">
        <div className="reservations__intro">
          <Reveal className="reservations__label">
            <span className="eyebrow">Reservations</span>
          </Reveal>
          <h2 id="reservations-title" className="h2">
            <LineReveal lines={['Reserve', <em key="e">Your Evening.</em>]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="reservations__lede muted">
              Request a table for dinner, cocktails or the terrace. Our host team will confirm your seating by email
              within the day.
            </p>
          </Reveal>
          <dl className="reservations__policies">
            {policies.map((policy, i) => (
              <Reveal className="reservations__policy" key={policy.term} delay={0.05 * i}>
                <dt>{policy.term}</dt>
                <dd>{policy.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="reservations__panel" y={60}>
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            {status !== 'success' ? (
              <motion.form
                key="form"
                ref={formRef}
                className="res-form"
                noValidate
                onSubmit={handleSubmit}
                aria-busy={status === 'submitting'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE }}
                onAnimationComplete={focusFormStart}
              >
                <div className="res-form__head">
                  <p className="res-form__title">Table request</p>
                  <p className="res-form__required">All fields required unless noted</p>
                </div>

                <fieldset className="res-form__group" disabled={status === 'submitting'}>
                  <legend className="sr-only">Your details</legend>
                  <FieldShell id={id('name')} label="Guest name" error={errors.name} className="span-2">
                    <input type="text" autoComplete="name" placeholder="Full name" {...control('name')} />
                  </FieldShell>
                  <FieldShell id={id('email')} label="Email address" error={errors.email}>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...control('email')} />
                  </FieldShell>
                  <FieldShell
                    id={id('phone')}
                    label="Contact number"
                    error={errors.phone}
                    hint={<p id={`${id('phone')}-hint`} className="field__hint">Mobile or Metro Manila landline</p>}
                  >
                    <input type="tel" autoComplete="tel" inputMode="tel" placeholder="0917 123 4567" {...control('phone', true)} />
                  </FieldShell>
                </fieldset>

                <fieldset className="res-form__group res-form__group--3" disabled={status === 'submitting'}>
                  <legend className="sr-only">Your visit</legend>
                  <FieldShell id={id('date')} label="Date" error={errors.date}>
                    <input type="date" min={bounds.min} max={bounds.max} {...control('date')} />
                  </FieldShell>
                  <FieldShell id={id('time')} label="Preferred time" error={errors.time}>
                    <select {...control('time')}>
                      <option value="" disabled>
                        Select
                      </option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                  <FieldShell id={id('guests')} label="Guests" error={errors.guests}>
                    <select {...control('guests')}>
                      {guestOptions.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === '1' ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                </fieldset>

                <fieldset className="res-form__group" disabled={status === 'submitting'}>
                  <legend className="sr-only">Special requests</legend>
                  <FieldShell
                    id={id('requests')}
                    label="Special requests (optional)"
                    error={errors.requests}
                    className="span-2"
                    hint={
                      <p id={`${id('requests')}-hint`} className="field__hint field__hint--count">
                        Celebrations, dietary needs, seating preferences
                        <span aria-hidden="true">
                          {form.requests.length}/{REQUESTS_MAX}
                        </span>
                      </p>
                    }
                  >
                    <textarea rows={3} maxLength={REQUESTS_MAX + 50} placeholder="Tell us how we can make the evening yours" {...control('requests', true)} />
                  </FieldShell>
                </fieldset>

                <div className="res-form__submit">
                  <button type="submit" className="btn btn--block" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        Sending request
                      </>
                    ) : (
                      <>
                        Request Reservation
                        <Arrow />
                      </>
                    )}
                  </button>
                  <p className="res-form__disclaimer">
                    Portfolio demonstration — submitting this form does not create a real booking or send any data.
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="res-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: EASE }}
                onAnimationComplete={focusSuccess}
              >
                <span className="res-success__mark" aria-hidden="true" />
                <p className="eyebrow eyebrow--plain">Request received</p>
                <h3 className="res-success__title" ref={successRef} tabIndex={-1}>
                  Thank you, <em>{form.name.trim().split(/\s+/)[0]}.</em>
                </h3>
                <p className="muted">
                  We’ve noted your request for {form.guests} {form.guests === '1' ? 'guest' : 'guests'} on {dateLabel}{' '}
                  at {slotLabel}. In a live setting, our host team would now confirm by email at{' '}
                  <strong>{form.email.trim()}</strong>.
                </p>
                <dl className="res-success__ref">
                  <dt>Mock reference</dt>
                  <dd>{reference}</dd>
                </dl>
                <p className="res-form__disclaimer">
                  This is a demo for a fictional venue — no reservation has been made.
                </p>
                <button type="button" className="text-link" onClick={reset}>
                  Make another request
                  <Arrow />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="reservations__alt">
            Prefer to speak with us? <a href={venue.phoneHref}>{venue.phone}</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
