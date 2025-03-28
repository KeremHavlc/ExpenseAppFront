import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Pagination,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const AllExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 9;

  useEffect(() => {
    axios
      .get("https://localhost:7247/api/Expenses/GetExpensesAllByUserId", {
        withCredentials: true,
      })
      .then((response) => setExpenses(response.data))
      .catch((error) =>
        console.error("Harcama verileri alınırken hata oluştu:", error)
      );

    axios
      .get("https://localhost:7247/api/Categories/GetAllCategories", {
        withCredentials: true,
      })
      .then((response) => setCategories(response.data))
      .catch((error) =>
        console.error("Kategori verileri alınırken hata oluştu:", error)
      );
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post(
        `https://localhost:7247/api/Expenses/DeleteExpense?id=${id}`,
        null,
        { withCredentials: true }
      );
      setExpenses(expenses.filter((expense) => expense.id !== id));
      message.success("Harcama başarıyla silindi.");
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      message.error("Harcama silinirken hata oluştu.");
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    form.setFieldsValue({
      title: expense.title,
      amount: expense.amount,
      description: expense.description,
      expenseDate: expense.expenseDate,
      categoryId: String(expense.categoryId),
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const { title, amount, description, expenseDate, categoryId } = values;
      await axios.post(
        `https://localhost:7247/api/Expenses/UpdateExpense/${editingExpense.id}`,
        {
          title,
          amount,
          description,
          expenseDate,
          categoryId,
        },
        { withCredentials: true }
      );

      setExpenses(
        expenses.map((expense) =>
          expense.id === editingExpense.id ? { ...expense, ...values } : expense
        )
      );
      message.success("Harcama başarıyla güncellendi.");
      setIsModalVisible(false);
    } catch (error) {
      console.error("Güncelleme işlemi sırasında hata oluştu:", error);
      message.error("Harcama güncellenirken hata oluştu.");
    }
  };

  const currentData = expenses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-200">
          <h1 className="text-3xl font-bold mb-4">All Expenses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentData.map((expense) => {
              const categoryName =
                categories.find(
                  (category) => category.id === expense.categoryId
                )?.categoryName || "Bilinmiyor";
              const truncatedDescription =
                expense.description?.length > 80
                  ? `${expense.description.substring(0, 80)}...`
                  : expense.description || "Açıklama yok";

              return (
                <Card key={expense.id} className="shadow-md p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold">{expense.title}</h3>
                    <p
                      className="text-gray-600 truncate"
                      style={{ maxHeight: "40px", overflow: "hidden" }}
                    >
                      {truncatedDescription}
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="text-green-600 font-bold">
                      ₺{expense.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(expense.expenseDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      {categoryName}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button type="primary" onClick={() => handleEdit(expense)}>
                      Düzenle
                    </Button>
                    <Button danger onClick={() => handleDelete(expense.id)}>
                      Sil
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={expenses.length}
              pageSize={pageSize}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Düzenle"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="title"
            label="Başlık"
            rules={[{ required: true, message: "Başlık girin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="amount"
            label="Tutar"
            rules={[{ required: true, message: "Tutar girin!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="expenseDate"
            label="Tarih"
            rules={[{ required: true, message: "Tarih girin!" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="description" label="Açıklama">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Kategori"
            rules={[{ required: true, message: "Kategori seçin!" }]}
          >
            <Select placeholder="Kategori seçin" allowClear>
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalVisible(false)}>İptal</Button>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AllExpensePage;
