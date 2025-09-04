"use client"
import React, { useState } from 'react'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'

import styles from './ServicesList.module.css'

import servicesData from '@/public/datas/servicesData'
import SquareCard from '../cards/squareCard/SquareCard'

const ServicesList = () => {

  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div
     className="gradientContainer"
    >

      <div className={styles.header}>
        <TitleAndDescription
       title='Serving Our Community'
       description="We offer a full range of ministry services designed to nurture spiritual growth, strengthen relationships, and celebrate life's most meaningful moments. Each service is delivered with care, compassion, and biblical foundation."
       titleFontSize={2.5}
       descriptionFontSize={1}
      />
      </div>

      <div
       className={styles.list}
       style={{ cursor: isGrabbing ? "grabbing" : "grab" }}
       onMouseDown={() => setIsGrabbing(true)}
       onMouseUp={() => setIsGrabbing(false)}
       onMouseLeave={() => setIsGrabbing(false)}
      >

        {
          servicesData.map((service, idx) =>
            <SquareCard
             key={idx}
             icon={service.icon}
             title={service.title}
             description={service.description}
            />
          )
        }

      </div>
        
    </div>
  )
}

export default ServicesList