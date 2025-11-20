import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Users() {

  const [allUsersList, setAllUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allUsersList.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(allUsersList.length / recordsPerPage);

  // Get all users
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}users/getUser`)
      .then((res) => {
        setAllUsersList(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(allUsersList);
  console.log(allUsersList);


  // Function to format date
  const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
};


  return (
    <div>
      <div className="flex flex-col p-5 border border-gray-600 w-full h-fit rounded-2xl">
        <div className="flex border-b pb-2">
          <h1 className="text-lg font-semibold">Users List</h1>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <div>
            <table className="table-auto w-full border border-gray-600">
              <thead>
                <tr className="bg-gray-600 border-b border-gray-600">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Mobile</th>
                  <th className="p-2 text-left">Gender</th>
                  <th className="p-2 text-center">Subscribed</th>
                  <th className="p-2 text-left">Purchase Date</th>
                  <th className="p-2 text-left">Expiry Date</th>
                </tr>
              </thead>

              <tbody>
                {currentRecords.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="border-b border-gray-600 hover:bg-gray-500"
                  >
                    <td className="p-2">{indexOfFirstRecord + index + 1}</td>
                    <td className="p-2">{user.fullName}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.phone}</td>
                    <td className="p-2">{user.gender}</td>
                    <td className="p-2 text-center">{user.is_subscribed==false?"No":"Yes"}</td>
                    
                    <td className="p-2">
                      {formatDate(user?.planDetails?.[0]?.activeDate) }
                    </td>
                    <td className="p-2">
                      {formatDate(user?.planDetails?.[0]?.expiryDate) }
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center pt-3">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <p className="text-white">
              Page {currentPage} of {totalPages || 1}
            </p>

            <button
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-40"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;