import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  return (
    <Navbar data-bs-theme="dark" style={{ backgroundColor: "#1c1c1c", color: "#fff" }}>
    <Container className="d-flex justify-content-center">
      <Navbar.Brand href="">
        <img
              src="./img/logoUrban.png"
              className="d-inline-block align-top"
              alt="Urban logo"
        />
        </Navbar.Brand>
      <Nav className="mx-auto" variant="underline" defaultActiveKey="/home">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/shop">Shop</Nav.Link>
        <Nav.Link href="/cart">Cart</Nav.Link>
        <Nav.Link href="/profile">User</Nav.Link>
      </Nav>
      <Nav>
         <Nav.Link className="btnLog" href="/auth">Login</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};

export default NavigationBar;


