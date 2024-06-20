const mongoose = require('mongoose');
const fs = require('fs');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/panaderia', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y el modelo de Producto
const productSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    descripción: String,
    precio: Number,
    imagen: String
});

const Product = mongoose.model('Product', productSchema);

// Leer el archivo JSON
const productos = JSON.parse(fs.readFileSync('productos.json', 'utf-8'));

// Insertar los productos en la base de datos
Product.insertMany(productos)
    .then(() => {
        console.log('Productos cargados correctamente');
        mongoose.connection.close();  // Cerrar la conexión a MongoDB
    })
    .catch(err => {
        console.error('Error al cargar productos:', err);
        mongoose.connection.close();  // Cerrar la conexión a MongoDB en caso de error
    });