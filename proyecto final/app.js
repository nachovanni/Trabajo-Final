const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

// Configuración de MongoDB
mongoose.connect('mongodb://localhost/panaderia', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Esquema y modelo de Producto
const productSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    descripción: String,
    precio: Number,
    imagen: String
});

const Product = mongoose.model('Product', productSchema);

// Ruta para obtener los productos
app.get('/', async (req, res) => {
    const productos = await Product.find();
    res.render('index', { productos });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});