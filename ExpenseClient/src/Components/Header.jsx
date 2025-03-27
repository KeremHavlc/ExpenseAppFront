import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("https://localhost:7247/api/Auths/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });
      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        const msg = data.message;
        console.log(msg);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    if (window.confirm("Çıkmak istediğinize emin misiniz?")) {
      logout(); // Kullanıcı "Evet" derse logout işlemi yapılır.
    }
  };

  return (
    <div className="h-[90px] bg-gray-800 text-white flex items-center px-6 justify-between shadow-md ">
      {/* Sol kısım - Expense */}
      <button onClick={() => back()} className="cursor-pointer text-2xl font-bold select-none">
        ExpenseApp
      </button>
      

      {/* Orta kısım - Arama Kutusu */}
      <input
        type="text"
        className="border border-gray-600 bg-gray-800 text-white rounded-2xl w-[400px] px-4 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
        placeholder="Search Category..."
      />

      {/* Sağ kısım - Profile & Logout */}
      <div className="flex items-center space-x-6 select-none">
        <h2 className="cursor-pointer border border-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition">
          Profile
        </h2>
        <h2
          onClick={back}
          className="cursor-pointer border border-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          LogOut
        </h2>
      </div>
    </div>
  );
};

export default Header;
