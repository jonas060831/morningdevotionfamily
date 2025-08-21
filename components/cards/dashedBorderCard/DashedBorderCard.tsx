import React, { FC, ReactNode } from 'react'

import styles from './DashedBorderCard.module.css'

type DashedBorderCardProps = {
  children: ReactNode
}

const DashedBorderCard:FC<DashedBorderCardProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default DashedBorderCard