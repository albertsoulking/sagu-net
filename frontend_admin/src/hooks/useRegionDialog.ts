import { useEffect, useState } from 'react'

export function useRegionDialog() {
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return {
    open,
    saving,
    setOpen,
    setSaving,
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
  }
}
