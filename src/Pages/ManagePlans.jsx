import React, { useState } from "react";

function ManagePlans() {
   const [createPlan, setCreatePlan] = useState(false);
   const [updatePlan, setUpdatePlan] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-b  from-gray-900 via-gray-950 to-black text-gray-100 "'>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Manage Plans
          </h1>

          {/* Buttons */}
          <div className="flex gap-4">
            <button onClick={ () => setCreatePlan(true)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
              Create Plan
            </button>
            <button onClick={ () => setUpdatePlan(true)} className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition">
              Update Plan
            </button>
          </div>
        </div>

        {/* Plans Section */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Available Plans
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((plan) => (
            <div
              key={plan}
              className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500 transition shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-2">Plan {plan}</h3>
              {/* <p className="text-gray-400 text-sm mb-4">
                This is a description for plan {plan}.
              </p> */}

              <div className=" flex justify-between">
                <p className="text-gray-400 text-sm mb-4">
                  Max People Connection :
                </p>
                <p> 10 </p>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <span className="text-green-400 font-semibold">
                  ₹199 / month
                </span>
                <button className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* model for the create plan */}
      {createPlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create New Plan
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="planName" className="block text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planPrice" className="block text-white">
                  Plan Price
                </label>
                <input
                  type="number"
                  id="planPrice"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planPrice" className="block text-white">
                  Max People Connection
                </label>
                <input
                  type="number"
                  id="planPrice"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
              >
                Create Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* model for the update plan */}
      {updatePlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Update Plan
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="planName" className="block text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planPrice" className="block text-white">
                  Plan Price
                </label>
                <input
                  type="number"
                  id="planPrice"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planPrice" className="block text-white">
                  Max People Connection
                </label>
                <input
                  type="number"
                  id="planPrice"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
              >
                Update Plan
              </button>
            </form>
          </div>
        </div>
      )}

    </div>

  );
}

export default ManagePlans;
