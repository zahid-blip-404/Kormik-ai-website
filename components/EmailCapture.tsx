'use client'

import { useState } from 'react'
import { Button } from './ui/Button'

export function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-xl px-6 py-4 max-w-[440px] mx-auto text-center">
        <p className="font-body text-sm text-success font-semibold">
          ✓ You&apos;re on the list. We&apos;ll notify you.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
      className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 bg-bg-2 border border-border rounded-[8px] px-4 py-3 font-body text-sm text-white placeholder:text-text-muted focus:border-brand focus:outline-none transition-colors"
      />
      <Button variant="primary" size="md" type="submit">
        Notify me
      </Button>
    </form>
  )
}
