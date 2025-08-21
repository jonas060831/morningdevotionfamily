import Image from 'next/image'
import React, { FC, ReactNode } from 'react'

import styles from './ContainerWithBorder.module.css'

type ContainerWithBorderProps = {
    children: ReactNode
}

const ContainerWithBorder:FC<ContainerWithBorderProps> = ({ children }) => {
  return (
    <div className={styles.container}>

        <div className={styles.topLeft}>
            <Image
            src="/assets/images/borders/btl.png"
            alt="top left border"
            fill
            style={{ 
                objectFit: "contain",
                pointerEvents: "none",
                outline: "none"
            }}
            />
        </div>


        
        {children}


        <div className={styles.bottomRight}>

            <Image
            src="/assets/images/borders/bbr.png"
            alt="bottom right border"
            fill
            style={{ 
                objectFit: "contain",
                pointerEvents: "none",
                outline: "none"
            }}
            />
        </div>



    </div>
  )
}

export default ContainerWithBorder