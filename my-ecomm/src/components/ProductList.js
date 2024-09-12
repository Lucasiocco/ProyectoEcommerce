import React from 'react';
import ProductCard from './ProductCard';
import { Container, Row, Col } from 'react-bootstrap';

const ProductList = ({ products, addToCart }) => {
  return (
    <Container>
      <h1 className="display-4">Shop</h1>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={6} md={4} lg={3}>
            <ProductCard product={product} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
