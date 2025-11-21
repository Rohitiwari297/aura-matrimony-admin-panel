import React, { useEffect, useState } from "react";
import memberImg from "../assets/members.png";
import { getActiveUsers, getAllBrides, getAllGrooms, getAllUsers, getExpUser } from "../important_Links/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  // States
  const [allData, setAllData] = useState([]);
  const [allExpiredPlan, setAllExpiredPlan] = useState([]);
  const [allActivePlan, setAllActivePlan] = useState([]);
  const [allGrooms, setAllGrooms] = useState([]);
  const [allBrides, setAllBrides] = useState([]);

    // fetching all users
    getAllUsers(setAllData);
    // fetching all expired users
    getExpUser(setAllExpiredPlan);
    // fetching all Active users
    getActiveUsers(setAllActivePlan);
    // getching all grooms list
    getAllGrooms(setAllGrooms);
    // getching all grooms list
    getAllBrides(setAllBrides);

    // console.log(" allExpiredPlan",allExpiredPlan, allData);
    console.log(" allExpiredPlan",allExpiredPlan);
    console.log(" allActivePlan",allActivePlan.count);
    console.log(' allData',allData);


  return (
    // Main Container
    
      <div className="flex flex-col p-5 border border-gray-600 w-full h-fit rounded-2xl">

        {/* Top Header */}
        <div className="text-center mb-14">
          <div className="flex justify-start items-center">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-5 text-transparent">User Dashboard</h1>
          </div>
          
          <p className="flex justity-start text-xl font-semibold text-gray-300 border-t border-gray-600 pb-4 mt-5 p-3   -mb-10">
            
            Monitor platform insights
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div onClick={()=>navigate('/dashboard/users')} className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Members"
              />
              <div>
                <h2 className="text-xl font-semibold text-indigo-400">
                  Total Members
                </h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">{allData.length}</span>
                </p>
                {/* <p>
                  Paid: <span className="text-green-400 font-medium">8</span>
                </p>
                <p>
                  Free: <span className="text-yellow-400 font-medium">55</span>
                </p> */}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div onClick={ () => navigate('/dashboard/users', {
            state: {status: 'active'}
          })} className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Subscriptions"
              />
              <div>
                <h2 className="text-xl font-semibold text-purple-400">
                  Active Members
                </h2>
                <p>
                  Active: <span className="text-cyan-300 font-medium">{allActivePlan.count}</span>
                </p>
                
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/30 hover:border-yellow-300 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Matches"
              />
              <div>
                <h2 className="text-xl font-semibold text-yellow-200">Expired Members</h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">{allExpiredPlan.count}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          
          <div onClick={() => navigate('/dashboard/users', 
            { state: { gender : "Male" } }
          )} className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Matches"
              />
              <div>
                <h2 className="text-xl font-semibold text-cyan-400">Groom</h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">{allGrooms.length}</span>
                </p>
              </div>
            </div>
          </div>

           {/* Card 5 */}
          <div onClick={() => navigate('/dashboard/users',{
            state: {gender: 'Female'}
          })} className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Matches"
              />
              <div>
                <h2 className="text-xl font-semibold text-cyan-400">Bride</h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">{allBrides.length}</span>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    

  );
}

export default Dashboard;
