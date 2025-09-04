
import styles from './OurStoryPage1.module.css'
import SubTitleAndDescription from '../subTitleAndDescription/SubTitleAndDescription'
import ourStoryData from '@/public/datas/ourStoryData'

const OurStoryPage1 = () => {
  
  return (
    <div
     className="gradientContainer"
    >
        <div
         className={styles.container}
        >
        
        <div style={{ textAlign: 'left', gap: '2rem', display: 'flex', flexDirection: 'column' }}>

            {
                ourStoryData.slice(0,2).map((data:any, idx: number) =>
                 <SubTitleAndDescription
                  key={idx}
                  subTitle={data.subTitle}
                  subTitleFontSize={2}
                  description={data.description}
                  descriptionFontSize={1.2}
                 />
                )
            }
            
        </div>

        </div>
    </div>
  )
}

export default OurStoryPage1