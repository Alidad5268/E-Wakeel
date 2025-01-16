import { motion } from "framer-motion";

interface Feature {
  heading: string;
  headline: string;
  paragraph: string;
  image: string;
  reverse: boolean;
}

const Feature: React.FC<Feature> = ({
  heading,
  headline,
  paragraph,
  image,
  reverse = false,
}) => {
  return (
    <motion.div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center my-8 md:mx-8`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="md:w-1/2 flex justify-center">
        <img src={image} alt="Section illustration" className="rounded-lg" />
      </div>
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-2">{heading}</h2>
        <p className="text-gray-700 mb-2">{headline}</p>
        <p className="text-gray-700">{paragraph}</p>
      </div>
    </motion.div>
  );
};

export default Feature;
