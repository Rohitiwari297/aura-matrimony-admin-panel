import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Users() {
  const [allUsersList, setAllUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allUsersList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(allUsersList.length / recordsPerPage);

  // extract params from navigation
  const location = useLocation();
  const gender = location.state?.gender || "";
  const activeInactiveUsers = location.state?.status || "";

  console.log("Gender :", gender);
  console.log("Active/Inactive :", activeInactiveUsers);

  /* --------------------------------------------------------
     FIXED: Single useEffect (React recommended way)
  --------------------------------------------------------- */
  useEffect(() => {
  const fetchData = async () => {
    try {
      let url = "";
      let options = {};

      if (gender) {
        url = `${import.meta.env.VITE_BASE_URL}users/getUser?gender=${gender}`;
      } else if (activeInactiveUsers === "active") {
        url = `${import.meta.env.VITE_BASE_URL}subcription/getActiveUsers`;
        options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      } else if (activeInactiveUsers === "inactive") {
        url = `${import.meta.env.VITE_BASE_URL}subcription/getInactiveUsers`;
        options = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      } else {
        url = `${import.meta.env.VITE_BASE_URL}users/getUser`;
      }

      const res = await axios.get(url, options);
      const users = res.data.users || res.data.data || [];

      let formattedUsers = users;

      // ⭐ Fix — Active Users API normalisation
      if (users.length > 0 && users[0].userDetails) {
        formattedUsers = users.map((item) => ({
          _id: item.userDetails._id,
          fullName: item.userDetails.fullName,
          email: item.userDetails.email,
          phone: item.userDetails.phone,
          gender: item.userDetails.gender,
          is_subscribed: true,
          planDetails: [item.latestPlan],
        }));
      }

      setAllUsersList(formattedUsers);
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  fetchData();
}, [gender, activeInactiveUsers]);


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
                    <td className="p-2">{user.fullName || user[0]?.userDetails.fullName}</td>
                    <td className="p-2">{user.email || user[0]?.userDetails.email}</td>
                    <td className="p-2">{user.phone || user[0]?.userDetails.phone}</td>
                    <td className="p-2">{user.gender || user[0]?.userDetails.gender}</td>
                    <td className="p-2 text-center">
                      {user.is_subscribed ? "Yes" : "No"}
                    </td>

                    <td className="p-2">
                      {formatDate(user?.planDetails?.[0]?.activeDate)}
                    </td>
                    <td className="p-2">
                      {formatDate(user?.planDetails?.[0]?.expiryDate)}
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
