import React, { useState } from "react";

const Feature: React.FC = () => {
  const [granted, setGranted] = useState(false);
  const [emergency, setEmergency] = useState(false);

  // Dummy access logs (later can connect with backend/ICP)
  const accessLogs = [
    { doctor: "Dr. Smith", time: "2025-09-02 10:45 AM" },
    { doctor: "Dr. Allen", time: "2025-09-01 02:15 PM" },
    { doctor: "Dr. Rao", time: "2025-08-31 06:20 PM" },
  ];

  const toggleAccess = () => {
    setGranted(!granted);
  };

  const toggleEmergency = () => {
    setEmergency(!emergency);
  };

  return (
    <div className="space-y-8">
      {/* 1. Patient Consent Manager */}
      <div className="p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          🔐 Patient Consent Manager
        </h2>
        <p className="text-gray-700 mb-4">
          Manage who can access your medical records in real-time. 
          This empowers patients with full control over their healthcare data.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleAccess}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              granted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {granted ? "Revoke Access" : "Grant Access"}
          </button>

          <span
            className={`font-medium ${
              granted ? "text-green-600" : "text-red-600"
            }`}
          >
            {granted ? "✅ Access Granted" : "❌ Access Revoked"}
          </span>
        </div>
      </div>

      {/* 2. Data Access Log Viewer */}
      <div className="p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-purple-600">
          📜 Data Access Log
        </h2>
        <p className="text-gray-700 mb-4">
          See who accessed your medical records and when.
        </p>
        <ul className="space-y-2">
          {accessLogs.map((log, index) => (
            <li
              key={index}
              className="flex justify-between p-2 rounded-lg bg-gray-100"
            >
              <span className="font-medium">{log.doctor}</span>
              <span className="text-gray-600">{log.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Emergency Access Toggle */}
      <div className="p-6 rounded-2xl shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          🚨 Emergency Access
        </h2>
        <p className="text-gray-700 mb-4">
          In critical situations, allow all authorized doctors to access your
          records temporarily.
        </p>
        <button
          onClick={toggleEmergency}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            emergency
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          {emergency ? "🔓 Emergency Mode Active" : "🔒 Enable Emergency Mode"}
        </button>
      </div>
    </div>
  );
};

export default Feature;
