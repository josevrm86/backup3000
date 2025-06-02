const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Carga las credenciales desde variables de entorno
const serviceAccount1 = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: 'https://destinosagentes-default-rtdb.firebaseio.com/'
}, 'app1');

const db = app1.database();

async function listAndBackupUsers() {
  const snapshot = await db.ref('usuarios').once('value');
  const users = snapshot.val();
  if (!users) {
    console.log('No hay usuarios en la colección.');
    await app1.delete();
    return;
  }

  // Prepara el backup
  const backupData = {
    uuid: uuidv4(),
    usuarios: users
  };

  // Guarda el backup en la colección "backups"
  const backupsRef = db.ref('backups');
  const newBackupRef = backupsRef.push();
  await newBackupRef.set(backupData);

  console.log('Backup guardado correctamente:', backupData.uuid);

  await app1.delete(); // Cierra la conexión con Firebase
}

// Ejecuta la función
listAndBackupUsers().catch(err => {
  console.error(err);
  process.exit(1);
});