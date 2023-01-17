import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  children?: JSX.Element[] | JSX.Element
}

function FadeEntrance({ children }: Props) {
  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      {children && { ...children }}
    </motion.div>
  )
}

export default FadeEntrance
