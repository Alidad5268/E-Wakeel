import Footer from "../../assets/components/Footer";
import ConsultationProcess from "./components/ConsultationProcess";
import Features from "./components/Features";
import HeroSection from "./components/HeroSection";

const HomePage = () => {
  return (
    <div>
      <div className="relative h-screen text-white">
        <HeroSection />
      </div>
      <div className="p-10">
        <Features />
        <ConsultationProcess />
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
