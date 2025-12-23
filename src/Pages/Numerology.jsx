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
    <div className="flex flex-col p-5 border border-gray-600 w-full h-fit rounded-2xl">
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
      <div className="flex flex-col gap-5 mt-5">
        <table className="table-auto w-full border border-gray-600">
          <thead className="bg-gradient-to-r from-gray-400 to-gray-500 text-gray-100 uppercase text-xs tracking-wider">
            <tr className="bg-gray-600 border-b border-gray-600">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Gender</th>
              <th className="p-2 text-left">Birth Date</th>
              <th className="p-2 text-left">Birth Place</th>
              <th className="p-2 text-left">Birth Time</th>
              <th className="p-2 text-left">Payment (₹)</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">PDF</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {currentRecords.length > 0 ? (
              currentRecords.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 hover:bg-gray-500"
                >
                  <td className="p-2 font-medium whitespace-nowrap">
                    {data.fullName}
                  </td>

                  <td className="p-2">
                    {data.email || "demo@gmail.com"}
                  </td>

                  <td className="p-2">
                    {data.phone || "1234567890"}
                  </td>

                  <td className="p-2 capitalize">
                    {data.gender || "Male"}
                  </td>

                  <td className="p-2">
                    {data.birthDate || "N/A"}
                  </td>

                  <td className="p-2">
                    {data.birthPlace || "N/A"}
                  </td>

                  <td className="p-2">
                    {data.birthTime || "N/A"}
                  </td>

                  <td className="p-2">
                    {data.paymentOf || "N/A"}
                  </td>

                  <td className="p-2">
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

                  <td className="p-2 text-[12px]">
                    {data.pdfUrl ? (
                      <a
                        href={data.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">No</span>
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
