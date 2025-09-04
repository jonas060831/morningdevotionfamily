import React, { FC } from 'react'

import styles from './Avatar.module.css'

type AvatarProps = {
    icon: string
    header: string
    details: string
}

const Avatar:FC<AvatarProps> = ({ icon, header, details }) => {
  return (
    <div
     className={styles.container}
    >
        <div
         className={styles.icon}
        >
            {icon}
        </div>

        <div>
            <h1>{header}</h1>
            <p>{details}</p>
        </div>

    </div>
  )
}

export default Avatar