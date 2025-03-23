import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPages from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPages/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
