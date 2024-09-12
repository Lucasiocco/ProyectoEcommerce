import React from 'react';
import { Container, Button } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Container className="text-center my-5">
      <h1 className="display-4">Welcome to Urban Clothes Shop</h1>
      <p className="lead">Discover the latest trends in urban fashion. Unisex styles for everyone.</p>
      <p className="lead">Nos presentamos como la nueva esencia de la moda urbana. Nuestra marca nace de la pasión por lo auténtico, lo atrevido y lo sin límites. Creemos en el poder de la ropa como una forma de expresión, y por eso diseñamos cada prenda pensando en aquellos que quieren marcar la diferencia.
        En Urban Clothes, combinamos el estilo minimalista con toques futuristas para ofrecerte piezas únicas que no solo te harán lucir bien, sino también sentirte empoderado. Nuestra colección unisex está diseñada para adaptarse a cualquier ocasión, desde las calles de la ciudad hasta tus aventuras más audaces.</p>
      <Button variant="primary" href="/shop" className="btn">Shop Now</Button>
      <div class="container about">
        <div class="img">
        <img src="./img/pop-art.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="img2">
        <img src="./img/color-block.jpg" class="d-block w-100" alt="..." />
        </div>
        <div id="carouselSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./img/young-adults.jpg" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="./img/young-adult.jpg" class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LandingPage;

