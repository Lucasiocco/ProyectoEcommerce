import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'; // Importar Firestore
import { db } from '../firebaseConfig'; // Importar la configuración de Firestore
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShopPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (products) => {
    try {
      // Llamar a la función addToCart para agregar al carrito
      addToCart(products);

      // Actualizar el stock del producto en Firestore
      const productRef = doc(db, 'products', products.id);
      const newStock = products.stock - 1;

      if (newStock >= 0) {
        await updateDoc(productRef, { stock: newStock });
        // Si el stock se actualiza correctamente, mostrar una alerta de éxito
        toast.success(`Producto ${products.name} agregado al carrito`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        // Si no hay stock suficiente, mostrar una alerta de error
        toast.error(`Stock insuficiente para el producto ${products.name}`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Mostrar una alerta de error si falla alguna operación
      toast.error('Error al agregar el producto al carrito', {
        position: "bottom-right",
        autoClose: 2000,
      });
      console.error('Error al agregar el producto al carrito:', error);
    }
  };


  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <Container>
      <h1 className="display-4">Tienda</h1>
      <Row>
        {products.length > 0 ? (
          products.map(product => (
            <Col key={product.id} md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Precio: ${product.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </Row>
      <ToastContainer />
      <div className="info-section container mt-5">
        <div className="row">
          {/* Medios de Pago */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5 className="card-title">Medios de Pago</h5>
                <p className="card-text">Aceptamos tarjetas de débito, crédito y pagos electrónicos.</p>
                <img src="./img/payment-method.png" alt="Medios de Pago" className="img-fluid" />
              </div>
            </div>
          </div>

          {/* Métodos de Envío */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5 className="card-title">Métodos de Envío</h5>
                <p className="card-text">Envíos a todo el país con opciones exprés a domicilio y estándar a puntos de retiro.</p>
                <img src="./img/delivery-man.png" alt="Métodos de Envío" className="img-fluid" />
              </div>
            </div>
          </div>

          {/* Política de Devoluciones */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h5 className="card-title">Política de Devoluciones</h5>
                <p className="card-text">Tienes hasta 30 días para realizar devoluciones. El producto debe estar sin uso.</p>
                <img src="./img/return-box.png" alt="Política de Devoluciones" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default ShopPage;

