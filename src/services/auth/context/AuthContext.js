import React, { createContext, useEffect, useState } from "react";
import { fetchClient } from "../../../utils/fetchClient";
import { API_URL } from "../../../utils/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (username, password) => {
    setIsLoading(true);
    fetch(`${API_URL}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: username,
        contrasena: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.user.usuario.status);
        setUserInfo(data.data);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Usuario o contraseña incorrectos");
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = () => {
    setSplashLoading(true);
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
    setSplashLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
