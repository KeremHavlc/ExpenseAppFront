import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RouteControl = ({ children }) => {
  const authToken = Cookies.get("authToken"); // Cookie'den authToken'ı alıyoruz
  console.log("authToken:", authToken); // Cookie'yi kontrol etmek için log ekledik

  // Eğer authToken yoksa ya da geçersizse (boşsa), kullanıcıyı login sayfasına yönlendir
  if (!authToken || authToken === "") {
    return <Navigate to="/login" />;
  }

  return children; // Eğer geçerli token varsa, sayfayı render et
};

export default RouteControl;
