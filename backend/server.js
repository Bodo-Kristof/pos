// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Szerver létrehozása
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Adatbázis létrehozása és inicializálása
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, drink TEXT, quantity INTEGER, status TEXT DEFAULT 'Készül')");
});

// Rendelés hozzáadása
app.post('/order', (req, res) => {
    const { drink, quantity } = req.body;
    db.run("INSERT INTO orders (drink, quantity) VALUES (?, ?)", [drink, quantity], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Order added successfully', id: this.lastID });
    });
});

// Rendelések lekérdezése
app.get('/orders', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
