import React, { useState } from "react";
import { Document } from "../DocumentManagement";

interface DocumentsProps {
  heading: string;
  subHeading: string;
  filteredDocuments: Document[];
  handleStarToggle: (doc: Document) => Promise<void>;
}

const Documents: React.FC<DocumentsProps> = ({
  heading,
  subHeading,
  filteredDocuments,
  handleStarToggle,
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <>
      <h2 className="mt-8 text-lg font-semibold">{heading}</h2>
      <p className="text-gray-500">{subHeading}</p>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="relative group border rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={doc.imageSrc}
              alt={doc.title}
              className="rounded-t-lg w-full h-40 object-cover bg-cover cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{doc.title}</h3>
              <p className="text-gray-500 text-sm">{doc.type}</p>
              <p className="text-gray-400 text-xs">Created: {doc.date}</p>
            </div>

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
              <button
                onClick={() => setSelectedDocument(doc)}
                className="bg-white rounded-full p-2 hover:scale-110 transition"
                title="View"
              >
                👁️
              </button>
              <button
                onClick={() => handleStarToggle(doc)}
                className="bg-white rounded-full p-2 hover:scale-110 transition"
                title={doc.starred ? "Unstar" : "Star"}
              >
                {doc.starred ? "⭐" : "☆"}
              </button>
              <button
                className="bg-white rounded-full p-2 hover:scale-110 transition"
                title="Download"
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto shadow-lg relative">
            <button
              onClick={() => setSelectedDocument(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold">{selectedDocument.title}</h3>
            <p className="mt-2 text-gray-500">{selectedDocument.type}</p>
            <img
              src={selectedDocument.imageSrc}
              alt={selectedDocument.title}
              className="mt-4 rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Documents;









// import React, { useState } from "react";
// import axios from 'axios';
// import { Document } from "../DocumentManagement";

// interface RecentDocumentProps {
//   heading: string;
//   subHeading: string;
//   filteredDocuments: Document[];
//   setStarredDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
// }

// const RecentDocument: React.FC<RecentDocumentProps> = ({
//   heading,
//   subHeading,
//   filteredDocuments,
//   setStarredDocuments,
// }) => {
//   const [selectedDocument, setSelectedDocument] = useState<Document | null>(
//     null
//   );

//   const handleStarToggle = async (doc: Document) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/documents/${doc.id}/toggle-star`);
//       const updatedDoc = response.data;
      
//       setStarredDocuments(prev => {
//         if (updatedDoc.starred) {
//           return [...prev, updatedDoc];
//         } else {
//           return prev.filter(d => d.id !== updatedDoc.id);
//         }
//       });
//     } catch (error) {
//       console.error("Error toggling star:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="mt-8 text-lg font-semibold">{heading}</h2>
//       <p className="text-gray-500">{subHeading}</p>
//       <div className="grid md:grid-cols-3 gap-6 mt-4">
//         {filteredDocuments.map((doc) => (
//           <div
//             key={doc.id}
//             className="relative group border rounded-lg shadow-lg hover:shadow-xl"
//           >
//             <img
//               src={doc.imageSrc}
//               alt={doc.title}
//               className="rounded-t-lg w-full h-40 object-cover bg-cover cover"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold">{doc.title}</h3>
//               <p className="text-gray-500 text-sm">{doc.type}</p>
//               <p className="text-gray-400 text-xs">Created: {doc.date}</p>
//             </div>

//             {/* Hover Buttons */}
//             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
//               <button
//                 onClick={() => setSelectedDocument(doc)}
//                 className="bg-white rounded-full p-2 hover:scale-110 transition"
//                 title="View"
//               >
//                 👁️
//               </button>
//               <button
//                 onClick={() => handleStarToggle(doc)}
//                 className="bg-white rounded-full p-2 hover:scale-110 transition"
//                 title={doc.starred ? "Unstar" : "Star"}
//               >
//                 {doc.starred ? "⭐" : "☆"}
//               </button>
//               <button
//                 className="bg-white rounded-full p-2 hover:scale-110 transition"
//                 title="Download"
//               >
//                 ⬇️
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Document Preview Modal */}
//       {selectedDocument && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto shadow-lg relative">
//             <button
//               onClick={() => setSelectedDocument(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black"
//             >
//               ✖
//             </button>
//             <h3 className="text-xl font-bold">{selectedDocument.title}</h3>
//             <p className="mt-2 text-gray-500">{selectedDocument.type}</p>
//             <img
//               src={selectedDocument.imageSrc}
//               alt={selectedDocument.title}
//               className="mt-4 rounded-lg"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default RecentDocument;

