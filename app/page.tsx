import Masthead from "@/components/masthead/Masthead";


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
       id="section2"
      >
        section 2
      </section>
    </div>
  );
}


export default Home