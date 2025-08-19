import React, { FC, ReactNode } from 'react'

import styles from './OutlineButton.module.css'

type OutlineButtonProps = {
  children: ReactNode;
  color?: 'black' | 'white'
  onClick: () => void
}

const OutlineButton:FC<OutlineButtonProps> = ({ color='black', children='Button', onClick }) => {
  return (
    <button
     className={color === 'black' ? styles.black : styles.white}
     onClick={onClick}
    >
        {children}
    </button>
  )
}

export default OutlineButton