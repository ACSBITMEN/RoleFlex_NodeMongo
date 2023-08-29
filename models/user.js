// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    DNI: { type: String, required: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    rol: { type: String, enum: ['Administrador', 'Empleado', 'Cliente'], required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    nombreUsuario: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
