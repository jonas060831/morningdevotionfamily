import Footer from '@/components/footer/Footer'
import OurStoryPage1 from '@/components/ourstory/OurStoryPage1'
import OurStoryPage2 from '@/components/ourstory/OurStoryPage2'
import SubTitleAndDescription from '@/components/subTitleAndDescription/SubTitleAndDescription'
import React from 'react'

const Roots = () => {
  return (
    <div
     className="snapContainer"
    >
        <section
         className="snapItem"
         id="roots"
        >
          <OurStoryPage1 />
        </section>

        <section
         className="snapItem"
         id="roots2"
        >
          <OurStoryPage2 />
        </section>

        <section
         className="snapItem"
         id="lookingForward"
         style={{ backgroundImage: "linear-gradient(to bottom right,grey,white, darkblue)" }}
        >
            <div
             style={{ width: '80vw', color: 'black', padding: '1rem', borderRadius: '1rem',  }}
            >
                <SubTitleAndDescription
                subTitle='Looking Forward'
                subTitleFontSize={3}
                description="&nbsp;&nbsp;&nbsp;&nbsp;As we continue to grow in our devotion to Christ, we look forward to the ways God will use our ministry in the days ahead. Our story is still being written, and we invite you to become part of it. Join us as we live out our calling to be truly devoted to Christ, impacting lives locally and globally for His glory."
                descriptionFontSize={1.5}
                />
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

export default Roots