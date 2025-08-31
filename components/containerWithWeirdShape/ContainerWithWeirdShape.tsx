import React, { FC, ReactNode } from 'react'


import styles from './ContainerWithWeirdShape.module.css'

type ContainerWithWeirdShapeProps = {
    children: ReactNode;
}

const ContainerWithWeirdShape:FC<ContainerWithWeirdShapeProps> = ({ children }) => {
  return (
    <div
     className={styles.container}
    >
        {children}
    </div>
  )
}

export default ContainerWithWeirdShape