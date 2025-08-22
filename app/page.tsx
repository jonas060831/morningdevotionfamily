import PastorBiography from "@/components/biography/PastorBiography";
import DidYouKnow from "@/components/didYouKnow/DidYouKnow";
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
        <MapSinglePointComponent
         latitude={33.82496}
         longitude={-118.26407}
         zoom={15}
         animationDuration={60}
         controls={<UpDownControls/>}
        />

      </section>

      <section
       className="snapItem"
       id="didYouKnow"
      >
        <DidYouKnow />
      </section>
    </div>
  );
}


export default Home