// Random Order ID

let orderId = "MN" + Math.floor(Math.random() * 100000000);

document.getElementById("order-id").innerText = orderId;

// Continue Shopping

document
.getElementById("continue-shopping")
.addEventListener("click", () => {

    window.location.href = "../index.html";

});