// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Táblák létrehozása
db.serialize(() => {
    db.run("CREATE TABLE orders (id INTEGER PRIMARY KEY, drink TEXT, quantity INTEGER, status TEXT DEFAULT 'Készül')");
});

function addOrder(drink, quantity) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO orders (drink, quantity) VALUES (?, ?)", [drink, quantity], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

function getOrders() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { addOrder, getOrders };
