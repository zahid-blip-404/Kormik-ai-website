import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

/** Tab content swap — used in AudienceSwitcher */
export const tabSwitch: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

/** Ambient glow orbs and live dot — looping */
export const glowPulse: Variants = {
  hidden:  { scale: 1,    opacity: 0.6 },
  visible: {
    scale:   [1, 1.08, 1],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
  },
}

/** Card hover lift */
export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 2px 8px rgba(0,0,0,0.3)' },
  hover: { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.5)', transition: { duration: 0.2, ease: 'easeOut' as const } },
}

/** Navbar fade down on mount */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
