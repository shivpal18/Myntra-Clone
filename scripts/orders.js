// Theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

displayBagIcon();
displayWishlistIcon();

let ordersContainer = document.querySelector(".orders-container");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {

    ordersContainer.innerHTML = `
        <div class="empty-orders">

            <div style="font-size:70px;">📦</div>

            <h2>No Orders Yet</h2>

            <p>Your placed orders will appear here.</p>

            <a href="../index.html">

                <button>
                    Continue Shopping
                </button>

            </a>

        </div>
    `;

}
else{

    let html = "";

    orders.forEach(order => {

        html += `

        <div class="order-card">

            <img src="../${order.image}" alt="${order.item_name}">

            <div class="order-details">

                <div class="order-company">
                    ${order.company}
                </div>

                <div class="order-name">
                    ${order.item_name}
                </div>

                <div class="order-price">
                    ₹${order.current_price}
                </div>

                <div class="order-status">
                    ✅ ${order.status}
                </div>

                <div class="order-date">
                    <strong>Order ID:</strong> ${order.orderId}
                </div>

                <div class="order-date">
                    <strong>Order Date:</strong> ${order.orderDate}
                </div>

                <div class="order-date">
                    <strong>Quantity:</strong> ${order.quantity}
                </div>

                <div class="order-date">
                    <strong>Payment:</strong> ${order.paymentMethod}
                </div>

            </div>

        </div>

        `;

    });

    ordersContainer.innerHTML = html;

}