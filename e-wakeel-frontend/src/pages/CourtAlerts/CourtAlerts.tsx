import React from 'react';
import { FaHome } from 'react-icons/fa';

interface Alert {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
}

const alerts: Alert[] = [
  {
    id: 1,
    title: 'Court Hearing Update',
    description:
      'The hearing for Case #12345 for Mr. Ahmed Khan has been scheduled for October 15, 2024 at the Lahore High Court. Please prepare your documents accordingly.',
    time: '5 hrs ago',
    type: 'update',
  },
  {
    id: 2,
    title: 'New Document Submission Confirmation',
    description:
      'We have received the new document submission for Case #98765 filed by Ms. Ayesha Malik. The submission has been processed successfully.',
    time: '5 hrs ago',
    type: 'confirmation',
  },
  {
    id: 3,
    title: 'Court Decision Update',
    description:
      'The decision for Case #11223 involving Mr. Zubair Ahmed has been announced. Please log in to your account to view the full details of the ruling.',
    time: '5 hrs ago',
    type: 'decision',
  },
  {
    id: 4,
    title: 'Next Court Date Reminder',
    description:
      'The hearing for Case #12345 for Mr. Ahmed Khan has been scheduled for October 15, 2024 at the Lahore High Court. Please prepare your documents accordingly.',
    time: '5 hrs ago',
    type: 'reminder',
  },
];

const CourtAlerts: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6 lg:h-screen bg-gray-50 py-20">
      {/* Heading and View All */}
      <div className="flex justify-between items-center w-full max-w-3xl mt-8 mb-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Court Alerts</h1>
        <a href="#" className="text-red-500 hover:text-red-600 transition">View All</a>
      </div>

      {/* Alerts List */}
      <div className="bg-white shadow-md rounded-lg p-1 md:p-4 max-w-3xl w-full">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start p-4 border-b last:border-b-0"
          >
            <div className="text-gray-500">
              <FaHome className="w-6 h-6" />
            </div>
            <div className="flex-grow ml-4">
              <h2 className="text-md font-semibold text-gray-800 flex items-center">
                <span className="mr-2 text-green-500">●</span> {alert.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
            </div>
            <span className="text-gray-400 text-sm text-nowrap">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtAlerts;
