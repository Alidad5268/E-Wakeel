import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaQuestionCircle,
} from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "General FAQs",
    items: [
      {
        question: "What is E-Wakeel?",
        answer:
          "E-Wakeel is a comprehensive platform for managing your legal documents, accessing court alerts, and connecting with legal experts.",
      },
      {
        question: "How do I create an account?",
        answer:
          'You can create an account by clicking on the "Sign Up" button and filling in your personal and professional details. Once verified, you will gain full access to our services.',
      },
      {
        question: "Is my personal data secure on E-Wakeel?",
        answer:
          "Yes, your data is fully encrypted and stored in compliance with the highest data security standards. We ensure your documents and personal information remain confidential.",
      },
      {
        question: "What should I do if I forget my password?",
        answer:
          'Click on the "Forgot Password" link on the login page. You’ll receive an email with instructions to reset your password.',
      },
    ],
  },
  {
    title: "Court Alerts FAQs",
    items: [
      {
        question: "What are Court Alerts?",
        answer:
          "Court Alerts notify you of important case updates, including upcoming hearings, verdicts, and official notices from the court.",
      },
      {
        question: "How do I subscribe to Court Alerts for my case?",
        answer:
          "Once you add a case to your profile, you can subscribe to receive real-time notifications for any updates related to your case.",
      },
      {
        question: "Can I customize the types of Court Alerts I receive?",
        answer:
          "Yes, you can customize your alerts by selecting the types of notifications you want to receive (e.g., case hearings, deadlines, or verdicts).",
      },
      {
        question: "How do I stop receiving Court Alerts?",
        answer:
          "You can manage your notification settings from your profile and disable specific alerts or unsubscribe altogether.",
      },
    ],
  },
  {
    title: "Document Management FAQs",
    items: [
      {
        question: "What types of documents can I upload?",
        answer:
          "You can upload a variety of file types including PDFs, Word documents, images (JPG/PNG), and Excel sheets for easy case management.",
      },
      {
        question: "Is there a file size limit for document uploads?",
        answer:
          "Yes, the maximum file size for uploads is 5MB per document. If you have larger files, you may need to compress them or split them into smaller files.",
      },
      {
        question: "How do I categorize my documents?",
        answer:
          "E-Wakeel allows you to categorize your documents by case type, document type (e.g., agreements, affidavits), and status (e.g., active, archived).",
      },
      {
        question: "Can I share documents with my lawyer or clients?",
        answer:
          "Yes, you can securely share documents with your legal team or clients directly through the platform by granting them access.",
      },
    ],
  },
  {
    title: "Legal Services FAQs",
    items: [
      {
        question: "How do I connect with a lawyer through E-Wakeel?",
        answer:
          "You can browse through our directory of legal professionals and request consultations directly through the platform.",
      },
      {
        question: "Are the consultations free?",
        answer:
          "Some lawyers offer free initial consultations, while others may charge for their services. You can view the consultation fees on their profile.",
      },
      {
        question: "Can I track the progress of my case?",
        answer:
          "Yes, you can track your case progress in real-time through the Court Alerts feature and access related documents in the Document Management section.",
      },
      {
        question: "What services does E-Wakeel offer for corporate clients?",
        answer:
          "E-Wakeel offers comprehensive legal solutions for corporate clients, including contract management, compliance tracking, and dispute resolution services.",
      },
    ],
  },
];

const FAQs: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const filteredData = faqData.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 mt-10 min-h-screen">
      <div className="max-w-3xl w-full mt-8">
        {/* Search Bar */}
        <div className="flex items-center bg-white p-2 rounded-lg shadow-sm mb-4">
          <FaSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="flex-grow p-2 outline-none text-sm text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Sections */}
        {filteredData.map((section) => (
          <div
            key={section.title}
            className="bg-white shadow-md rounded-lg mb-6"
          >
            <div
              className="flex justify-between items-center cursor-pointer p-4 border-b"
              onClick={() => toggleSection(section.title)}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h2>
              {expandedSections[section.title] ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>
            {expandedSections[section.title] &&
              section.items.map((item, index) => (
                <div key={index} className="p-4 border-b last:border-b-0">
                  <div className="flex items-start">
                    <FaQuestionCircle className="text-blue-500 mt-1 mr-2" />
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {item.question}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
