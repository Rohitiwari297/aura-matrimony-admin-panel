import { useState } from "react";
import React from "react";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!title || !message) {
      alert("Title and message are required");
      return;
    }

    setLoading(true);

    // API call here
    console.log({ title, message, target });

    setTimeout(() => {
      setLoading(false);
      alert("Notification sent successfully!");
      setTitle("");
      setMessage("");
      setTarget("ALL");
    }, 1000);
  };

  return (
    <div className="min-h-screenflex flex-col p-5 border border-gray-600 w-full h-fit rounded-2xl">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">
          🔔 Send Notification
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Notification Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. New Feature Update"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Message
          </label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your notification message..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Target Audience */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Send To
          </label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Users</option>
            <option value="EXPIRED">Expired Plan Users</option>
            <option value="ACTIVE">Active Plan Users</option>
          </select>
        </div>

        {/* Preview */}
        <div className="mb-6 bg-gray-800 border rounded-lg p-4">
          <p className="text-sm text-gray-100 mb-1">Preview</p>
          <h3 className="font-semibold text-gray-100">
            {title || "Notification Title"}
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            {message || "Notification message will appear here..."}
          </p>
          <span className="inline-block mt-2 text-xs text-semibold bg-gray-100 text-blue-700 px-2 py-1 rounded">
            {target}
          </span>
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
