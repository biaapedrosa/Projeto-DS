const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

app.get('/', (req, res) => {
  res.json({ message: '✅ API Clínica de Nutrição funcionando!' });
});

module.exports = app;