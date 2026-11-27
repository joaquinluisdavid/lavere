import { useEffect, useRef, type RefObject } from 'react'

/**
 * Drives a native <dialog> from React state: opens it modally (focus trap, Esc, inert page)
 * and restores focus to the previously focused element when it closes.
 */
export function useModalDialog(open: boolean, onClose: () => void): RefObject<HTMLDialogElement | null> {
  const ref = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      const previouslyFocused = document.activeElement as HTMLElement | null
      dialog.showModal()
      return () => {
        if (dialog.open) dialog.close()
        previouslyFocused?.focus({ preventScroll: true })
      }
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleCancel = (event: Event) => {
      event.preventDefault()
      onCloseRef.current()
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [])

  return ref
}
