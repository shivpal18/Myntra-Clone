let wishlistItemObjects = [];

onLoad();

function onLoad() {
    let wishlistItemStr = localStorage.getItem('wishlistItems');
    wishlistItems = wishlistItemStr ? JSON.parse(wishlistItemStr) : [];

    loadWishlistItems();
    displayWishlistItems();
}

function loadWishlistItems() {
    wishlistItemObjects = wishlistItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });

    console.log(wishlistItemObjects);
}

function displayWishlistItems() {
    let containerElement = document.querySelector('.bag-items-container');
    let headingElement = document.querySelector('.bag-heading');

    if (wishlistItemObjects.length === 0) {
        containerElement.innerHTML = `
            <div class="empty-bag">
                <div class="empty-bag-icon">❤️</div>
                <h2>Your Wishlist is Empty</h2>
                <p>Save your favourite items here.</p>
                <a href="../index.html">
                    <button class="btn-place-order">Continue Shopping</button>
                </a>
            </div>
        `;
        headingElement.style.display = 'none';
        return;
    }

    headingElement.style.display = 'block';
    headingElement.innerText = `❤️ My Wishlist (${wishlistItemObjects.length} Items)`;
    let innerHTML = '';

    wishlistItemObjects.forEach(item => {
        console.log(item.image);
        innerHTML += `
        <div class="bag-item-container" style="position: relative;">
            <div class="item-left-part">
                <img class="bag-item-img" src="../${item.image}">
            </div>

            <div class="item-right-part">
                <div class="remove-from-wishlist" onclick="removeFromWishlist('${item.id}')">✕</div>
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price-container">
                    <span class="current-price">Rs ${item.current_price}</span>
                </div>
                <button class="move-to-bag-btn" onclick="moveToBag('${item.id}')">
                    Move to Bag
                </button>
            </div>
        </div>
        `;
    });

    containerElement.innerHTML = innerHTML;
}

function removeFromWishlist(itemId) {
    wishlistItems = wishlistItems.filter(id => id !== itemId);

    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

    loadWishlistItems();
    displayWishlistItems();
    displayWishlistIcon();
}

function moveToBag(itemId) {
    let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

    if (!bagItems.includes(itemId)) {
        bagItems.push(itemId);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
    }

    wishlistItems = wishlistItems.filter(id => id !== itemId);
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

    loadWishlistItems();
    displayWishlistItems();
    displayWishlistIcon();
}