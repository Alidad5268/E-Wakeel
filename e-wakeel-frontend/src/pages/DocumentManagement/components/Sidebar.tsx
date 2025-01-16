import React from "react";
import { DocumentPage } from "../DocumentManagement";

interface DocumentSidebar {
  setDocumentPage: React.Dispatch<React.SetStateAction<DocumentPage>>;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// const folders = [
//   "Active Cases",
//   "Contracts & Agreements",
//   "Litigation Documents",
// ];

const DocumentSidebar: React.FC<DocumentSidebar> = ({
  setDocumentPage,
  // setSelectedFolder,
  setShowUploadModal,
}) => {
  return (
    <>
      {/* Sidepane */}
      <div className="w-64 h-screen bg-gray-50 border-r p-4 hidden md:block overflow-y-auto">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
        >
          Upload New Document
        </button>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">My Documents</h2>
          <ul className="mt-4 space-y-2">
            <li
              onClick={() => setDocumentPage(DocumentPage.RECENT)}
              className="hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
            >
              Recent Documents
            </li>
            <li
              onClick={() => setDocumentPage(DocumentPage.ALL)}
              className="hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
            >
              View All Documents
            </li>
            <li
              onClick={() => setDocumentPage(DocumentPage.STARRED)}
              className="hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
            >
              Starred Documents
            </li>
          </ul>
        </div>

        {/* <div className="mt-8">
          <h2 className="text-lg font-semibold">Folders</h2>
          <ul className="mt-4 space-y-2">
            {folders?.map((folder) => (
              <li
                onClick={() => {
                  setDocumentPage(DocumentPage.FOLDER);
                  setSelectedFolder(folder);
                  return;
                }}
                className="hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
              >
                {folder}
              </li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 rounded-lg cursor-pointer w-full bg-gray-200">
            Show More
          </button>
        </div> */}
      </div>
    </>
  );
};

export default DocumentSidebar;
