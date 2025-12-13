import React, { useEffect, useState } from "react";
import { token } from "../important_Links/url";
import { getNumerologyData } from "../important_Links/api";

function Numerology() {
  const [numeroDateReceived, setNumeroDateReceived] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /* ---------------- Pagination State ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    getNumerologyData(token, setNumeroDateReceived);
  }, []);

  /* ---------------- Search Fields ---------------- */
  const filterByFields = [
    "fullName",
    "email",
    "phone",
    "paymentOf",
    "birthDate",
    "birthPlace",
    "birthTime",
    "paymentStatus",
    "gender",
  ];

  /* ---------------- Search Logic ---------------- */
  const matchSearch = (data, searchTerm) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    return filterByFields.some((field) => {
      const value = data?.[field];
      return value && value.toString().toLowerCase().includes(term);
    });
  };

  /* ---------------- Filtered Data ---------------- */
  const filteredData = numeroDateReceived.filter((data) =>
    matchSearch(data, searchTerm)
  );

  /* ---------------- Pagination Logic ---------------- */
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  /* Reset page on search */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-5 border border-gray-700 rounded-2xl">
      {/* Search */}
      <div className="mb-5">
        <input
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-64 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-200">
          <thead className="bg-gradient-to-r from-gray-400 to-gray-500 text-gray-100 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3 text-center">Birth Date</th>
              <th className="px-4 py-3">Birth Place</th>
              <th className="px-4 py-3">Birth Time</th>
              <th className="px-4 py-3">Payment (₹)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">PDF</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentRecords.length > 0 ? (
              currentRecords.map((data, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {data.fullName}
                  </td>

                  <td className="px-4 py-3">
                    {data.email || "demo@gmail.com"}
                  </td>

                  <td className="px-4 py-3">
                    {data.phone || "1234567890"}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {data.gender || "Male"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {data.birthDate || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {data.birthPlace || "N/A"}
                  </td>

                  <td className="px-4 py-3">
                    {data.birthTime || "N/A"}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {data.paymentOf || "N/A"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {data.paymentStatus ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                        Paid
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-red-600/20 text-red-400">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {data.pdfUrl ? (
                      <a
                        href={data.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">No PDF</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-5 text-gray-400">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-gray-300">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Numerology;
