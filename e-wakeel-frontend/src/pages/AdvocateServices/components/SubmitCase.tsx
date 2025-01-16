import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface SubmitCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (caseData: CaseData) => void;
}

interface CaseData {
  title: string;
  type: string;
  description: string;
  file: File | null;
}

const SubmitCaseModal: React.FC<SubmitCaseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!title || !type || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const caseData: CaseData = {
      title,
      type,
      description,
      file,
    };

    onSubmit(caseData);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setType("");
    setDescription("");
    setFile(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[95%] md:max-w-[60%] h-[90%] overflow-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit a New Case</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="caseTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Case Title
            </label>
            <input
              type="text"
              id="caseTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-1">
              Case Type
            </label>
            <select
              id="caseType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Case Type</option>
              <option value="civil">Civil Case</option>
              <option value="criminal">Criminal Case</option>
              <option value="family">Family Case</option>
            </select>
          </div>
          <div>
            <label htmlFor="caseDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Case Description
            </label>
            <textarea
              id="caseDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="caseFile" className="block text-sm font-medium text-gray-700 mb-1">
              Attach Document
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="caseFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                  >
                    <span>Upload a file</span>
                    <input id="caseFile" name="caseFile" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
            {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Submit Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitCaseModal;







// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import axios from "axios";

// interface SubmitCaseModalProps {
//   onClose: () => void;
//   onCaseSubmitted: () => void;
// }

// const SubmitCaseModal: React.FC<SubmitCaseModalProps> = ({ onClose, onCaseSubmitted }) => {
//   const [progress, setProgress] = useState(15);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("title", (event.target as any).elements.caseTitle.value);
//     formData.append("type", (event.target as any).elements.caseType.value);
//     formData.append("description", (event.target as any).elements.caseDescription.value);

//     if (selectedFile) {
//       formData.append("file", selectedFile);
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/cases", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
//           setProgress(percentCompleted);
//         },
//       });
//       console.log("Case submitted successfully:", response.data);
//       setProgress(100);
//       setTimeout(() => {
//         onClose();
//         onCaseSubmitted();
//       }, 1000);
//     } catch (error) {
//       console.error("Error submitting case:", error);
//       alert("Error submitting case. Please try again.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-[95%] md:max-w-[60%] h-[90%] overflow-auto p-6">
//         <div className="mb-4">
//           <div className="flex justify-between text-sm text-gray-500">
//             <span>0%</span>
//             <span>{progress}%</span>
//             <span>100%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//             <div
//               className="bg-orange-500 h-2 rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>

//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Enter your case details
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="md:flex gap-4">
//             <div className="flex flex-col md:w-[80%] mb-4 md:mb-0">
//               <label
//                 htmlFor="caseTitle"
//                 className="text-sm text-gray-600 mb-1"
//               >
//                 Case Title
//               </label>
//               <input
//                 type="text"
//                 id="caseTitle"
//                 placeholder="Enter a brief title for the case"
//                 className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="caseType" className="text-sm text-gray-600 mb-1">
//                 Case Type
//               </label>
//               <select
//                 id="caseType"
//                 className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               >
//                 <option value="">Select Case Type</option>
//                 <option value="civil">Civil Case</option>
//                 <option value="criminal">Criminal Case</option>
//                 <option value="family">Family Case</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label
//               htmlFor="caseDescription"
//               className="text-sm text-gray-600 mb-1"
//             >
//               Case Description
//             </label>
//             <textarea
//               id="caseDescription"
//               placeholder="Enter a brief description for the case"
//               rows={4}
//               className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
//               required
//             ></textarea>
//           </div>

//           <div className="flex flex-col">
//             <label
//               htmlFor="attach-documents"
//               className="text-sm text-gray-600 mb-1"
//             >
//               Attach Documents
//             </label>
//             <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center text-gray-500">
//               <FaCloudUploadAlt className="text-3xl mx-auto mb-2" />
//               <p>Upload documents</p>
//               <input
//                 type="file"
//                 id="attach-documents"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </div>
//             {selectedFile && (
//               <p className="mt-2 text-sm text-gray-600">
//                 Selected file: {selectedFile.name}
//               </p>
//             )}
//           </div>

//           <div className="flex justify-end mt-6 space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SubmitCaseModal;

