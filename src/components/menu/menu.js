import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Feather from "feather-icons-react/build/IconComponents/Feather";
import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { AuthContext } from "../../services/auth/context/AuthContext";

const MainMenu = () => {
  const { userInfo, isLoading, logout } = React.useContext(AuthContext);
  return (
    <div className="bg-light">
      <section className="d-flex align-items-center">
        <Container className="position-relative">
          <Card className="shadow-lg border-0 rounded-lg mt-5">
            <Card.Body className="p-5">
              <h1 className="fs-4 mb-4">
                Bienvenido al sistema de restaurante{" "}
                {userInfo.user.usuario.nombre}
              </h1>
              <div className="d-flex flex-wrap flex-row justify-content-center mt-2">
                {userInfo.user.usuario.rol.id_rol === 1 ? (
                  <>
                    <Col>
                      <FeatherIcon icon="user" size="50" className="m-2" />
                      <Button
                        variant="primary"
                        className="btn-block"
                        href="/usuarios"
                      >
                        Usuarios
                      </Button>
                    </Col>
                    <Col>
                      <FeatherIcon
                        icon="shopping-cart"
                        size="50"
                        className="m-2"
                      />
                      <Button
                        variant="primary"
                        className="btn-block"
                        href="/platillos"
                      >
                        Platillos
                      </Button>
                    </Col>
                    <Col>
                      <FeatherIcon
                        icon="dollar-sign"
                        size="50"
                        className="m-2"
                      />
                      <Button
                        variant="primary"
                        className="btn-block"
                        href="/ventas"
                      >
                        Ventas
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col>
                      <FeatherIcon
                        icon="book-open"
                        size="50"
                        className="m-2"
                      />
                      <Button
                        variant="primary"
                        className="btn-block"
                        href="/platillos"
                      >
                       Ver platillos para ordenar
                      </Button>
                    </Col>
                    <Col>
                      <FeatherIcon
                        icon="clock"
                        size="50"
                        className="m-2"
                      />
                      <Button
                        variant="primary"
                        className="btn-block"
                        href="/historial"
                      >
                        Historial de ordenes
                      </Button>
                    </Col>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default MainMenu;
