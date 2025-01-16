import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, Mr Ahmed Naeem</h1>
          <p className="text-gray-600">
            Monitor cases, manage documents, and get real-time court alerts.
          </p>
        </div>
        <Link
          to="/advocate-services"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Submit a New Case →
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Ongoing Cases Section */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Ongoing Cases</h2>
            {/* <button className="text-blue-500 hover:underline">View All</button> */}
          </div>
          <p className="text-gray-600 mt-2">
            You have 2 active cases. Next hearing: <b>22nd Oct 2024.</b>
          </p>
          <div className="mt-4 space-y-4">
            {/* Case 1 */}
            <div>
              <h3 className="font-semibold">Case Title: "Ahmed vs XYZ Corp"</h3>
              <p className="text-sm text-gray-600">
                <b>Next Hearing:</b> October 22, 2024
              </p>
              <p className="text-sm text-gray-600">
                <b>Location:</b> Lahore High Court
              </p>
              <p className="text-sm text-gray-600">
                <b>Case Status:</b> In Progress
              </p>
            </div>
            {/* Case 2 */}
            <div>
              <h3 className="font-semibold">
                Case Title: "John Doe vs ABC Enterprises"
              </h3>
              <p className="text-sm text-gray-600">
                <b>Next Hearing:</b> November 10, 2024
              </p>
              <p className="text-sm text-gray-600">
                <b>Location:</b> Karachi Civil Court
              </p>
              <p className="text-sm text-gray-600">
                <b>Case Status:</b> Awaiting Next Hearing
              </p>
            </div>
          </div>
        </div>

        {/* Pending Bids Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Pending Bids</h2>
            <Link
              to="/advocate-services"
              className="text-blue-500 hover:underline"
            >
              View All
            </Link>
          </div>
          <p className="text-gray-600 mt-2">
            You have 3 new bids from advocates for your active cases.
          </p>
          <div className="mt-4">
            {/* Bid Details */}
            <div>
              <h3 className="font-semibold">John Smith</h3>
              <p className="text-sm text-gray-600">
                <b>Fee:</b> $2,000 - $2,500
              </p>
              <p className="text-sm text-gray-600">
                <b>Timeline:</b> Estimated 6 months to resolution
              </p>
              <p className="text-sm text-gray-600">
                <b>Strategy:</b> "Focus on mediation and reaching a settlement
                before proceeding to court."
              </p>
              <p className="text-sm text-yellow-500">
                <b>Rating:</b> ★★★★★
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Accept Bid
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Saved Documents Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Saved Documents</h2>
            <Link
              to="/document-management"
              className="text-blue-500 hover:underline"
            >
              View All
            </Link>
          </div>
          <p className="text-gray-600 mt-2">
            You have 8 documents saved for your ongoing cases.
          </p>
          <div className="mt-4 space-y-4">
            {/* Document 1 */}
            <div>
              <h3 className="font-semibold">Rental Agreement - ABC Corp</h3>
              <p className="text-sm text-gray-600">
                <b>Type:</b> Contract
              </p>
              <p className="text-sm text-gray-600">
                <b>Uploaded On:</b> September 15, 2024
              </p>
              <p className="text-sm text-gray-600">
                <b>Description:</b> A signed rental agreement
              </p>
            </div>
            {/* Document 2 */}
            <div>
              <h3 className="font-semibold">Court Notice - XYZ Corp</h3>
              <p className="text-sm text-gray-600">
                <b>Type:</b> Court Document
              </p>
              <p className="text-sm text-gray-600">
                <b>Uploaded On:</b> October 1, 2024
              </p>
              <p className="text-sm text-gray-600">
                <b>Description:</b> A transcript from the court hearing
              </p>
            </div>
          </div>
        </div>

        {/* Court Alerts Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Court Alerts</h2>
            <Link to="/court-alerts" className="text-blue-500 hover:underline">
              View All
            </Link>
          </div>
          <p className="text-gray-600 mt-2">
            You have 1 upcoming court date this week.
          </p>
          <div className="mt-4 space-y-4">
            {/* Alert 1 */}
            <div>
              <h3 className="font-semibold">Court Hearing Update</h3>
              <p className="text-sm text-gray-600">
                The hearing for Case #12345 for Mr. Ahmed Khan has been
                scheduled for October 15, 2024, at the Lahore High Court. Please
                prepare your documents.
              </p>
              <p className="text-sm text-gray-500">5 hrs ago</p>
            </div>
            {/* Alert 2 */}
            <div>
              <h3 className="font-semibold">
                New Document Submission Confirmation
              </h3>
              <p className="text-sm text-gray-600">
                We have received the new document submission for Case #98765
                filed by Ms. Ayesha Malik. The submission has been processed
                successfully.
              </p>
              <p className="text-sm text-gray-500">5 hrs ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
