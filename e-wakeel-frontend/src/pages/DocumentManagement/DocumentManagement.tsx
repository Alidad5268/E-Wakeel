import React, { useEffect, useState } from "react";
import NewDocumentUpload from "./components/NewDocumentUpload";
import Documents from "./components/Documents";
import DocumentSidebar from "./components/Sidebar";
import axios from "axios";

export interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  imageSrc: string;
  starred: boolean;
}

export enum DocumentPage {
  RECENT = "RECENT",
  ALL = "ALL",
  STARRED = "STARRED",
  FOLDER = "FOLDER",
}

const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");
  const [filterBy, setFilterBy] = useState<
    "all" | "Contract" | "Authorization" | "Case Deal" | "Other"
  >("all");

  const [documentPage, setDocumentPage] = useState<DocumentPage>(
    DocumentPage.RECENT
  );

  const [selectedFolder, setSelectedFolder] = useState<string>("");

  const [starredDocuments, setStarredDocuments] = useState<Document[]>([]);
  const [folderDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setSearchTerm("");
  }, [documentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleUpload = (formData: FormData) => {
    const newDocument: Document = {
      id: documents.length + 1,
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      date: new Date().toLocaleDateString(),
      imageSrc:
        "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
      starred: false,
    };
    setDocuments([...documents, newDocument]);

    axios.post("http://localhost:5000/api/documents", {
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      imgPath:
        "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
    });
  };

  const sortedAndFilteredDocuments = documents
    .filter((doc) => filterBy === "all" || doc.type === filterBy)
    .filter((doc) =>
      doc?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/documents");
        const fetchedDocuments = response.data.map((doc: any) => ({
          id: doc.documentId,
          title: doc.title,
          type: doc.documentType,
          date: new Date().toLocaleDateString(),
          imageSrc: doc.filePath,
          starred: doc.starred,
        }));
        setDocuments(fetchedDocuments);
        setStarredDocuments(fetchedDocuments.filter((doc: Document) => doc.starred));
        console.log("Documents fetched successfully: ", fetchedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleStarToggle = async (doc: Document) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/documents/${doc.id}/toggle-star`);
      const updatedDoc = response.data;
      
      setDocuments(prevDocs => 
        prevDocs.map(d => d.id === updatedDoc.documentId ? {...d, starred: updatedDoc.starred} : d)
      );

      if (updatedDoc.starred) {
        setStarredDocuments(prev => [...prev, {...doc, starred: true}]);
      } else {
        setStarredDocuments(prev => prev.filter(d => d.id !== updatedDoc.documentId));
      }
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  return (
    <div className="flex mt-20">
      <DocumentSidebar
        setDocumentPage={setDocumentPage}
        setSelectedFolder={setSelectedFolder}
        setShowUploadModal={setShowUploadModal}
      />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[79%]"
            />
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "title" | "type")
                }
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="type">Sort by Type</option>
              </select>
              <select
                value={filterBy}
                onChange={(e) =>
                  setFilterBy(
                    e.target.value as
                      | "all"
                      | "Contract"
                      | "Authorization"
                      | "Case Deal"
                      | "Other"
                  )
                }
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                <option value="all">All Types</option>
                <option value="Contract">Contracts</option>
                <option value="Authorization">Authorizations</option>
                <option value="Case Deal">Case Deals</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {documentPage === DocumentPage.RECENT && (
          <Documents
            heading="Recent Documents"
            subHeading="Review your most recently accessed documents."
            filteredDocuments={sortedAndFilteredDocuments}
            handleStarToggle={handleStarToggle}
          />
        )}
        {documentPage === DocumentPage.ALL && (
          <Documents
            heading="Uploaded Documents"
            subHeading="Browse and manage all your documents efficiently."
            filteredDocuments={sortedAndFilteredDocuments}
            handleStarToggle={handleStarToggle}
          />
        )}
        {documentPage === DocumentPage.STARRED && (
          <Documents
            heading="Starred Documents"
            subHeading="Quick access to your most important documents."
            filteredDocuments={starredDocuments}
            handleStarToggle={handleStarToggle}
          />
        )}
        {documentPage === DocumentPage.FOLDER && (
          <Documents
            heading={selectedFolder}
            subHeading={`Organize and manage documents in "${selectedFolder}" folder.`}
            filteredDocuments={folderDocuments}
            handleStarToggle={handleStarToggle}
          />
        )}

        <NewDocumentUpload
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      </div>
    </div>
  );
};

export default DocumentManagement;




// import React, { useEffect, useState } from "react";
// import NewDocumentUpload from "./components/NewDocumentUpload";
// import Documents from "./components/Documents";
// // import { FaSort, FaFilter } from "react-icons/fa";
// import DocumentSidebar from "./components/Sidebar";
// import axios from "axios";

// export interface Document {
//   id: number;
//   title: string;
//   type: string;
//   date: string;
//   imageSrc: string;
//   starred: boolean;
// }
// export enum DocumentPage {
//   RECENT = "RECENT",
//   ALL = "ALL",
//   STARRED = "STARRED",
//   FOLDER = "FOLDER",
// }
// // const initialDocuments: Document[] = [
// //   {
// //     id: 1,
// //     title: "Confidentiality Agreement",
// //     type: "Contract",
// //     date: "August 5, 2024",
// //     imageSrc:
// //       "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
// //   },
// //   {
// //     id: 2,
// //     title: "Rental Agreement - Jane Smith",
// //     type: "Authorization",
// //     date: "July 25, 2024",
// //     imageSrc:
// //       "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
// //   },
// //   {
// //     id: 3,
// //     title: "Non-Disclosure Agreement",
// //     type: "Case Deal",
// //     date: "September 5, 2024",
// //     imageSrc:
// //       "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
// //   },
// // ];

// const DocumentManagement: React.FC = () => {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   // const [selectedDocument, setSelectedDocument] = useState<Document | null>(
//   //   null
//   // );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");
//   const [filterBy, setFilterBy] = useState<
//     "all" | "Contract" | "Authorization" | "Case Deal" | "Other"
//   >("all");
//   // const [filteredDocuments, setFilteredDocuments] =
//   //   useState<Document[]>(documents);

//   const [documentPage, setDocumentPage] = useState<DocumentPage>(
//     DocumentPage.RECENT
//   );

//   const [selectedFolder, setSelectedFolder] = useState<string>("");

//   const [starredDocuments, setStarredDocuments] = useState<Document[]>([]);
//   const [folderDocuments] = useState<Document[]>([]);

//   useEffect(() => {
//     setSearchTerm("");
//     // if (documentPage === DocumentPage.STARRED) {
//     //   setFilteredDocuments(starredDocuments);
//     // } else {
//     //   setFilteredDocuments(documents);
//     // }
//   }, [documentPage]);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     // if (value === "") {
//     //   setFilteredDocuments(documents);
//     // } else {
//     //   setFilteredDocuments(
//     //     documents.filter((doc) =>
//     //       doc.title.toLowerCase().includes(value.toLowerCase())
//     //     )
//     //   );
//     // }
//   };

//   const handleUpload = (formData: FormData) => {
//     const newDocument: Document = {
//       id: documents.length + 1,
//       title: formData.get("title") as string,
//       type: formData.get("type") as string,
//       date: new Date().toLocaleDateString(),
//       imageSrc:
//         "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
//       starred: false,
//     };
//     setDocuments([...documents, newDocument]);

//     axios.post("http://localhost:5000/api/documents", {
//       title: formData.get("title") as string,
//       type: formData.get("type") as string,
//       imgPath:
//         "https://cdn.slidesharecdn.com/ss_thumbnails/legaldocumentsonline-1231237333736279-1-thumbnail.jpg?width=640&height=640&fit=bounds",
//     });
//   };

//   const sortedAndFilteredDocuments = documents
//     .filter((doc) => filterBy === "all" || doc.type === filterBy)
//     .filter((doc) =>
//       doc?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
//     )
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "date":
//           return new Date(b.date).getTime() - new Date(a.date).getTime();
//         case "title":
//           return a.title.localeCompare(b.title);
//         case "type":
//           return a.type.localeCompare(b.type);
//         default:
//           return 0;
//       }
//     });

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/documents");
//         // setDocuments((prev) => [
//         //   ...prev,
//         //   ...response.data.map((doc: any) => ({
//         //     id: doc.documentId,
//         //     title: doc.title,
//         //     type: doc.documentType,
//         //     date: new Date().toLocaleDateString(),
//         //     imageSrc: doc.filePath,
//         //   })),
//         // ]);
//         setDocuments(
//           response.data.map((doc: any) => ({
//             id: doc.documentId,
//             title: doc.title,
//             type: doc.documentType,
//             date: new Date().toLocaleDateString(),
//             imageSrc: doc.filePath,
//           }))
//         );

//         console.log("Documents fetched successfully: ", documents);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   return (
//     <div className="flex mt-20">
//       <DocumentSidebar
//         setDocumentPage={setDocumentPage}
//         setSelectedFolder={setSelectedFolder}
//         setShowUploadModal={setShowUploadModal}
//       />

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Search, Sort, and Filter Section */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4 w-full">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={handleSearch}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[79%]"
//             />
//             <div className="flex space-x-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) =>
//                   setSortBy(e.target.value as "date" | "title" | "type")
//                 }
//                 className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
//               >
//                 <option value="date">Sort by Date</option>
//                 <option value="title">Sort by Title</option>
//                 <option value="type">Sort by Type</option>
//               </select>
//               <select
//                 value={filterBy}
//                 onChange={(e) =>
//                   setFilterBy(
//                     e.target.value as
//                       | "all"
//                       | "Contract"
//                       | "Authorization"
//                       | "Case Deal"
//                       | "Other"
//                   )
//                 }
//                 className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
//               >
//                 <option value="all">All Types</option>
//                 <option value="Contract">Contracts</option>
//                 <option value="Authorization">Authorizations</option>
//                 <option value="Case Deal">Case Deals</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {documentPage === DocumentPage.RECENT ? (
//           <Documents
//             heading="Recent Documents"
//             subHeading="Review your most recently accessed documents."
//             filteredDocuments={sortedAndFilteredDocuments}
//             setStarredDocuments={setStarredDocuments}
//           />
//         ) : documentPage === DocumentPage.ALL ? (
//           <Documents
//             heading="Uploaded Documents"
//             subHeading="Browse and manage all your documents efficiently."
//             filteredDocuments={sortedAndFilteredDocuments}
//             setStarredDocuments={setStarredDocuments}
//           />
//         ) : documentPage === DocumentPage.STARRED ? (
//           <Documents
//             heading="Starred Documents"
//             subHeading="Quick access to your most important documents."
//             filteredDocuments={starredDocuments}
//             setStarredDocuments={setStarredDocuments}
//           />
//         ) : documentPage === DocumentPage.FOLDER ? (
//           <Documents
//             heading={selectedFolder}
//             subHeading={`Organize and manage documents in "${selectedFolder}" folder.`}
//             filteredDocuments={folderDocuments}
//             setStarredDocuments={setStarredDocuments}
//           />
//         ) : null}

//         {/* New Document Upload Modal */}
//         <NewDocumentUpload
//           isOpen={showUploadModal}
//           onClose={() => setShowUploadModal(false)}
//           onUpload={handleUpload}
//         />
//       </div>
//     </div>
//   );
// };

// export default DocumentManagement;
