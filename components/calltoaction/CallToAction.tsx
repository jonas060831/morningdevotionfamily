"use client"
import React from 'react'
import ContainerWithBorder from '../containerWithBorder/ContainerWithBorder'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'

import styles from "./CallToAction.module.css"
import OutlineButton from '../buttons/OutlineButton'

const CallToAction = () => {
  return (
    <ContainerWithBorder>

        <div className={styles.container}>
          <TitleAndDescription
            title='Ready to Get Involved?'
            titleFontSize={6}
            description='Contact us to learn more about any of our services or to schedule an appointment with our pastoral team.'
            descriptionFontSize={2.5}
          />

          <OutlineButton
          onClick={() => {}}
          >
            Connect With Us
          </OutlineButton>
        </div>

        
    </ContainerWithBorder>
  )
}

export default CallToAction