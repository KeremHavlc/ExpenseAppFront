import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, Spin, Empty } from "antd";
import { Pie, Bar } from "@ant-design/charts";
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
          `https://localhost:7247/api/Expenses/GetExpensesAllByUserId`,
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

  // Kategori dağılım verisini işle
  const processCategoryData = () => {
    const categoryMap = new Map();

    // Önce kategorileri hazırla
    categories.forEach((category) => {
      categoryMap.set(category.id, {
        name: category.categoryName, // categoryName kullan
        total: 0,
      });
    });

    // Harcamaları işle
    expenses.forEach((expense) => {
      const categoryInfo = categoryMap.get(expense.categoryId);
      if (categoryInfo) {
        categoryInfo.total += expense.amount;
      } else {
        // Eşleşmeyen kategoriler için
        console.warn(`Kategori bulunamadı: ${expense.categoryId}`);
      }
    });

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    return Array.from(categoryMap.values()).map((category) => ({
      type: category.name || "Belirsiz Kategori",
      value:
        totalAmount > 0 ? ((category.total / totalAmount) * 100).toFixed(2) : 0,
    }));
  };

  // Aylık veri işlemede tarih kontrolü
  const processMonthlyData = () => {
    const monthlyData = {};

    expenses.forEach((expense) => {
      try {
        const date = new Date(expense.expenseDate);
        if (isNaN(date)) return;

        const month = date.toLocaleString("tr-TR", { month: "long" }); // Türkçe ay isimleri
        monthlyData[month] = (monthlyData[month] || 0) + expense.amount;
      } catch (e) {
        console.error("Hatalı tarih:", expense.expenseDate);
      }
    });

    return Object.entries(monthlyData).map(([month, amount]) => ({
      month: month.charAt(0).toUpperCase() + month.slice(1), // İlk harfi büyük
      amount: Math.round(amount),
    }));
  };

  // Pie grafik konfigürasyonunu güncelle
  const pieConfig = {
    data: processCategoryData(),
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: (datum) => {
        return `${datum.type}: ${datum.value}%`;
      },
    },
    tooltip: {
      showTitle: false,
      fields: ["type", "value"],
      formatter: (datum) => {
        return {
          name: datum.type || "Belirsiz Kategori",
          value: `${datum.value}% (₺${(
            (datum.value * expenses.reduce((sum, e) => sum + e.amount, 0)) /
            100
          ).toFixed(2)})`,
        };
      },
    },
  };

  // Bar grafik konfigürasyonunu güncelle
  const barConfig = {
    data: processMonthlyData(),
    xField: "amount",
    yField: "month",
    tooltip: {
      showTitle: false,
      formatter: (datum) => {
        return {
          name: datum.month || "Belirsiz Ay",
          value: `₺${datum.amount}`,
        };
      },
    },
  };

  const CardComponent = ({ icon, title, value, color }) => (
    <Card>
      <Statistic
        title={title}
        value={value}
        precision={2}
        valueStyle={{ color }}
        prefix={icon}
      />
    </Card>
  );

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

          {/* İstatistik Kartları */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <CardComponent
                icon={<DollarOutlined />}
                title="Toplam Harcama"
                value={expenses.reduce((sum, e) => sum + e.amount, 0)}
                color="#3f8600"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardComponent
                icon={<ShopOutlined />}
                title="Toplam Kategori"
                value={categories.length}
                color="#1890ff"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CardComponent
                icon={<TagOutlined />}
                title="Ort. Harcama"
                value={
                  expenses.length > 0
                    ? (
                        expenses.reduce((sum, e) => sum + e.amount, 0) /
                        expenses.length
                      ).toFixed(2)
                    : 0
                }
                color="#722ed1"
              />
            </Col>
          </Row>

          {/* Grafikler */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} md={12}>
              <Card title="Kategori Dağılımı (%)">
                {expenses.length > 0 ? (
                  <Pie {...pieConfig} />
                ) : (
                  <Empty description="Veri bulunamadı" />
                )}
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Aylık Harcamalar">
                {expenses.length > 0 ? (
                  <Bar {...barConfig} />
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
