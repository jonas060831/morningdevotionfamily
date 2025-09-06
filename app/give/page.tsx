import Footer from '@/components/footer/Footer'
import GiveToggle from '@/components/give/GiveToggle'
import Jumbotron from '@/components/jumbotron/Jumbotron'
import React from 'react'



const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY

const Give = () => {
  return (
    <div
     className="snapContainer"
    >
        <section
         className="snapItem"
         id="encourage"
        >
            <Jumbotron />
        </section>

        <section
         className="snapItem"
         id="giveForm"
        >
            <div
             className='gradientContainer'
            >
                <GiveToggle stripePublishableKey={stripePublishableKey!}/>
            </div>
        </section>


        <section
        className="snapItemFooter"
        id="footer"
        >
          <Footer/>
        </section>
    </div>
  )
}

export default Give