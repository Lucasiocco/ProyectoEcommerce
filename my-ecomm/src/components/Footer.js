import React from 'react';
import { Container, Row, Col, } from 'react-bootstrap';

const Footer = () => {
  return (
<footer className="footer py-5 mt-auto" style={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
  <Container>
    <Row className="justify-content-center text-center">
      <Col md={4} className="mb-3">
        <img src='./img/logoUrban.png' width="60%" alt="Urban Shop Logo" />
      </Col>
      <Col md={4} className="mb-3">
        <h5 className="mb-4">Nuestras Redes</h5>
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="me-3"><a href="#" className="text-white"><i className="bi bi-instagram"></i></a></li>
          <li className="me-3"><a href="#" className="text-white"><i className="bi bi-tiktok"></i></a></li>
          <li><a href="#" className="text-white"><i className="bi bi-twitter-x"></i></a></li>
        </ul>
      </Col>
      <Col md={4} className="mb-3">
        <h5 className="mb-4">Contacta con Nosotros</h5>
        <p>Email: <a href="mailto:contacto@urbanshop.com" className="text-white">contacto@urbanshop.com</a></p>
        <p>Teléfono: <a href="tel:+1234567890" className="text-white">+123 456 7890</a></p>
      </Col>
    </Row>
    <Row className="pt-4">
      <Col md={12} className="text-center">
        <hr style={{ borderTop: '1px solid #555' }} />
        <p className="mb-0">&copy; {new Date().getFullYear()} Urban Shop. Todos los derechos reservados.</p>
      </Col>
    </Row>
  </Container>
</footer>
  );
}

export default Footer;
