// app.js
document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const drink = document.getElementById('drink').value;
    const quantity = document.getElementById('quantity').value;

    await fetch('/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drink, quantity })
    });

    document.getElementById('order-form').reset();
    loadOrders();
});

async function loadOrders() {
    const response = await fetch('/orders');
    const orders = await response.json();
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = '';
    
    orders.forEach(order => {
        const li = document.createElement('li');
        li.className = 'order-item';
        li.textContent = `${order.drink} - ${order.quantity} db (${order.status})`;
        orderList.appendChild(li);
    });
}

loadOrders();
