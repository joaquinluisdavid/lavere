export type ReservationForm = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  requests: string
}

export type ReservationErrors = Partial<Record<keyof ReservationForm, string>>

export const emptyReservation: ReservationForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  requests: '',
}

export const REQUESTS_MAX = 300
export const BOOKING_WINDOW_DAYS = 90

/** Seatings every 30 minutes from 5:00 PM to 11:00 PM. */
export const timeSlots = Array.from({ length: 13 }, (_, i) => {
  const minutes = 17 * 60 + i * 30
  const h24 = Math.floor(minutes / 60)
  const m = minutes % 60
  const value = `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  const label = `${h24 - 12}:${String(m).padStart(2, '0')} PM`
  return { value, label }
})

export const guestOptions = Array.from({ length: 8 }, (_, i) => String(i + 1))

export function toISODate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function bookingBounds(now = new Date()) {
  const max = new Date(now)
  max.setDate(max.getDate() + BOOKING_WINDOW_DAYS)
  return { min: toISODate(now), max: toISODate(max) }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Philippine mobile (09XX / +639XX) or Metro Manila landline (02 / +632) numbers.
const PH_PHONE = /^(?:(?:\+?63|0)9\d{9}|(?:\+?63|0)2\d{8})$/

export function validateField(field: keyof ReservationForm, form: ReservationForm, now = new Date()): string | undefined {
  const value = form[field].trim()
  switch (field) {
    case 'name':
      if (!value) return 'Please enter the name for the reservation.'
      if (value.length < 2) return 'Name should be at least 2 characters.'
      if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(value)) return 'Please use letters only.'
      return
    case 'email':
      if (!value) return 'Please enter your email address.'
      if (!EMAIL.test(value)) return 'Please enter a valid email, e.g. name@example.com.'
      return
    case 'phone': {
      if (!value) return 'Please enter a contact number.'
      const digits = value.replace(/[\s()-]/g, '')
      if (!PH_PHONE.test(digits)) return 'Enter a valid Philippine number, e.g. 0917 123 4567.'
      return
    }
    case 'date': {
      if (!value) return 'Please choose a date.'
      const { min, max } = bookingBounds(now)
      if (value < min) return 'That date has passed — please choose another.'
      if (value > max) return `We accept reservations up to ${BOOKING_WINDOW_DAYS} days ahead.`
      return
    }
    case 'time': {
      if (!value) return 'Please choose a preferred time.'
      if (form.date === toISODate(now)) {
        const [h, m] = value.split(':').map(Number)
        const slot = new Date(now)
        slot.setHours(h, m, 0, 0)
        if (slot.getTime() - now.getTime() < 60 * 60 * 1000) return 'Same-day bookings need at least an hour’s notice.'
      }
      return
    }
    case 'guests':
      if (!guestOptions.includes(value)) return 'Please select the number of guests.'
      return
    case 'requests':
      if (value.length > REQUESTS_MAX) return `Please keep requests under ${REQUESTS_MAX} characters.`
      return
  }
}

export function validateReservation(form: ReservationForm, now = new Date()): ReservationErrors {
  const errors: ReservationErrors = {}
  for (const field of Object.keys(form) as (keyof ReservationForm)[]) {
    const message = validateField(field, form, now)
    if (message) errors[field] = message
  }
  return errors
}

/** Stand-in for a booking API — resolves with a mock confirmation reference. */
export function submitReservation(form: ReservationForm): Promise<{ reference: string }> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const seed = `${form.date}${form.time}${form.email}`.length * 7919 + Date.now()
      resolve({ reference: `LV-${(seed % 0xfffff).toString(36).toUpperCase().padStart(4, '0')}` })
    }, 1400)
  })
}
