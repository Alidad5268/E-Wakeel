import { Link } from "react-router-dom";
import heroBg from "../../../assets/images/heroBg.jpg";

const HeroSection = () => {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center -z-50"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-medium mt-48 sm:mt-60">
            Simplifying Legal Information for{" "}
            <span className="font-playfair">Everyone.</span>
          </h1>
          <p className="mt-4">
            Get personalized legal advice, court updates, document management,
            and more.
          </p>
          <div className="flex justify-center flex-wrap sm:flex-nowrap gap-8 sm:gap-24 lg:gap-48 mt-16 md:mt-32">
            <Link to="/legal-consultation" className="">Legal Consultation →</Link>
            <Link to="/document-management" className="">Manage Your Legal Documents →</Link>
            <Link to="/advocate-services" className="">Find an Advocate →</Link>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-2 mt-28">
          <span className="font-extralight">Powered by AI Chatbot</span>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
