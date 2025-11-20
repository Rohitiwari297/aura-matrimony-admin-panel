import React, { useEffect, useState } from "react";
import { token } from "../important_Links/url.js";
import { getApi, createApi, updateApi } from "../important_Links/api.js";

function ManagePlans() {
  // State for Modal
  const [createPlan, setCreatePlan] = useState(false);
  const [updatePlan, setUpdatePlan] = useState(false);

  // State for Plan Details
  const [planDetails, setPlanDetails] = useState([]);

  // States for Create Plan
  const [planName, setPlanName] = useState("");
  const [planRate, setPlanRate] = useState();
  const [validityDays, setValidityDays] = useState();
  const [maxMessageRequests, setMaxMessageRequests] = useState();

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  console.log('selectedPlanId',selectedPlanId);
  


    // Get API Call
  useEffect(() => {
    const endUrl = "subscriptionPlans/all";
    return getApi(token, setPlanDetails, endUrl);
  }, []);

  // Handle Create Plan
  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: planName,
        price: planRate,
        validity_days: validityDays,
        maxMessageRequests: maxMessageRequests,
      };

      const endUrl = "subscriptionPlans/create";
      await createApi(token, endUrl, body);

      // Refresh list
      await getApi(token, setPlanDetails, "subscriptionPlans/all");

      // Reset values
      setPlanName("");
      setPlanRate("");
      setValidityDays("");
      setMaxMessageRequests("");

      // Close modal
      setCreatePlan(false);



    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  // Handle Update Plan
  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: planName,
        price: planRate,
        validity_days: validityDays,
        maxMessageRequests: maxMessageRequests,
      };
      
      console.log('selectedPlanId',selectedPlanId);
      // const endUrl = `subscriptionPlans/update/${selectedPlanId}`;
      await updateApi(token, `subscriptionPlans/edit/${selectedPlanId}`, body);
      
      // Refresh list
      await getApi(token, setPlanDetails, "subscriptionPlans/all");

      // Reset values
      setPlanName("");
      setPlanRate("");
      setValidityDays("");
      setMaxMessageRequests("");

      // Close modal
      setUpdatePlan(false);

    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  // Handle Delete Plan
  const handleDeletePlan = async (id) => {
    try {
      const endUrl = `subscriptionPlans/delete/${id}`;
      await deleteApi(token, endUrl, id);
      await getApi(token, setPlanDetails, "subscriptionPlans/all");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

/**
 * From here starts the UI 
 * And all the functions
 */
  // UI of Manage Plans
  return (
    <div className='min-h-screen bg-gradient-to-b  from-gray-900 via-gray-950 to-black text-gray-100 "'>
      <div className="flex flex-col p-5 border border-gray-600 w-full h-fit rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 ">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Manage Plans
          </h1>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setCreatePlan(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Create Plan
            </button>
            {/* <button
              onClick={() => setUpdatePlan(true)}
              className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition"
            >
              Update Plan
            </button> */}
          </div>
        </div>

        {/* Plans Section */}
        <h2 className="text-xl font-semibold mb-4 text-gray-300 border-t p-5 border-gray-600 pb-4">
          Available Plans
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {planDetails.map((plan) => (
            <div
              key={plan._id}
              className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500 transition shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-2">Plan {plan.name}</h3>
              {/* <p className="text-gray-400 text-sm mb-4">
                This is a description for plan {plan}.
              </p> */}

              <div className=" flex justify-between">
                <p className="text-gray-400 text-sm mb-4">
                  Max People Connection :
                </p>
                <p> {plan.maxMessageRequests} </p>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <span className="text-green-400 font-semibold">
                  ₹{plan.price}
                </span>
                <div className="flex gap-2">
                <button
                  type="cancel"
                  className="px-4 py-2 rounded-lg bg-green-400 hover:bg-green-500 transition text-white"
                  onClick={() => {
                    setPlanName(plan.name);
                    setPlanRate(plan.price);
                    setValidityDays(plan.validity_days);
                    setMaxMessageRequests(plan.maxMessageRequests);
                    setUpdatePlan(true);
                    setSelectedPlanId(plan._id);
                  }}
                >
                  Edit
                </button>
                <button className="px-3 py-1 rounded-lg bg-red-400 hover:bg-red-500 transition"
                  onClick={() => handleDeletePlan(plan._id)}
                >
                  Delete
                </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* model for the create plan */}
      {createPlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-100">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create New Plan
            </h2>
            {/* Form submission and input fields with handlers functions */}
            <form onSubmit={handleCreatePlan}>
              <div className="mb-4">
                <label htmlFor="planName" className="block text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
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
                  value={planRate}
                  onChange={(e) => setPlanRate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="planPrice" className="block text-white">
                  Validity (in days)
                </label>
                <input
                  type="number"
                  id="planPrice"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
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
                  value={maxMessageRequests}
                  onChange={(e) => setMaxMessageRequests(e.target.value)}
                />
              </div>
              <div className="flex justify-between ">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                >
                  Create Plan
                </button>
                <button
                  type="cancel"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* model for the update plan */}
      {updatePlan && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-100">
            <h2 className="text-2xl font-bold mb-4 text-white">Update Plan</h2>
            <form onSubmit={handleUpdatePlan}>
              <div className="mb-4">
                <label htmlFor="planName" className="block text-white">
                  Plan Name
                </label>
                <input
                  type="text"
                  id="planName"
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
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
                  value={planRate}
                  onChange={(e) => setPlanRate(e.target.value)}
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
                  value={maxMessageRequests}
                  onChange={(e) => setMaxMessageRequests(e.target.value)}
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                >
                  Update Plan
                </button>
                <button
                  type="cancel"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-white"
                  onClick={() => setUpdatePlan(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePlans;
