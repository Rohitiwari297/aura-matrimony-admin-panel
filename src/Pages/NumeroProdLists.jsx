import React, { useEffect } from "react";
import img from "../assets/members.png";
import axios from "axios";
import { token } from "../important_Links/url.js";
import {
  createNumeroProduct,
  getNumeroProduct,
} from "../important_Links/api.js";


function NumeroProdLists() {

  // STATES
  const [isOpen, setIsOpen] = React.useState(false);
  const [productsList, setProductsList] = React.useState([]);
  const [inputDetails, setInputDetails] = React.useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // GET NUMERO PRODUCTS
  useEffect(() => {
    getNumeroProduct(setProductsList, token);
  }, []);

  // CREATE NUMERO PRODUCTS
  const createHandler = async () => {
    const formData = new FormData();
    formData.append("image", inputDetails.image);
    formData.append("title", inputDetails.title);
    formData.append("price", inputDetails.price);
    formData.append("description", inputDetails.description);

    try {
      // WAIT for API
      const newProduct = await createNumeroProduct(formData, token);

      // UPDATE UI with BACKEND DATA
      setProductsList((prev) => [...prev, newProduct]);

      // RESET form AFTER success
      setInputDetails({
        image: null,
        title: "",
        price: "",
        description: "",
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  // UI
  return (
    <div className=' min-h-screen bg-gradient-to-b  from-gray-900 via-gray-950 to-black text-gray-100 "'>
      <div className="flex flex-col p-5 border  border-gray-600 w-full h-fit rounded-2xl">
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder=" Search..."
            className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ml-5"
          />
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
        <hr className="mt-5 text-gray-600" />
        <div className="mt-5">
          <h1 className="pb-5">Numero Products List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {productsList.map((items, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-6 rounded-2xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800 hover:border-purple-500 transition shadow-lg backdrop-blur-sm"
              >
                <img
                  src={
                    `${import.meta.env.VITE_BASE_URL}${items.image?.url}` ||
                    `${import.meta.env.VITE_BASE_URL}${items.image?.path}`
                  }
                  alt=""
                  className="rounded-full size-12"
                />
                <h2 className="text-[14px] font-semibold text-gray-100 mt-2">
                  {items.title}
                </h2>
                <p className="text-[12px] text-gray-400 mt-1"> Description</p>
                <p className="text-sm text-gray-400 mt-1">
                  {items.price || "Rs. 300"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* model for the creating product */}
      {isOpen === true && (
        <div className="fixed inset-1 flex items-center justify-center  z-50">
          <div className="bg-gray-800 p-8  rounded-lg shadow-lg w-[400px]">
            <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-gray-500"
              type="file"
              src=""
              alt=""
              onChange={(e) =>
                setInputDetails({ ...inputDetails, image: e.target.files[0] })
              }
            />
            <input
              type="text"
              placeholder="Product Title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={inputDetails.title}
              onChange={(e) =>
                setInputDetails({ ...inputDetails, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Product Description"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={inputDetails.description}
              onChange={(e) =>
                setInputDetails({
                  ...inputDetails,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Product Price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={inputDetails.price}
              onChange={(e) =>
                setInputDetails({ ...inputDetails, price: e.target.value })
              }
            />
            <div className="flex justify-between">
              <button
                onClick={() => createHandler()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Create
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumeroProdLists;
