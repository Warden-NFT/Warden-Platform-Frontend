import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: JSX.Element | JSX.Element[]
}

export default function AnimateWhenInView({ children }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref}>
      <motion.div
        key={3}
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.3,
          type: 'spring',
          bounce: 0.4
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}
