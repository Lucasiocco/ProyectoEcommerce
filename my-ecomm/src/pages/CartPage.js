import React from 'react';
import { useState } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore'; // Importar Firestore
import { db, auth } from '../firebaseConfig'; // Asegúrate de que db esté correctamente configurado en firebaseConfig
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, clearCart }) => {
  const [orderId, setOrderId] = useState(null); // Estado para almacenar el ID de la orden
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

    // Función para confirmar la compra
    const handleConfirmPurchase = async () => {
      if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
  
      try {
        const user = auth.currentUser;
        if (!user) {
          alert('Debes iniciar sesión para confirmar la compra.');
          return;
        }
  
        // Crear una nueva orden en Firestore
        const orderRef = await addDoc(collection(db, 'orders'), {
          userId: user.uid,
          items: cart,
          total: totalPrice,
          date: new Date().toISOString(),
        });
  
        // Guardar el ID de la orden
        setOrderId(orderRef.id);
  
        // Limpiar el carrito
        clearCart();
  
        // Mostrar una alerta y redirigir
        alert(`Compra confirmada. Tu ID de orden es: ${orderRef.id}`);
        navigate('/userprofile'); // Redirigir al perfil del usuario
      } catch (error) {
        console.error('Error confirmando la compra: ', error);
        alert('Hubo un problema al confirmar la compra. Por favor, intenta de nuevo.');
      }
    };

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

      {cart.length > 0 && (
        <div className="text-end mt-4">
          <Button variant="success" onClick={handleConfirmPurchase}>Confirmar Compra</Button>
        </div>
      )}
    </Container>
  );
}

export default CartPage;
