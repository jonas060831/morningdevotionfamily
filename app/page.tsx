import PastorBiography from "@/components/biography/PastorBiography";
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

      
    </div>
  );
}


export default Home