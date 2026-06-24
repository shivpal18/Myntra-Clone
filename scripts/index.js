let currentItems = [...items];
let bagItems;
let wishlistItems = [];

onLoad();

function onLoad() {
    let bagItemStr = localStorage.getItem('bagItems');
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];

    let wishlistItemStr = localStorage.getItem('wishlistItems');
    wishlistItems = wishlistItemStr ? JSON.parse(wishlistItemStr) : [];

    displayItemOnHomePage();
    displayBagIcon();
    searchItems();
    sortItems();
    displayWishlistIcon();
} 

function addToBag(itemId) {
    if (!bagItems.includes(itemId)) {
        bagItems.push(itemId);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
        displayBagIcon();
        showToast('✅ Item Added to Bag');
    } else{
        showToast('⚠️ Item Already in Bag');
    }
}

function displayBagIcon() {
    let bagItemsCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        console.log('I am here');
        bagItemsCountElement.style.visibility = 'visible';
        bagItemsCountElement.innerText = bagItems.length;
    } else {
        bagItemsCountElement.style.visibility = 'hidden';
    }
}

function showToast(message) {
    let toast = document.getElementById('toast');

    if (!toast) return;

    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function displayItemOnHomePage() {
    let itemsContainerElement = document.querySelector('.items-container');
    if(!itemsContainerElement) {
        return;
    }
    let innerHTML = '';
    items.forEach(item => {
        innerHTML += `
    <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <span class="wishlist-icon" onclick="toggleWishlist(this, '${item.id}')">
            ${wishlistItems.includes(item.id) ? '❤️' : '🤍'}
        </span>
        <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag('${item.id}')">Add to Bag</button>
    </div>`
    });
    itemsContainerElement.innerHTML = innerHTML;
}

function searchItems() {
    let searchElement = document.getElementById('search-input');
    if (!searchElement) return;

    searchElement.addEventListener('input', () => {
        let searchText = searchElement.value.toLowerCase();

        let filteredItems = items.filter(item =>
            item.company.toLowerCase().includes(searchText) ||
            item.item_name.toLowerCase().includes(searchText)
        );

        currentItems = filteredItems;

        displayFilteredItems(currentItems);
    });
}

function displayFilteredItems(filteredItems) {
    let itemsContainerElement = document.querySelector('.items-container');
    if (filteredItems.length === 0) {
    itemsContainerElement.innerHTML = `
        <div class="no-products">
            <h2>😔 No Products Found</h2>
            <p>Try another search term.</p>
        </div>
    `;
    return;
    }

    let innerHTML = '';

    filteredItems.forEach(item => {
        innerHTML += `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="item image">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag('${item.id}')">
                Add to Bag
            </button>
        </div>`;
    });

    itemsContainerElement.innerHTML = innerHTML;
}

function sortItems() {
    let sortSelect = document.getElementById('sort-select');

    if (!sortSelect) return;
    sortSelect.addEventListener('change', () => {
        let sortedItems = [...currentItems];

        if (sortSelect.value === 'low-high') {
            sortedItems.sort((a, b) => a.current_price - b.current_price);
        }

        else if (sortSelect.value === 'high-low') {
            sortedItems.sort((a, b) => b.current_price - a.current_price);
        }

        else if (sortSelect.value === 'rating') {
            sortedItems.sort((a, b) => b.rating.stars - a.rating.stars);
        }

        currentItems = sortedItems;
        displayFilteredItems(sortedItems);
    });
}

function toggleWishlist(icon, itemId) {
    if (icon.innerText === '🤍') {
        icon.innerText = '❤️';
        wishlistItems.push(itemId);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } else {
        icon.innerText = '🤍';
        wishlistItems = wishlistItems.filter(id => id !== itemId);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
    displayWishlistIcon();
}

function displayWishlistIcon() {
    let wishlistCountElement = document.querySelector('.wishlist-item-count');

    if (wishlistItems.length > 0) {
        wishlistCountElement.style.visibility = 'visible';
        wishlistCountElement.innerText = wishlistItems.length;
    } else {
        wishlistCountElement.style.visibility = 'hidden';
    }
}