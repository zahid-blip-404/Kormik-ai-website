'use client'

import Image from 'next/image'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="Kormik"
        width={140}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </div>
  )
}
