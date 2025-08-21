import React, { FC } from 'react'

import styles from './SquareCard.module.css'

type SquareCardProps = {
    icon: string
    title: string
    description: string
}

const SquareCard:FC<SquareCardProps> = ({ icon='⭐️⭐️⭐️', title='3 Stars', description='3 star review' }) => {
  return (
    <div className={styles.card}>

        <span className={styles.span}>{icon}</span>

        <p className={styles.h1}>{title}</p>

        <p className={styles.p}>{description}</p>
    </div>
  )
}

export default SquareCard