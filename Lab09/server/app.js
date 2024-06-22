const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

function fibonacci(num) {
    if (num <= 0) return [0];

    const numsFibonacci = [0, 1];

    let nextFib = numsFibonacci[numsFibonacci.length - 1] + numsFibonacci[numsFibonacci.length - 2];
    
    while (nextFib <= num) {
        numsFibonacci.push(nextFib);
        nextFib = numsFibonacci[numsFibonacci.length - 1] + numsFibonacci[numsFibonacci.length - 2];
    }

    return numsFibonacci;
}

app.get('/fibonacci', (req, res) => {
    const number = parseInt(req.query.number, 10);

    if (isNaN(number) || number < 0) {
        return res.status(400).json({ error: 'El parámetro debe ser un número entero mayor o igual a 0' });
    }

    const numsFibonacci = fibonacci(number);
    res.json(numsFibonacci);
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
