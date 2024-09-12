// Importa Firebase y los servicios que vayas a usar
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"; // Importar Firestore
import { getStorage } from "firebase/storage"; // Importar Firebase Storage


// Configuración de Firebase de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyClKGf2GjyD0Tu3Q3ahxTYZH376pfq6wUE",
    authDomain: "ropaurbana-b0085.firebaseapp.com",
    projectId: "ropaurbana-b0085",
    storageBucket: "ropaurbana-b0085.appspot.com",
    messagingSenderId: "393250780585",
    appId: "1:393250780585:web:b1c5ec8b8359a616d9c0b8",
    measurementId: "G-JZQDYP2YP5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app); // Autenticación
const db = getFirestore(app); // Base de datos Firestore
const storage = getStorage(app); // Almacenamiento de Firebase

// Exportar los servicios
export { auth, db, storage };
