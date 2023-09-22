import { PropsWithChildren } from 'react'

import { Variants, m as motion, useReducedMotion } from 'framer-motion'

interface ScaleProps extends PropsWithChildren {
  delay?: number
  duration?: number
  hoverDuration?: number
  scaleInitial?: number
  scaleFinal?: number
  withHover?: boolean
  triggerOnce?: boolean
  inline?: boolean
}

const Scale: React.FC<ScaleProps> = ({
  delay = 0,
  duration = 0.8,
  hoverDuration = 0.8,
  scaleInitial = 0.8,
  scaleFinal = 1,
  withHover = false,
  triggerOnce = true,
  inline,
  children,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden: { scale: scaleInitial },
    visible: {
      scale: scaleFinal,
      transition: {
        delay,
        duration,
        ease: [0.185, -0.01, 0, 1],
      },
    },
    hover: {
      scale: withHover ? scaleInitial : scaleFinal,
      transition: {
        duration: hoverDuration,
        delay: 0,
        ease: [0.185, -0.01, 0, 1],
      },
    },
  }

  const commonProps = prefersReducedMotion
    ? {}
    : {
        variants,
        initial: 'hidden',
        whileInView: 'visible',
        whileHover: 'hover',
        viewport: { once: triggerOnce },
      }

  return inline ? (
    <motion.span className="inline-block" {...commonProps}>
      {children}
    </motion.span>
  ) : (
    <motion.div {...commonProps}>{children}</motion.div>
  )
}

export default Scale
