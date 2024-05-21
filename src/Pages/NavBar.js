import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleLogoutClick = () => {
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return (
    <div className="navbar">
      <button className="btn btn-primary menu-button" onClick={handleMenuClick}>
        Menú
      </button>
      <button className="btn btn-danger close-button" onClick={handleLogoutClick}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default NavBar;
