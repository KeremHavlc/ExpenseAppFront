import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, Spin, Empty } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarOutlined, ShopOutlined, TagOutlined } from "@ant-design/icons";
import axios from "axios";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const { Title } = Typography;

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    try {
      const [categoriesRes, expensesRes] = await Promise.all([
        axios.get("https://localhost:7247/api/Categories/GetAllCategories", {
          withCredentials: true,
        }),
        axios.get(
          "https://localhost:7247/api/Expenses/GetExpensesAllByUserId",
          {
            withCredentials: true,
          }
        ),
      ]);
      setCategories(categoriesRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const processCategoryData = () => {
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category.id, { name: category.categoryName, total: 0 });
    });
    expenses.forEach((expense) => {
      if (categoryMap.has(expense.categoryId)) {
        categoryMap.get(expense.categoryId).total += expense.amount;
      }
    });
    return Array.from(categoryMap.values());
  };

  const processMonthlyData = () => {
    const monthlyData = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.expenseDate);
      if (!isNaN(date)) {
        const month = date.toLocaleString("tr-TR", { month: "long" });
        monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
      }
    });
    return Object.entries(monthlyData).map(([month, amount]) => ({
      month,
      amount: Math.round(amount),
    }));
  };

  if (loading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-200">
          <Title level={3} className="mb-6">
            Dashboard
          </Title>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Toplam Harcama"
                  value={expenses.reduce((sum, e) => sum + e.amount, 0)}
                  prefix={<DollarOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Toplam Kategori"
                  value={categories.length}
                  prefix={<ShopOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Ort. Harcama"
                  value={(expenses.length > 0
                    ? expenses.reduce((sum, e) => sum + e.amount, 0) /
                      expenses.length
                    : 0
                  ).toFixed(2)}
                  prefix={<TagOutlined />}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Kategori Dağılımı">
                {expenses.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={processCategoryData()}
                        dataKey="total"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {processCategoryData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              "#" +
                              Math.floor(Math.random() * 16777215).toString(16)
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Empty description="Veri bulunamadı" />
                )}
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Aylık Harcamalar">
                {expenses.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={processMonthlyData()}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <Empty description="Veri bulunamadı" />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
