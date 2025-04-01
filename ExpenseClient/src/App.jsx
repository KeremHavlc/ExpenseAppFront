import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPages from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import AddExpensePage from "./Pages/AddExpensePage";
import AllExpensePage from "./Pages/AllExpensePage";
import AddCategoryPage from "./Pages/AddCategoryPage";
import AllCategoryPage from "./Pages/AllCategoryPage";
import DemoPage from "./Pages/DemoPage";
import RouteControl from "./RouteControl";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPages />} />
        <Route
          path="/home"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteControl>
              <DashboardPage />
            </RouteControl>
          }
        />
        <Route
          path="/expenses/add"
          element={
            <RouteControl>
              <AddExpensePage />
            </RouteControl>
          }
        />
        <Route
          path="/expenses/all"
          element={
            <RouteControl>
              <AllExpensePage />
            </RouteControl>
          }
        />
        <Route
          path="/categories/add"
          element={
            <RouteControl>
              <AddCategoryPage />
            </RouteControl>
          }
        />
        <Route
          path="/categories/all"
          element={
            <RouteControl>
              <AllCategoryPage />
            </RouteControl>
          }
        />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
