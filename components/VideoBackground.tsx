'use client'

import { useReducedMotion } from 'framer-motion'

interface VideoBackgroundProps {
  src: string
  poster: string
  overlayOpacity?: number
  bottomFadeColor?: string
  gridTexture?: boolean
}

export function VideoBackground({
  src,
  poster,
  overlayOpacity = 0.55,
  bottomFadeColor = '#050505',
  gridTexture = true,
}: VideoBackgroundProps) {
  const shouldReduce = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video or static poster */}
      {shouldReduce ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Base darken overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Ambient orange glow — centre top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,92,26,0.09) 0%, transparent 60%)',
        }}
      />

      {/* Grid texture */}
      {gridTexture && (
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-70" />
      )}

      {/* Bottom fade to bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${bottomFadeColor})`,
        }}
      />
    </div>
  )
}
