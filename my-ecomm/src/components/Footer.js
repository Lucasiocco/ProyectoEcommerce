import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <img src='./img/logoUrban.png' width="70%"/>
            <p>La mejor tienda de ropa urbana unisex.</p>
          </Col>
          <Col md={4}>
            <h5>Nuestras Redes</h5>
            <ul className="list-unstyled">
              <li><a href="" className="text-white"><i class="bi bi-instagram"></i>Instagram</a></li>
              <li><a href="" className="text-white"><i class="bi bi-tiktok"></i>Tik Tok</a></li>
              <li><a href="" className="text-white"><i class="bi bi-twitter-x"></i>Twitter</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacta con Nosotros</h5>
            <p>Email: contacto@urbanshop.com</p>
            <p>Teléfono: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col md={12} className="text-center">
            <p>&copy; {new Date().getFullYear()} Urban Shop. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
