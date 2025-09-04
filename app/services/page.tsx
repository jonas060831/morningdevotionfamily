import Footer from '@/components/footer/Footer'
import ServicesList from '@/components/services/ServicesList'
import React from 'react'

const Services = () => {
  return (
    <div className="snapContainer">


        <section
         className="snapItem"
         id="services"
        >
          <ServicesList />
        </section>

        <section className="snapItem">
            services page 2
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

export default Services