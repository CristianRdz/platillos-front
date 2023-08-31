import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { AuthContext } from "../../services/auth/context/AuthContext";
import {
  getOrdenes,
  getOrdenesUsuario,
  removeOrden,
} from "../../services/ordenes/ordenesService";
import VerElementosOrden from "./VerElementosOrden";

export const HistorialOrdenes = () => {
  const { userInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [ordenes, setOrdenes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const openClose = () => setShowModal((prevState) => !prevState);

  const fetchOrdenes = async () => {
    setLoading(true);
    if (userInfo.user.usuario.id_rol === 1) {
      const ordenes = await getOrdenes();
      setOrdenes(ordenes);
    } else {
      const ordenes = await getOrdenesUsuario(userInfo.user.usuario.id_usuario);
      setOrdenes(ordenes);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrdenes();
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredOrdenes = ordenes.filter((ordenes) =>
    ordenes.fecha_creacion.toLowerCase().includes(searchText.toLowerCase())
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchOrdenes().then(() => setRefreshing(false));
  }, []);

  return (
    <Container style={styles.container}>
      <div style={styles.searchBarContainer}>
        <InputGroup>
          <FormControl
            placeholder="Buscar por fecha..."
            onChange={(e) => handleSearchTextChange(e.target.value)}
            value={searchText}
          />
        </InputGroup>
      </div>

      {filteredOrdenes.length > 0 ? (
        <div className="d-flex flex-wrap flex-row justify-content-center mt-2">
          {filteredOrdenes.map((item) => (
            <Card
              style={styles.ordenesContainer}
              key={item.id_orden}
              className="m-2"
            >
              <Card.Body>
                <div style={styles.ordenesInfo}>
                  <div>
                    <p style={styles.ordenesName}>
                      Fecha creado: {item.fecha_creacion}
                    </p>
                  </div>
                  <div>
                    {item.estatus === true ? (
                      <p style={styles.ordenesText}>Activa</p>
                    ) : (
                      <p style={styles.ordenesText}>Pagado</p>
                    )}
                  </div>
                </div>
                <div style={styles.multipleButtons}>
                <Button
                    className="m-2"
                    variant="primary"
                    onClick={() => {
                      setRenderComponent(
                        <VerElementosOrden orden={item} />
                      );
                      openClose();
                    }}
                  >
                    Ver elementos de la orden
                  </Button>
                  {item.estatus === true ? (
                    <Button
                      variant={item.estatus === true ? "danger" : "success"}
                      onClick={() => {
                        setRenderComponent(
                          <div>
                            <p>¿Estás seguro que deseas pagar esta orden?</p>
                            <div style={styles.multipleButtons}>
                              <Button
                                variant="secondary"
                                onClick={() => openClose()}
                              >
                                Cancelar
                              </Button>
                              <Button
                                className="m-2"
                                variant="success"
                                onClick={async () => {
                                  await removeOrden(item.id_orden);
                                  onRefresh();
                                  openClose();
                                }}
                              >
                                Pagar
                              </Button>
                            </div>
                          </div>
                        );
                        openClose();
                      }}
                    >
                      Pagar
                    </Button>
                  ) : null}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div style={styles.body}>
          <p style={styles.noOrdenesText}>No hay ordenes para mostrar</p>
        </div>
      )}
      <Modal show={showModal} onHide={openClose}>
        <Modal.Body>{renderComponent}</Modal.Body>
      </Modal>
    </Container>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  ordenesContainer: {
    padding: 10,
    marginBottom: "3%",
    borderBottom: "1px solid #ccc",
    borderRadius: 20,
  },
  ordenesName: {
    fontSize: 16,
  },
  ordenesInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ordenesText: {
    fontSize: 14,
    color: "#000",
  },
  multipleButtons: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  noOrdenesText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  body: {
    marginTop: 20,
    padding: 24,
  },
};

export default HistorialOrdenes;
