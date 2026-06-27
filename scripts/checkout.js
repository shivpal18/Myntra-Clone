// Theme
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Header Icons
displayBagIcon();
displayWishlistIcon();

// ==========================
// Delivery Address
// ==========================

const deliveryAddress = document.getElementById("delivery-address");

let fullName = localStorage.getItem("addressFullName");
let phone = localStorage.getItem("addressPhone");
let house = localStorage.getItem("addressHouse");
let street = localStorage.getItem("addressStreet");
let city = localStorage.getItem("addressCity");
let state = localStorage.getItem("addressState");
let pincode = localStorage.getItem("addressPincode");

if (fullName) {

    deliveryAddress.innerHTML = `
        <h3>${fullName}</h3>

        <p>${phone}</p>

        <p>${house}</p>

        <p>${street}</p>

        <p>${city}, ${state}</p>

        <p>${pincode}</p>
    `;

} else {

    deliveryAddress.innerHTML = `
        <p>No Address Found</p>

        <a href="profile.html">
            Add Address
        </a>
    `;

}

// ==========================
// Order Summary
// ==========================

let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

let totalMRP = 0;
let totalDiscount = 0;

bagItems.forEach(bagItem => {

    let product = items.find(item => item.id == bagItem.id);

    if (!product) return;

    totalMRP += product.original_price * bagItem.quantity;

    totalDiscount +=
        (product.original_price - product.current_price) *
        bagItem.quantity;

});

const convenienceFee = bagItems.length > 0 ? 99 : 0;

const totalAmount =
    totalMRP - totalDiscount + convenienceFee;

document.getElementById("checkout-summary").innerHTML = `

    <p>Total MRP : ₹${totalMRP}</p>

    <p>Discount : ₹${totalDiscount}</p>

    <p>Convenience Fee : ₹${convenienceFee}</p>

    <hr>

    <h3>Total Amount : ₹${totalAmount}</h3>

`;

// ==========================
// Place Order
// ==========================

document.getElementById("place-order-btn").addEventListener("click", () => {

    if (!fullName) {
        alert("Please Add Address First");
        window.location.href = "profile.html";
        return;
    }

    // Existing Orders
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Save Every Bag Item
    bagItems.forEach(bagItem => {

        let product = items.find(item => item.id == bagItem.id);

        if (!product) return;

        orders.push({

            ...product,

            quantity: bagItem.quantity,

            orderId: "MN-" + Math.floor(100000 + Math.random() * 900000),

            orderDate: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
            }),

            paymentMethod: document.querySelector(
                'input[name="payment"]:checked'
            ).parentElement.innerText.trim(),

            status: "Delivered"

        });

    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // Empty Bag
    localStorage.removeItem("bagItems");

    displayBagIcon();

    window.location.href = "order-success.html";

});