const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const planoRoutes = require('./routes/planoRoutes');
const noticiaRoutes = require('./routes/noticiaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/planos', planoRoutes);
app.use('/api/noticias', noticiaRoutes);

module.exports = app;
