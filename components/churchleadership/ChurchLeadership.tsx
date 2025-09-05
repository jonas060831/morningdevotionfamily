import React from 'react'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'
import leadershipData from '@/public/datas/leadershipData'
import NameCard from '../cards/nameCard/NameCard'


import styles from './ChurchLeadership.module.css'

const ChurchLeadership = () => {
  return (
    <div className="gradientContainer">

        <span style={{ textAlign: 'center' }}>
          <TitleAndDescription
         title='Church Leadership'
         titleFontSize={3}
         description=''
         descriptionFontSize={0}
        />
        </span>
        <hr style={{ width: '80vw', backgroundColor: 'white', height: '1px', border: 0 }}/>

        <div className={styles.leadershipList}>
          {
            leadershipData.map((leader, indx) => 
             <NameCard
              key={indx}
              name={leader.name}
              title={leader.title}
              email={leader.email}
              phone={leader.phone}
             />
            )
          }
        </div>

    </div>
  )
}

export default ChurchLeadership