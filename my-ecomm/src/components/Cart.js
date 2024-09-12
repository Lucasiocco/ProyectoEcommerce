import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <Container>
      <h1 className="display-4">Your Cart</h1>
      <ListGroup>
        {cartItems.map(item => (
          <ListGroup.Item key={item.id}>
            {item.name} - ${item.price}
            <Button variant="danger" onClick={() => removeFromCart(item)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Cart;
