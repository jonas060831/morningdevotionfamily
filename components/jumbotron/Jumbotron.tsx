"use client"
import React from 'react'
import TitleAndDescription from '../titleAndDescription/TitleAndDescription'
import OutlineButton from '../buttons/OutlineButton'

const Jumbotron = () => {


  const handleClick = () => {

    const giveForm = document.getElementById('giveForm')
    
    giveForm?.scrollIntoView({behavior: "smooth"})
  }


  return (
    <div className="gradientContainer" style={{ textAlign: 'center' }}>
        
        

            <TitleAndDescription
             title='Give with Purpose'
             titleFontSize={3}
             description='Your generosity creates lasting change in our community and beyond'
             descriptionFontSize={1}
            />

            <OutlineButton onClick={handleClick} color='white'>
                Start Giving
            </OutlineButton>

    </div>
  )
}

export default Jumbotron