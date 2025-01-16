import { motion } from "framer-motion";
import TextSection from "../../assets/components/TextSection";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const textSectionVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const formSectionVariants = {
    hidden: { opacity: 100, x: -680 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="w-screen h-screen bg-[#E9F0F7] flex overflow-hidden">
      <motion.div
        className="w-1/2 h-full p-[5%] justify-center items-center hidden md:flex"
        variants={textSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <TextSection
          heading="Welcome Back to E-Wakeel"
          paragraph="Access your legal resources and personalized support with ease. Whether you need legal advice, document management, or court notifications, you're just a step away."
          bullets={[
            "• Get instant legal consultation anytime.",
            "• Stay updated with real-time court alerts.",
            "• Safely manage and organize all your legal documents.",
            "• Connect with experienced advocates for expert legal help.",
          ]}
          signup={false}
        />
      </motion.div>

      <motion.div
        className="bg-white h-full w-full md:w-1/2 md:rounded-l-[80px]"
        variants={formSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
