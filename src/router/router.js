import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomNavbar from "../components/navbar/CustomNavbar";
import Login from "../components/usuarios/login";
import { AuthContext } from "../services/auth/context/AuthContext";
import Menu from "../components/menu/menu";
import GestionUsuarios from "../components/usuarios/GestionUsuarios";
import GestionPlatillos from "../components/platillos/GestionPlatillos";
import VerPlatillos from "../components/platillos/VerPlatillos";
import VerGanancias from "../components/ordenes/VerGanancias";
import HistorialOrdenes from "../components/ordenesPlatillos/HistorialOrdenes";

export default function Router() {
  const { userInfo, splashLoading } = React.useContext(AuthContext);
  return (
    <BrowserRouter>
      {splashLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : userInfo.token && userInfo.user.usuario.rol.id_rol === 2 ? (
        <>
          <CustomNavbar />
          <Routes>
            <Route
              path="/"
              element={<Menu />}
            />
            <Route path="/platillos" element={<VerPlatillos />} />
            <Route path="/historial" element={<HistorialOrdenes />} />
            <Route
              path="*"
              element={<h1 className="text-center">404 no encontrado</h1>}
            />
          </Routes>
        </>
      ) : userInfo.token && userInfo.user.usuario.rol.id_rol === 1 ? (
        <>
          <CustomNavbar />
          <Routes>
            <Route
              path="/"
              element={<Menu />}
            />
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/platillos" element={<GestionPlatillos />} />
            <Route path="/ventas" element={<VerGanancias />} />
            <Route
              path="*"
              element={<h1 className="text-center">404 no encontrado</h1>}
            />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route
            path="*"
            element={<h1 className="text-center">404 no encontrado</h1>}
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
