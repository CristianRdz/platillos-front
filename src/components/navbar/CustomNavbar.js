import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../../services/auth/context/AuthContext";

const CustomNavbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Navbar bg="success" className="shadow" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link className="text-white btn-danger m-1" href="/">
            Menú <FeatherIcon icon="menu" size={18} />
          </Nav.Link>
        </Nav>
        <Button variant="outline-light" className="m-1" onClick={() => {
            logout();
            window.location.href = "/";
          }
        }>
          Cerrar sesión <FeatherIcon icon="log-out" size={18} />
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
