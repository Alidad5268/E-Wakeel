import { motion } from "framer-motion";
import TextSection from "../../assets/components/TextSection";
import SignupForm from "./components/SignupForm";

const Signup = () => {
  const textSectionVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const formSectionVariants = {
    hidden: { opacity: 100, x: 680 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="w-screen h-screen bg-[#FFE9DA] flex overflow-hidden">
      <motion.div
        className="bg-white h-full w-full md:w-1/2 md:rounded-r-[80px] z-10"
        variants={formSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <SignupForm />
      </motion.div>

      <motion.div
        className="w-1/2 h-full p-[5%] justify-center items-center hidden md:flex"
        variants={textSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <TextSection
          heading="Join E-Wakeel Today"
          paragraph="Create your account and gain access to simplified legal information, personalized support, and real-time updates on your legal matters. Our platform is designed to make legal processes easy to understand and manage."
          bullets={[
            "• Simplify complex legal information.",
            "• Get personalized AI-powered legal advice.",
            "• Organize your legal documents in one secure place.",
            "• Connect with verified advocates to represent you.",
          ]}
          signup={true}
        />
      </motion.div>
    </div>
  );
};

export default Signup;
