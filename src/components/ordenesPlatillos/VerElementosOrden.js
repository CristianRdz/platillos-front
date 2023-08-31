import React, { useEffect } from "react";
import { Container, Card} from "react-bootstrap";
import {
  getOrdenPlatilloByOrden,
} from "../../services/ordenesPlatillos/ordenesPlatillosService";

const VerElementosOrden = (props) => {
  const { orden } = props;
  const [menuData, setMenuData] = React.useState([]);
  async function fetchData() {
    const data = await getOrdenPlatilloByOrden(orden.id_orden);
    setMenuData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <div className="flex justify-center">
        <Card className="m-2">
          <Card.Body>
            <Card.Title>
              Total: ${menuData.reduce((a, b) => a + b.platillo.precio, 0)}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div className="flex justify-center">
        {menuData.map((item) => (
          <Card key={item.id_orden_platillo} className="m-2">
            <Card.Body>
              <Card.Title>{item.platillo.nombre}</Card.Title>
              <Card.Text>Precio: ${item.platillo.precio}</Card.Text>
              <Card.Text>{item.platillo.descripcion}</Card.Text>
              <Card.Text>Categoría: {item.platillo.categoria.nombre}</Card.Text>
              <Card.Text>Notas del cliente: {item.notas}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default VerElementosOrden;
