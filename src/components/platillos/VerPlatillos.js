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
import { getPlatillosActivos } from "../../services/platillos/platillosService";
import FormOrdenesPlatillos from "../ordenesPlatillos/FormOrdenesPlatillos";

export const VerPlatillos = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [platillos, setPlatillos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const openClose = () => setShowModal((prevState) => !prevState);

  const fetchPlatillos = async () => {
    setLoading(true);
    const platillos = await getPlatillosActivos();
    setPlatillos(platillos);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlatillos();
  }, []);

  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const filteredPlatillos = platillos.filter((platillos) =>
    platillos.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPlatillos().then(() => setRefreshing(false));
  }, []);

  return (
    <Container style={styles.container}>
      <div style={styles.searchBarContainer}>
        <InputGroup>
          <FormControl
            placeholder="Buscar por nombre..."
            onChange={(e) => handleSearchTextChange(e.target.value)}
            value={searchText}
          />
        </InputGroup>
      </div>

      {filteredPlatillos.length > 0 ? (
        <div className="d-flex flex-wrap flex-row justify-content-center mt-2">
          {filteredPlatillos.map((item) => (
            <Card
              style={styles.platillosContainer}
              key={item.id_platillo}
              className="m-2"
            >
              <Card.Body>
                <div style={styles.platillosInfo}>
                  <div>
                    <p style={styles.platillosName}>
                      Nombre del platillo: {item.nombre}
                    </p>
                    <p style={styles.platillosText}>
                      Descripción: {item.descripcion}
                    </p>
                    <p style={styles.platillosText}>Precio: {item.precio}</p>
                    <p style={styles.platillosText}>
                      Categoria del platillo: {item.categoria.nombre}
                    </p>
                  </div>
                </div>
                <div style={styles.multipleButtons}>
                  <Button
                    variant={item.estatus === true ? "danger" : "success"}
                    onClick={() => {
                      setRenderComponent(
                        <FormOrdenesPlatillos
                          platillo={item}
                          openClose={openClose}
                        />
                      );
                      openClose();
                    }}
                  >
                    Añadir a la orden
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div style={styles.body}>
          <p style={styles.noPlatillosText}>No hay platillos para mostrar</p>
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
  platillosContainer: {
    padding: 10,
    marginBottom: "3%",
    borderBottom: "1px solid #ccc",
    borderRadius: 20,
  },
  platillosName: {
    fontSize: 16,
  },
  platillosInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  platillosText: {
    fontSize: 14,
    color: "#000",
  },
  multipleButtons: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  noPlatillosText: {
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

export default VerPlatillos;
