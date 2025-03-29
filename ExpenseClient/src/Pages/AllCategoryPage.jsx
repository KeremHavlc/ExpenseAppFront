import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Pagination, Button, Modal, notification } from "antd";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://localhost:7247/api/Categories/GetAllCategories",
        {
          withCredentials: true,
        }
      );

      if (Array.isArray(response.data)) {
        setCategories(response.data || []);
        setTotalCategories(response.data.length || 0);
      } else {
        console.error(
          "Expected an array of categories, but got:",
          response.data
        );
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const deleteCategory = (categoryId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: async () => {
        try {
          // Kategori ID'sini URL parametresi olarak gönderiyoruz
          await axios.post(
            `https://localhost:7247/api/Categories/DeleteCategory?categoryId=${categoryId}`, // URL parametresiyle
            {},
            {
              withCredentials: true,
            }
          );
          notification.success({
            message: "Category Deleted",
            description: "The category has been deleted successfully.",
          });
          fetchCategories(currentPage); // Silme işleminden sonra kategorileri güncelliyoruz
        } catch (error) {
          console.error("Error Deleting Category:", error);
          notification.error({
            message: "Error Deleting Category",
            description: "There was an error while deleting the category.",
          });
        }
      },
    });
  };

  const editCategory = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  const handleEditOk = async () => {
    try {
      await axios.put(
        `https://localhost:7247/api/Categories/${selectedCategory.id}`,
        selectedCategory
      );
      notification.success({
        message: "Category Updated",
        description: "The category has been updated successfully.",
      });
      setIsModalVisible(false);
      fetchCategories(currentPage);
    } catch (error) {
      notification.error({
        message: "Error Updating Category",
        description: "There was an error while updating the category.",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            All Categories
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories && categories.length > 0 ? (
              categories
                .slice((currentPage - 1) * 8, currentPage * 8)
                .map((category) => (
                  <Card
                    key={category.id}
                    title={category.categoryName}
                    bordered={false}
                    className="shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <p>
                      Created At:{" "}
                      {new Date(category.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Button
                        type="primary"
                        size="medium"
                        onClick={() => editCategory(category)}
                        className="bg-blue-500 hover:bg-blue-700 text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        type="default"
                        size="medium"
                        onClick={() => deleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-700 text-white "
                        style={{ backgroundColor: "red" }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))
            ) : (
              <p className="text-gray-500">Henüz kategori bulunmamaktadır.</p>
            )}
          </div>

          <Pagination
            current={currentPage}
            total={totalCategories}
            pageSize={8}
            onChange={(page) => setCurrentPage(page)}
            className="mt-6 text-center"
          />
        </div>
      </div>

      <Modal
        title="Edit Category"
        visible={isModalVisible}
        onOk={handleEditOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Category Name</label>
          <input
            type="text"
            value={selectedCategory?.categoryName || ""}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory,
                categoryName: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      </Modal>
    </>
  );
};

export default AllCategoriesPage;
