import React, { useState, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import MessageModal from "./components/MessageModal";
import SubmitCaseModal from "./components/SubmitCase";

interface AdvocateBid {
  id: string;
  advocateName: string;
  bidAmount: number;
  experience: string;
  timeline: string;
  strategy: string;
  rating: number;
  specialization: string;
  status: string;
}

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

const initialBids: AdvocateBid[] = [
  {
    id: "1",
    advocateName: "John Doe",
    bidAmount: 5000,
    experience: "10 years",
    timeline: "2 weeks",
    strategy: "Negotiate a settlement with the opposing party",
    rating: 4.5,
    specialization: "Property Dispute Law",
    status: "Pending",
  },
  {
    id: "2",
    advocateName: "Jane Smith",
    bidAmount: 4500,
    experience: "8 years",
    timeline: "3 weeks",
    strategy: "File a motion for summary judgment",
    rating: 4.2,
    specialization: "Civil Litigation",
    status: "Pending",
  },
  {
    id: "3",
    advocateName: "Mike Johnson",
    bidAmount: 5500,
    experience: "12 years",
    timeline: "4 weeks",
    strategy: "Gather evidence and prepare for trial",
    rating: 4.8,
    specialization: "Property Dispute Law",
    status: "Pending",
  },
];

interface Case {
  id: string;
  title: string;
  type: string;
  description: string;
  fileName: string | null;
}

const AdvocateServices: React.FC = () => {
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [advocateBids, setAdvocateBids] = useState<AdvocateBid[]>(initialBids);
  const [acceptedBids, setAcceptedBids] = useState<AdvocateBid[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedAdvocate, setSelectedAdvocate] = useState<AdvocateBid | null>(
    null
  );
  const [sortBy, setSortBy] = useState<"rating" | "experience" | "fee">(
    "rating"
  );
  const [filterBy, setFilterBy] = useState<
    "all" | "Property Dispute Law" | "Civil Litigation"
  >("all");
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleMessage = (advocate: AdvocateBid) => {
    setSelectedAdvocate(advocate);
    setShowMessageModal(true);
  };

  const handleSendMessage = async (message: string) => {
    // Simulating message sending
    console.log(`Sending message to ${selectedAdvocate?.advocateName}: ${message}`);
    setToast({
      message: `Your message has been sent to ${selectedAdvocate?.advocateName}.`,
      type: "success",
    });
    setShowMessageModal(false);
  };

  const handleAcceptBid = (advocate: AdvocateBid) => {
    setAdvocateBids(advocateBids.filter((bid) => bid.id !== advocate.id));
    setAcceptedBids([...acceptedBids, { ...advocate, status: "Accepted" }]);
    setToast({
      message: `You have successfully accepted the bid from ${advocate.advocateName}.`,
      type: "success",
    });
  };

  const handleCaseSubmit = (caseData: {
    title: string;
    type: string;
    description: string;
    file: File | null;
  }) => {
    const newCase: Case = {
      id: (cases.length + 1).toString(),
      title: caseData.title,
      type: caseData.type,
      description: caseData.description,
      fileName: caseData.file ? caseData.file.name : null,
    };

    setCases([...cases, newCase]);
    setShowNewCaseModal(false);
    setToast({
      message: "Case submitted successfully!",
      type: "success",
    });

    // Simulating file upload
    if (caseData.file) {
      console.log(`Uploading file: ${caseData.file.name}`);
      // Here you would typically send the file to your server
    }
  };

  const sortedAndFilteredBids = advocateBids
    .filter((bid) => filterBy === "all" || bid.specialization === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "fee":
          return a.bidAmount - b.bidAmount;
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col items-center bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Advocate Services
          </h1>
          <button
            onClick={() => setShowNewCaseModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Submit a New Case →
          </button>
        </div>

        {/* Cases Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Cases</h2>
          {cases.length === 0 ? (
            <p className="text-gray-500">You haven't submitted any cases yet.</p>
          ) : (
            <div className="divide-y">
              {cases.map((case_) => (
                <div key={case_.id} className="py-4">
                  <h3 className="text-md font-semibold text-gray-800">{case_.title}</h3>
                  <p className="text-sm text-gray-600"><strong>Type:</strong> {case_.type}</p>
                  <p className="text-sm text-gray-600"><strong>Description:</strong> {case_.description}</p>
                  {case_.fileName && (
                    <p className="text-sm text-gray-600"><strong>Attached File:</strong> {case_.fileName}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bids Section */}
        <div className="flex justify-end space-x-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "rating" | "experience" | "fee")
            }
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="fee">Sort by Fee</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) =>
              setFilterBy(
                e.target.value as
                  | "all"
                  | "Property Dispute Law"
                  | "Civil Litigation"
              )
            }
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"
          >
            <option value="all">All Specializations</option>
            <option value="Property Dispute Law">Property Dispute Law</option>
            <option value="Civil Litigation">Civil Litigation</option>
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Available Bids
          </h2>
          {sortedAndFilteredBids.length === 0 ? (
            <p className="text-gray-500">No bids available at the moment.</p>
          ) : (
            <div className="divide-y">
              {sortedAndFilteredBids.map((bid) => (
                <div key={bid.id} className="py-4 md:flex space-x-4 items-start">
                  <div className="flex-grow">
                    <h3 className="text-md font-semibold text-gray-800">
                      {bid.advocateName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Fee:</strong> ${bid.bidAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Experience:</strong> {bid.experience}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Timeline:</strong> {bid.timeline}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Strategy:</strong> {bid.strategy}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Rating:</strong>{" "}
                      {"★".repeat(Math.floor(bid.rating)) +
                        (bid.rating % 1 ? "½" : "")}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Specialization:</strong> {bid.specialization}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2 md:mt-0">
                    <button
                      onClick={() => handleAcceptBid(bid)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Accept Bid
                    </button>
                    <button
                      onClick={() => handleMessage(bid)}
                      className="flex items-center justify-center bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <FaRegCommentDots className="mr-2" />
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Accepted Bids
          </h2>
          {acceptedBids.length === 0 ? (
            <p className="text-gray-500">No accepted bids yet.</p>
          ) : (
            <div className="divide-y">
              {acceptedBids.map((bid) => (
                <div key={bid.id} className="py-4 md:flex space-x-4 items-start">
                  <div className="flex-grow">
                    <h3 className="text-md font-semibold text-gray-800">
                      {bid.advocateName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      <strong>Fee:</strong> ${bid.bidAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Experience:</strong> {bid.experience}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Timeline:</strong> {bid.timeline}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Specialization:</strong> {bid.specialization}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        {bid.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SubmitCaseModal
        isOpen={showNewCaseModal}
        onClose={() => setShowNewCaseModal(false)}
        onSubmit={handleCaseSubmit}
      />

      {selectedAdvocate && (
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          advocateName={selectedAdvocate.advocateName}
          onSendMessage={handleSendMessage}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AdvocateServices;






























// import React, { useState, useEffect } from "react";
// import { FaRegCommentDots } from "react-icons/fa";
// import MessageModal from "./components/MessageModal";
// import SubmitCaseModal from "./components/SubmitCase";
// import axios from "axios";

// interface AdvocateBid {
//   id: string;
//   advocateName: string;
//   bidAmount: number;
//   experience: string;
//   timeline: string;
//   strategy: string;
//   rating: number;
//   specialization: string;
//   status: string;
// }

// interface ToastProps {
//   message: string;
//   type: "success" | "error";
// }

// const Toast: React.FC<ToastProps> = ({ message, type }) => {
//   return (
//     <div
//       className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
//         type === "success" ? "bg-green-500" : "bg-red-500"
//       }`}
//     >
//       {message}
//     </div>
//   );
// };

// const AdvocateServices: React.FC = () => {
//   const [newCase, setNewCase] = useState(false);
//   const [advocateBids, setAdvocateBids] = useState<AdvocateBid[]>([]);
//   const [showMessageModal, setShowMessageModal] = useState(false);
//   const [selectedAdvocate, setSelectedAdvocate] = useState<AdvocateBid | null>(
//     null
//   );
//   const [sortBy, setSortBy] = useState<"rating" | "experience" | "fee">(
//     "rating"
//   );
//   const [filterBy, setFilterBy] = useState<
//     "all" | "Property Dispute Law" | "Civil Litigation"
//   >("all");
//   const [toast, setToast] = useState<ToastProps | null>(null);

//   useEffect(() => {
//     fetchBids();
//   }, []);

//   const fetchBids = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/bids");
//       setAdvocateBids(response.data);
//     } catch (error) {
//       console.error("Error fetching bids:", error);
//       setToast({
//         message: "Error fetching bids. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   useEffect(() => {
//     if (toast) {
//       const timer = setTimeout(() => {
//         setToast(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [toast]);

//   const handleMessage = (advocate: AdvocateBid) => {
//     setSelectedAdvocate(advocate);
//     setShowMessageModal(true);
//   };

//   const handleSendMessage = async (message: string) => {
//     try {
//       await axios.post(`http://localhost:5000/api/messages`, {
//         advocateId: selectedAdvocate?.id,
//         message: message,
//       });
//       setToast({
//         message: `Your message has been sent to ${selectedAdvocate?.advocateName}.`,
//         type: "success",
//       });
//       setShowMessageModal(false);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setToast({
//         message: "Error sending message. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   const handleAcceptBid = async (advocate: AdvocateBid) => {
//     try {
//       await axios.post(`http://localhost:5000/api/bids/${advocate.id}/accept`);
//       setToast({
//         message: `You have successfully accepted the bid from ${advocate.advocateName}.`,
//         type: "success",
//       });
//       setAdvocateBids(advocateBids.filter((bid) => bid.id !== advocate.id));
//     } catch (error) {
//       console.error("Error accepting bid:", error);
//       setToast({
//         message: "An error occurred while accepting the bid. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   const handleCaseSubmitted = () => {
//     setToast({
//       message: "Case submitted successfully!",
//       type: "success",
//     });
//     fetchBids(); // Refresh the bids list
//     setNewCase(false);
//   };

//   const sortedAndFilteredBids = advocateBids
//     .filter((bid) => filterBy === "all" || bid.specialization === filterBy)
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "rating":
//           return b.rating - a.rating;
//         case "experience":
//           return parseInt(b.experience) - parseInt(a.experience);
//         case "fee":
//           return a.bidAmount - b.bidAmount;
//         default:
//           return 0;
//       }
//     });

//   return (
//     <div className="flex flex-col items-center bg-gray-50 py-8 px-4 mt-16">
//       {newCase && (
//         <SubmitCaseModal
//           onClose={() => setNewCase(false)}
//           onCaseSubmitted={handleCaseSubmitted}
//         />
//       )}
//       <div className="max-w-4xl w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//             Current Bids
//           </h1>
//           <button
//             onClick={() => setNewCase(true)}
//             className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Submit a New Case →
//           </button>
//         </div>

//         <div className="flex justify-end space-x-4 mb-6">
//           <select
//             value={sortBy}
//             onChange={(e) =>
//               setSortBy(e.target.value as "rating" | "experience" | "fee")
//             }
//             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"
//           >
//             <option value="rating">Sort by Rating</option>
//             <option value="experience">Sort by Experience</option>
//             <option value="fee">Sort by Fee</option>
//           </select>
//           <select
//             value={filterBy}
//             onChange={(e) =>
//               setFilterBy(
//                 e.target.value as
//                   | "all"
//                   | "Property Dispute Law"
//                   | "Civil Litigation"
//               )
//             }
//             className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition"
//           >
//             <option value="all">All Specializations</option>
//             <option value="Property Dispute Law">Property Dispute Law</option>
//             <option value="Civil Litigation">Civil Litigation</option>
//           </select>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Available Bids
//           </h2>
//           {sortedAndFilteredBids.length === 0 ? (
//             <p className="text-gray-500">No bids available at the moment.</p>
//           ) : (
//             <div className="divide-y">
//               {sortedAndFilteredBids.map((bid) => (
//                 <div key={bid.id} className="py-4 md:flex space-x-4 items-start">
//                   <div className="flex-grow">
//                     <h3 className="text-md font-semibold text-gray-800">
//                       {bid.advocateName}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       <strong>Fee:</strong> ${bid.bidAmount}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Experience:</strong> {bid.experience}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Timeline:</strong> {bid.timeline}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Strategy:</strong> {bid.strategy}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Rating:</strong>{" "}
//                       {"★".repeat(Math.floor(bid.rating)) +
//                         (bid.rating % 1 ? "½" : "")}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <strong>Specialization:</strong> {bid.specialization}
//                     </p>
//                   </div>
//                   <div className="flex flex-col space-y-2 mt-2 md:mt-0">
//                     <button
//                       onClick={() => handleAcceptBid(bid)}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//                     >
//                       Accept Bid
//                     </button>
//                     <button
//                       onClick={() => handleMessage(bid)}
//                       className="flex items-center justify-center bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
//                     >
//                       <FaRegCommentDots className="mr-2" />
//                       Message
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedAdvocate && (
//         <MessageModal
//           isOpen={showMessageModal}
//           onClose={() => setShowMessageModal(false)}
//           advocateName={selectedAdvocate.advocateName}
//           onSendMessage={handleSendMessage}
//         />
//       )}

//       {toast && <Toast message={toast.message} type={toast.type} />}
//     </div>
//   );
// };

// export default AdvocateServices;

