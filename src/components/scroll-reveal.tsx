"use client"

import type { HTMLMotionProps, Variants } from "framer-motion"
import { motion, useReducedMotion } from "framer-motion"
import { forwardRef, type ReactNode } from "react"

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 56,
    scale: 0.98,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

type ScrollRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode
  delay?: number
}

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, delay = 0, transition, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -12% 0px" }}
      transition={{ delay, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  )
  }
)

ScrollReveal.displayName = "ScrollReveal"

type ScrollStaggerProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode
}

export const ScrollStagger = ({ children, ...props }: ScrollStaggerProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <motion.div {...props}>{children}</motion.div>
  }

  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -10% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type ScrollStaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode
}

export const ScrollStaggerItem = ({
  children,
  ...props
}: ScrollStaggerItemProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <motion.div {...props}>{children}</motion.div>
  }

  return (
    <motion.div variants={childVariants} {...props}>
      {children}
    </motion.div>
  )
}
