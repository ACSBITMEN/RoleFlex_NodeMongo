// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://Admin:981209acsb@cluster0.ndn7ydp.mongodb.net/RoleFlex_NodeMongo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    try {
        const { DNI, nombres, apellidos, fechaNacimiento, rol, telefono, correo, contraseña, nombreUsuario } = req.body;
        
/*         console.log("Valor de rol en la solicitud:", rol); // Agregar esta línea
        
        if (!['Administrador', 'Empleado', 'Cliente'].includes(rol)) {
            return res.status(400).json({ message: 'Rol no válido' });
        } */
        
        // Generar una sal y luego usarla para hash
        const saltRounds = 10;

        if (!contraseña) {
            return res.status(400).json({ message: 'Contraseña requerida' });
        }
        
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
        
        const newUser = new User({
            DNI,
            nombres,
            apellidos,
            fechaNacimiento,
            rol,
            telefono,
            correo,
            contraseña: hashedPassword,
            nombreUsuario
        });
        
        await newUser.save();
        
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Hubo un error al registrar usuario' });
        }
    });

    // Ruta para obtener información de un usuario por su ID
app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.status(200).json(user);
        } catch (error) {
        console.error('Error al consultar usuario:', error);
        res.status(500).json({ message: 'Hubo un error al consultar usuario' });
        }
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
