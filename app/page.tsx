import PastorBiography from "@/components/biography/PastorBiography";
import Masthead from "@/components/masthead/Masthead";
import ServicesPreview from "@/components/servicespreview/ServicesPreview";


 const Home = () => {
  return (
    <div className="snap_container">
      
      <section 
       className="snap_item"
       id='mastHead'
      >
        <Masthead />
      </section>

      <section
       className="snap_item"
       id="pastorBiography"
      >
        <PastorBiography />
      </section>

      <section 
       className="snap_item"
       id="servicesPreview"
      >
        <ServicesPreview />
      </section>
    </div>
  );
}


export default Home