import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Feather from 'feather-icons-react/build/IconComponents/Feather';
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const MainMenu = () => {
  return (
    <div className="bg-light">
      <section className="d-flex align-items-center">
        <Container className="position-relative">
            <Card className="shadow-lg border-0 rounded-lg mt-5">
                <Card.Body className="p-5">
                    <h1 className="fs-4 mb-4">Bienvenido al sistema de restuarante</h1>
                    <Row>
                        <Col>
                            <FeatherIcon icon="user" size="50" className="m-2" />
                            <Button variant="primary" className="btn-block" href="/usuarios">Usuarios</Button>
                        </Col>
                        <Col>
                            <FeatherIcon icon="shopping-cart" size="50" className="m-2" />
                            <Button variant="primary" className="btn-block" href="/platillos">Platillos</Button>    
                        </Col>
                        <Col>
                            <FeatherIcon icon="dollar-sign" size="50" className="m-2" />
                            <Button variant="primary" className="btn-block" href="/ventas">Ventas</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
      </section>

    </div>
  );
};

export default MainMenu;

