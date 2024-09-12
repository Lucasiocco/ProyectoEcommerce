import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebaseConfig'; // Asegúrate de haber configurado Firestore y Storage
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // Obtener datos del usuario desde Firestore
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          setImageURL(userDoc.data().profileImage || '');
          setHistory(userDoc.data().purchaseHistory || []);
        }
        setLoading(false);
      };
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/auth');
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (profileImage) {
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(imageRef, profileImage);
      const downloadURL = await getDownloadURL(imageRef);
      setImageURL(downloadURL);
      await setDoc(doc(db, 'users', user.uid), { profileImage: downloadURL }, { merge: true });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { name, birthdate, email } = e.target.elements;
    const updatedData = {
      name: name.value,
      birthdate: birthdate.value,
      email: email.value,
    };
    await setDoc(doc(db, 'users', user.uid), updatedData, { merge: true });
    setUserData(updatedData);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Container className="mt-5">
      <div className="user-profile-grid">
        <div className="profile-form">
          <h1 className="display-4">Perfil del Usuario</h1>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userData.name || ''}
                name="name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={userData.email || user.email}
                name="email"
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                defaultValue={userData.birthdate || ''}
                name="birthdate"
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Guardar Cambios
            </Button>
          </Form>
        </div>
        
        <div className="profile-image">
          <h2 className="display-4">Imagen de Perfil</h2>
          <Form.Group className="mb-3">
            <Form.Control type="file" onChange={handleImageChange} />
            <Button variant="primary" onClick={handleUpload}>
              Subir Imagen
            </Button>
          </Form.Group>
          {imageURL && <img src={imageURL} alt="Perfil" width="150" />}
        </div>
      </div>
      
      <hr />

      <div className="purchase-history">
        <h2>Historial de Compras</h2>
        {history.length > 0 ? (
          <ul>
            {history.map((purchase, index) => (
              <li key={index}>
                {purchase.date} - {purchase.items.join(', ')} - Total: ${purchase.total}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay compras registradas.</p>
        )}
      </div>

      <hr />
      
      <Button variant="danger" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Container>
  );
};

export default UserProfile;

