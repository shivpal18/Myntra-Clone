const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');

    if (bagItemObjects.length === 0) {
        bagSummaryElement.innerHTML = '';
        return;
    }

    let totalItem = bagItemObjects.reduce(
        (total, item) => total + item.quantity,
        0
    );
    let totalMRP = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price * bagItem.quantity
        totalDiscount +=
            (bagItem.original_price - bagItem.current_price) * bagItem.quantity;
    });

    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

    bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>

            <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">Rs ${totalMRP}</span>
            </div>

            <div class="price-item">
                <span class="price-item-tag">Discount on MRP</span>
                <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
            </div>

            <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">Rs ${CONVENIENCE_FEES}</span>
            </div>

            <hr>

            <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
        </div>

        <button class="btn-place-order" onclick="goToCheckout()">
            <div class="css-xjhrni">PLACE ORDER</div>
        </button>
    `;
}

function loadBagItemObjects() {

    bagItemObjects = bagItems.map(bagItem => {
        let product = items.find(item => item.id == bagItem.id);
        return {
            ...product,
            quantity: bagItem.quantity
        };
    });
}

function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');
    let headingElement = document.querySelector('.bag-heading');

    let totalItems = bagItemObjects.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
    headingElement.innerText = `Shopping Bag (${totalItems} Items)`;

    if (bagItemObjects.length === 0) {
        headingElement.innerText = '';
        containerElement.innerHTML = `
            <div class="empty-bag">
                <div class="empty-bag-icon">🛒</div>
                
                <h2>Your Bag is Empty 😔</h2>
                <p>Add some items to continue shopping.</p>
                <a href="../index.html">
                    <button class="btn-place-order">Continue Shopping</button>
                </a>
            </div>
        `;
        return;
    }

    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });

    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
    bagItems = bagItems.filter(item => item.id != itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    let formattedDate = deliveryDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return  `<div class="bag-item-container">
        <div class="item-left-part">
            <img class="bag-item-img" src="../${item.image}">
        </div>
        <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
            </div>
            <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${formattedDate}</span>
            </div>
            <div class="bag-quantity">
                <button onclick="decreaseQuantity('${item.id}')">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')">+</button>
            </div>
        </div>

        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>`;
}

function increaseQuantity(itemId) {

    let item = bagItems.find(item => item.id == itemId);

    if (item) {
        item.quantity++;
    }

    localStorage.setItem("bagItems", JSON.stringify(bagItems));

    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
}

function decreaseQuantity(itemId) {

    let item = bagItems.find(item => item.id == itemId);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        bagItems = bagItems.filter(item => item.id != itemId);

    }

    localStorage.setItem("bagItems", JSON.stringify(bagItems));

    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
    displayBagIcon();
}

function goToCheckout() {

    if (bagItems.length === 0) {
        alert("Your Bag is Empty");
        return;
    }

    window.location.href = "checkout.html";
}