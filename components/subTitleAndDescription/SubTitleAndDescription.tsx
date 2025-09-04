import React, { FC } from 'react'

import styles from './SubTitleAndDescription.module.css'

type SubTitleAndDescriptionnProps = {
    subTitle?: string
    subTitleFontSize: number
    description?: string
    descriptionFontSize: number
}

const SubTitleAndDescription:FC<SubTitleAndDescriptionnProps> = ({
     subTitle='Title',
     description='Description',
     subTitleFontSize=3,
     descriptionFontSize=1
    }) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title} style={{ fontSize: `${subTitleFontSize}rem` }} >{subTitle}</h1>

        <p className={styles.description} style={{ fontSize: `${descriptionFontSize}rem` }} >{description}</p>
    </div>
  )
}

export default SubTitleAndDescription