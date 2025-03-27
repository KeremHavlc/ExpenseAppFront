import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../Utilites/images/bg.png";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch("https://localhost:7247/api/Auths/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        const token = data.accessToken;
        navigate("/home");
      } else {
        console.log("Kullanıcı adı veya şifre hatalı!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }} // Sayfa sağdan gelsin
      animate={{ x: 0 }} // Sayfa normal konumda görünsün
      exit={{ x: "-100%" }} // Sayfa sol tarafa kayarak çıksın
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-screen select-none">
        {/* Sol Kısım */}
        <div
          className="w-2/3 bg-white flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h1 className="text-5xl text-white font-bold">Sign In</h1>
          <div className="mt-7 flex gap-4 text-white">
            <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-white font-bold text-white text-xl">
              f
            </div>
            <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-white font-bold text-white text-xl">
              G+
            </div>
            <div className="w-[55px] h-[55px] border rounded-full flex justify-center items-center border-white font-bold text-white text-xl">
              in
            </div>
          </div>
          <div className="mt-6">
            <h1 className="font-bold text-gray-200">or use your email account</h1>
          </div>
          <div className="mt-6 w-96 p-6 bg-white shadow-lg rounded-lg">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 border-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 border-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => onFinish({ email, password })}
              className="w-full bg-gray-800 text-white py-2 rounded-md text-lg font-bold focus:ring-gray-800 hover:bg-gray-700"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Sağ Kısım */}
        <div className="w-1/3 bg-gray-900 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white mb-4">Hello !</h1>
          <h1 className="text-xl font-bold text-white">
            Enter your personal details
          </h1>
          <h1 className="text-xl font-bold text-white">
            and start your journey with us
          </h1>

          <button
            onClick={() => navigate("/register")}
            className="border-2 border-white w-[250px] h-[50px] rounded-3xl mt-8 text-white text-2xl hover:bg-gray-700"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPages;
