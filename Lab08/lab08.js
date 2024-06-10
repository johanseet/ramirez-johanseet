const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Arreglo global para almacenar el presupuesto
let presupuesto = {};

// POST: Guardar usuario
app.post('/api/usuario', (req, res) => {
    const { user, name } = req.body;

    if (!user || !name) {
        return res.status(400).json({ message: 'Usuario y nombre son requeridos' });
    }

    if (presupuesto[user]) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    presupuesto[user] = {
        name,
        presupuesto: []
    };
    console.log(presupuesto)
    res.status(201).json({ message: 'Usuario creado exitosamente' });
});

// POST: Guardar ingreso
app.post('/api/ingreso', (req, res) => {
    const { user, amount, description } = req.body;
    const type = 'ingreso'

    if (!user || !amount || !description) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (!presupuesto[user]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    presupuesto[user].presupuesto.push({ type, amount, description });

    console.log(presupuesto)
    res.status(201).json({ message: 'Ingreso guardado exitosamente' });
});

// POST: Guardar egreso
app.post('/api/egreso', (req, res) => {
    const { user, amount, description } = req.body;
    const type = 'egreso'

    if (!user || !amount || !description) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (!presupuesto[user]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    presupuesto[user].presupuesto.push({ type, amount, description });

    console.log(presupuesto)
    res.status(201).json({ message: 'Egreso guardado exitosamente' });
});

// GET: Obtener ingresos
app.get('/api/ingresos', (req, res) => {
    const { user } = req.query;

    if (!user || !presupuesto[user]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const ingresos = presupuesto[user].presupuesto
        .filter(item => item.type === 'ingreso')
        .map(({ amount, description }) => ({ amount, description }));

    res.status(200).json(ingresos);
});

// GET: Obtener egresos
app.get('/api/egresos', (req, res) => {
    const { user } = req.query;

    if (!user || !presupuesto[user]) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const egresos = presupuesto[user].presupuesto
        .filter(item => item.type === 'egreso')
        .map(({ amount, description }) => ({ amount, description }));

    res.status(200).json(egresos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
