const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user.routes'); //de la linea 8 a la 10 sirve para importar rutas//
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', authRoutes);
app.use('/api/v1/', projectRoutes);

module.exports = app;
