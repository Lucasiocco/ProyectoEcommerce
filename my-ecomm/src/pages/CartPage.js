import React from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';

const CartPage = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <Container>
      <h1 className="text-center my-5">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">No hay productos en el carrito.</p>
      ) : (
        <ListGroup>
          {cart.map((product, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={8}>{product.name}</Col>
                <Col md={2}>${product.price}</Col>
                <Col md={2}>
                  <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <h3 className="text-end mt-4">Total: ${totalPrice}</h3>
    </Container>
  );
}

export default CartPage;
