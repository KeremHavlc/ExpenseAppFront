import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPages from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import CategoryPage from "./Pages/CategoryPage";
import AddExpensePage from "./Pages/AddExpensePage";
import AllExpensePage from "./Pages/AllExpensePage";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AllCategoryPage from "./Pages/AllCategoryPage";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPages/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/dashboard" element={<DashboardPage/>} />
      <Route path="/categories" element={<CategoryPage/>} />
      <Route path="/expenses/add" element={<AddExpensePage />} />
      <Route path="/expenses/all" element={<AllExpensePage />} />
      <Route path="/categories/add" element={<AddCategoryPage />} />
      <Route path="/categories/all" element={<AllCategoryPage />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
