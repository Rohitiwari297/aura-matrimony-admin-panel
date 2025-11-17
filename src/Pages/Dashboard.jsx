import React from "react";
import memberImg from "../assets/members.png";
import HomeLayout from "../Layout/HomeLayout";

function Dashboard() {
  return (
    // Main Container
    
      <div className="min-h-screen bg-gradient-to-br  from-gray-900 via-gray-950 to-black text-gray-100 p-10">
        {/* Top Header */}
        <div className="text-center mb-14">
          
          <p className="text-gray-400 mt-2">
            Monitor platform insights at a glance
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-indigo-500/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Members"
              />
              <div>
                <h2 className="text-xl font-semibold text-indigo-400">
                  Members
                </h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">63</span>
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
          <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-6">
              <img
                className="border border-gray-600 rounded-full w-15 h-15 object-cover shadow-lg"
                src={memberImg}
                alt="Subscriptions"
              />
              <div>
                <h2 className="text-xl font-semibold text-purple-400">
                  Active Plan
                </h2>
                <p>
                  Active: <span className="text-cyan-300 font-medium">28</span>
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
                <h2 className="text-xl font-semibold text-yellow-200">Expired Plan</h2>
                <p>
                  Total: <span className="text-cyan-300 font-medium">102</span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
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
                  Total: <span className="text-cyan-300 font-medium">102</span>
                </p>
              </div>
            </div>
          </div>

           {/* Card 5 */}
          <div className="group relative bg-gradient-to-br from-gray-800/70 to-gray-900/60 border border-gray-700 backdrop-blur-xl rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:scale-105">
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
                  Total: <span className="text-cyan-300 font-medium">102</span>
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    

  );
}

export default Dashboard;
