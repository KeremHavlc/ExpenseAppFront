import React, { useState, useEffect } from "react";
import {
  PlusCircleFilled,
  LockFilled,
  DashboardFilled,
} from "@ant-design/icons";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DemoPage = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const generateChartData = () => {
    const monthlyData = {};
    const categoryData = {};

    categories.forEach((cat) => (categoryData[cat] = 0));

    expenses.forEach((expense) => {
      // Tarihe göre ay bilgisi çıkar
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) + parseFloat(expense.amount);
      categoryData[expense.category] += parseFloat(expense.amount);
    });

    return {
      spendingData: Object.keys(monthlyData).map((month) => ({
        month,
        amount: monthlyData[month],
      })),
      categoryData: Object.keys(categoryData).map((type) => ({
        type,
        value: categoryData[type],
      })),
    };
  };

  const { spendingData, categoryData } = generateChartData();

  const spendingChartData = {
    labels: spendingData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Spending ($)",
        data: spendingData.map((data) => data.amount),
        borderColor: "#4f46e5",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const categoryChartData = {
    labels: categoryData.map((data) => data.type),
    datasets: [
      {
        label: "Category Distribution",
        data: categoryData.map((data) => data.value),
        backgroundColor: [
          "#6366f1",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        hoverBackgroundColor: [
          "#818cf8",
          "#34d399",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
        ],
      },
    ],
  };

  const handleSave = () => {
    if (description && amount && category && date) {
      const newExpense = {
        description,
        amount: parseFloat(amount),
        category,
        date, // Seçilen tarihi kullan
      };

      setExpenses([...expenses, newExpense]);
      setDescription("");
      setAmount("");
      setDate("");
    }
  };
  const navigate = useNavigate(); // Initialize navigate hook

  const handleGetStarted = () => {
    navigate("/register"); // Redirect to the register page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Financial Management Demo
        </h1>

        {/* Demo Dashboard */}
        <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-700">
          {/* Control Panel */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Expense Form */}
            <div className="bg-gray-700 p-6 rounded-xl flex-1 hover:border-blue-400 border border-gray-600 transition-all">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PlusCircleFilled className="text-blue-400 text-2xl" />
                Add Expense
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400"
                />
                <input
                  type="number"
                  placeholder="Amount ($)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-600 rounded-lg px-4 py-2 text-gray-100"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-600 rounded-lg px-4 py-2 text-gray-100"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-600 rounded-lg px-4 py-2 text-gray-100"
                  required
                />
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg w-full transition-colors"
                >
                  Save Expense
                </button>
              </div>
            </div>

            {/* Security Info */}
            <div className="bg-gray-700 p-6 rounded-xl flex-1 border border-gray-600 hover:border-purple-400 transition-all">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LockFilled className="text-purple-400 text-2xl" />
                Secure Demo
              </h3>
              <p className="text-gray-400 leading-relaxed">
                All data is anonymized and reset after session.
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <DashboardFilled className="text-green-400 text-2xl" />
                Monthly Spending Trend
              </h3>
              <Line
                data={spendingChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: "#fff" },
                    },
                  },
                  scales: {
                    x: {
                      ticks: { color: "#fff" },
                      grid: { color: "#374151" },
                    },
                    y: {
                      ticks: {
                        color: "#fff",
                        callback: (value) => `$${value}`,
                      },
                      grid: { color: "#374151" },
                    },
                  },
                }}
              />
            </div>

            <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-semibold mb-6">
                Category Distribution
              </h3>
              <Pie
                data={categoryChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: "#fff" },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2024 FinanceApp. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoPage;
