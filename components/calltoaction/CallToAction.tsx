"use client"
import React from 'react'
import ContainerWithBorder from '../containerWithBorder/ContainerWithBorder'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'

import styles from "./CallToAction.module.css"
import OutlineButton from '../buttons/OutlineButton'
import { useRouter } from 'next/navigation'

const CallToAction = () => {

  const router = useRouter()
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
          onClick={() => router.push('/contacts')}
          >
            Connect With Us
          </OutlineButton>
        </div>

        
    </ContainerWithBorder>
  )
}

export default CallToAction