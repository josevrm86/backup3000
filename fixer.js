const fs = require('fs');

// Lee ambos archivos JSON
const destinos = JSON.parse(fs.readFileSync('destinos.json', 'utf8'));
const destinosFixed = JSON.parse(fs.readFileSync('destinos_fixed.json', 'utf8'));

if (!Array.isArray(destinos) || !Array.isArray(destinosFixed) || destinos.length !== destinosFixed.length) {
  console.error('Los archivos deben ser arrays y tener la misma longitud.');
  process.exit(1);
}

const resultado = destinos.map((origen, i) => ({
  origen,
  destino: destinosFixed[i]
}));

fs.writeFileSync('resultado.json', JSON.stringify(resultado, null, 2), 'utf8');

const personas = JSON.parse(fs.readFileSync('usuarios.json', 'utf8'));

// Para cada persona y cada destino seleccionado, busca el primer índice de ese origen en destinos y usa ese índice para obtener el destino fijo
personas.forEach(persona => {
  persona.destinosSeleccionados.forEach(dest => {
    // Busca el índice de este origen en el array destinos
    const idx = destinos.findIndex(d => d === dest.nombre);
    if (idx !== -1) {
      dest.nombre = destinosFixed[idx];
    }
  });
});

fs.writeFileSync('usuarios_actualizados.json', JSON.stringify(personas, null, 2), 'utf8');
console.log('Archivo usuarios_actualizados.json generado correctamente.');