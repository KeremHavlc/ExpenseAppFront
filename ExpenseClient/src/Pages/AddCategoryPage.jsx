import React, { useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false); // Reset success state before submission
    try {
      const response = await axios.post(
        "https://localhost:7247/api/Categories/AddCategory",
        { categoryName: categoryName },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setCategoryName("");
        setMessage("Category added successfully!");
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error details:", error.response || error.message);

      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "An error occurred.");
      } else {
        setMessage("An error occurred.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-lg font-medium text-gray-700"
                htmlFor="categoryName"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleCategoryNameChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
              />
            </div>

            {message && (
              <p
                className={`${
                  isSuccess ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategoryPage;
