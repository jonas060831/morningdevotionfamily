import PastorBiography from "@/components/biography/PastorBiography";
import DidYouKnow from "@/components/didYouKnow/DidYouKnow";
import Footer from "@/components/footer/Footer";
import MapSinglePointComponent from "@/components/maps/MapSinglePointComponent";
import UpDownControls from "@/components/maps/UpDownControls";
import Masthead from "@/components/masthead/Masthead";
import ServicesPreview from "@/components/servicespreview/ServicesPreview";


 const Home = () => {

  const mapboxToken = process.env.MAPBOX_TOKEN
  const mapboxStyle = process.env.MAPBOX_STYLE
  
  const streamIOAPIKey = process.env.STREAM_API_KEY

  return (
    <div className="snapContainer">
      
      <section 
       className="snapItem"
       id='mastHead'
      >
        <Masthead
         streamIOAPIKey={streamIOAPIKey!}
        />
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
       id="didYouKnow"
      >
        <DidYouKnow />
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
         mapboxToken={mapboxToken!}
         mapboxStyle={mapboxStyle!}
        />

      </section>

      <section
       className="snapItemFooter"
       id="footer"
      >
        <Footer/>
      </section>

    </div>
  );
}


export default Home