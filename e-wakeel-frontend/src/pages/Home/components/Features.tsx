import Feature from "../../../assets/components/Feature";
import img1 from "../../../assets/images/img1.jpg";
import img2 from "../../../assets/images/img2.jpg";
import img3 from "../../../assets/images/img3.jpg";
import img4 from "../../../assets/images/img4.jpg";
import img5 from "../../../assets/images/img5.jpg";

const featuresData = [
  {
    heading: "Centralized Legal Information",
    headline: "Simplified Legal Information at Your Fingertips",
    paragraph:
      "Access a vast database of legal provisions, penalties, and procedures simplified into layman's terms. E-Wakeel makes it easy for everyone to understand complex legal jargon, ensuring you are well-informed about your legal rights and responsibilities in Pakistan.",
    image: img1,
    reverse: true,
  },
  {
    heading: "AI-Powered Legal Consultation",
    headline: "Get Personalized Legal Advice Anytime",
    paragraph:
      "Our AI-powered chatbot is designed to answer your legal questions instantly. Whether it's understanding a specific section of the law or figuring out the required documentation for your case, our AI provides accurate and personalized advice based on your input.",
    image: img2,
    reverse: false,
  },
  {
    heading: "Court Alerts & Notifications",
    headline: "Stay Updated with Court Dates & Alerts",
    paragraph:
      "Never miss a court date with our real-time alert system. E-Wakeel keeps you updated with court hearings, judge assignments, and case statuses, ensuring you’re always prepared and informed about your legal proceedings.",
    image: img3,
    reverse: true,
  },
  {
    heading: "Document Management",
    headline: "Organize and Manage Your Legal Documents",
    paragraph:
      "Store, access, and manage all your legal documents in one place. E-Wakeel’s secure document management system ensures easy storage and retrieval of contracts, court papers, legal notices, and more.",
    image: img4,
    reverse: false,
  },
  {
    heading: "Advocate Communication",
    headline: "Connect with Verified Advocates",
    paragraph:
      "Easily find and communicate with verified legal advocates through our platform. Post your legal needs, receive bids from qualified lawyers, and choose the best legal services tailored to your case.",
    image: img5,
    reverse: true,
  },
];

const Features = () => {
  return (
    <div>
      <h1 className="text-[#E74C3C] text-3xl font-semibold my-10">
        Key Features
      </h1>
      {featuresData.map((feature) => (
        <Feature
          heading={feature.heading}
          headline={feature.headline}
          paragraph={feature.paragraph}
          image={feature.image}
          reverse={feature.reverse}
        />
      ))}
    </div>
  );
};

export default Features;
