import PastorBiography from "@/components/biography/PastorBiography";
import MapSinglePointComponent from "@/components/maps/MapSinglePointComponent";
import UpDownControls from "@/components/maps/UpDownControls";
import Masthead from "@/components/masthead/Masthead";
import ServicesPreview from "@/components/servicespreview/ServicesPreview";


 const Home = () => {
  return (
    <div className="snapContainer">
      
      <section 
       className="snapItem"
       id='mastHead'
      >
        <Masthead />
      </section>

      <section
       className="snapItem"
       id="pastorBiography"
      >
        <PastorBiography />
      </section>

      <section 
       className="snapItem"
       id="servicesPreview"
      >
        <ServicesPreview />
      </section>

      <section
       className="snapItem"
       id="ChurchLocation"
      >

        {/* lat 33.82496 long -118.26407 */}
        <MapSinglePointComponent latitude={33.82496} longitude={-118.26407} zoom={14} controls={<UpDownControls/>}/>

      </section>
    </div>
  );
}


export default Home