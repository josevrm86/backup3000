// backup.js
const admin = require('firebase-admin');
const fs = require('fs');

// Carga las credenciales desde variables de entorno
const serviceAccount1 = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
}, 'app1');

const db1 = app1.firestore();

async function listUsers() {
  const snapshot = await db1.collection('usuarios').get();
  if (snapshot.empty) {
    console.log('No hay usuarios en la colección.');
    return;
  }
  snapshot.forEach(doc => {
    console.log(`ID: ${doc.id} =>`, doc.data());
  });
}

// Ejecuta solo la función para listar usuarios
listUsers().catch(err => {
  console.error(err);
  process.exit(1);
});