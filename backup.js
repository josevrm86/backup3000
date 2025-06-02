// backup.js
const admin = require('firebase-admin');
const fs = require('fs');

// Carga las credenciales desde variables de entorno
const serviceAccount1 = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: 'https://destinosagentes-default-rtdb.firebaseio.com/'
}, 'app1');

const db = app1.database();

async function listUsersRealtimeDB() {
  const snapshot = await db.ref('usuarios').once('value');
  const users = snapshot.val();
  if (!users) {
    console.log('No hay usuarios en la colección.');
    return;
  }
  Object.entries(users).forEach(([id, data]) => {
    console.log(`ID: ${id} =>`, data);
  });
}

// Ejecuta solo la función para listar usuarios en Realtime Database
listUsersRealtimeDB().catch(err => {
  console.error(err);
  process.exit(1);
});