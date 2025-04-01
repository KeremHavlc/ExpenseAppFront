import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Mevcut yolu almak için kullanılıyor

  const handleNavigation = (path) => {
    navigate(path);
  };

  const items = [
    {
      key: "sub1",
      label: "Expenses",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "1",
          label: "Add New Expense",
          icon: <FileAddOutlined />,
          onClick: () => handleNavigation("/expenses/add"),
        },
        {
          key: "2",
          label: "All Expenses",
          icon: <UnorderedListOutlined />,
          onClick: () => handleNavigation("/expenses/all"),
        },
      ],
    },
    {
      key: "sub2",
      label: "Categories",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "3",
          label: "Add New Category",
          icon: <FileAddOutlined />,
          onClick: () => handleNavigation("/categories/add"),
        },
        {
          key: "4",
          label: "All Categories",
          icon: <UnorderedListOutlined />,
          onClick: () => handleNavigation("/categories/all"),
        },
      ],
    },
    {
      key: "sub3",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
      onClick: () => handleNavigation("/dashboard"),
    },
  ];
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
  // Seçili menü öğesini belirlemek için path'ı kontrol et
  const getSelectedKey = () => {
    if (location.pathname.includes("/expenses/add")) {
      return ["1"];
    } else if (location.pathname.includes("/expenses/all")) {
      return ["2"];
    } else if (location.pathname.includes("/categories/add")) {
      return ["3"];
    } else if (location.pathname.includes("/categories/all")) {
      return ["4"];
    } else if (location.pathname.includes("/dashboard")) {
      return ["sub3"];
    }
    return [];
  };
  const getOpenKeys = () => {
    return ["sub1", "sub2", "sub3"]; // Bütün ana başlıkları burada açıyoruz
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg border-t-2">
      {/* Logo */}
      <div
        className="text-3xl font-bold mb-8 text-center cursor-pointer select-none"
        onClick={() => navigate("/home")}
      >
        Logo
      </div>

      {/* Menu */}
      <Menu
        style={{ maxHeight: "800px", overflowY: "auto" }}
        selectedKeys={getSelectedKey()}
        openKeys={getOpenKeys()}
        mode="inline"
        items={items}
        className="rounded-2xl"
      />

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="w-full px-4 py-2 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
          onClick={() => {
            if (window.confirm("Çıkmak istediğinize emin misiniz?")) {
              logout();
            }
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
