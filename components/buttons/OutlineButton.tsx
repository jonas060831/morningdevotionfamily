import React, { FC, ReactNode } from 'react'
import { motion } from "motion/react"

import styles from './OutlineButton.module.css'

type OutlineButtonProps = {
  children: ReactNode;
  color?: 'black' | 'white'
  onClick: () => void
}

const OutlineButton:FC<OutlineButtonProps> = ({ color='black', children='Button', onClick }) => {
  return (

    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      // onHoverStart={() => console.log('hover started!')}
      className={color === 'black' ? styles.black : styles.white}
      onClick={onClick}
    >
      {children}
    </motion.button>

  )
}

export default OutlineButton