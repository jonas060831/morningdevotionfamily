import React, { FC } from 'react'

import styles from './TitleAndDescription.module.css'

type TitleAndDescriptionProps = {
    title?: string
    titleFontSize: number
    description?: string
    descriptionFontSize: number
}

const TitleAndDescription:FC<TitleAndDescriptionProps> = ({
     title='Title',
     description='Description',
     titleFontSize=3,
     descriptionFontSize=1
    }) => {
  return (
    <div>
        <h1 className={styles.title} style={{ fontSize: `${titleFontSize}rem` }} >{title}</h1>

        <p className={styles.description} style={{ fontSize: `${descriptionFontSize}rem` }} >{description}</p>
    </div>
  )
}

export default TitleAndDescription