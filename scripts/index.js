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

    let savedTheme = localStorage.getItem('theme');

    let closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);

        document.getElementById('product-modal').addEventListener('click', function(event) {
            if (event.target.id === 'product-modal') {
                closeProductModal();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeProductModal();
            }
        });
    }

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('#theme-toggle .action_icon').innerText = 'light_mode';
    }else {
        document.querySelector('#theme-toggle .action_icon').innerText = 'dark_mode';
    }

    let themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
} 

function addToBag(itemId, quantity = 1) {
    let existingItem = bagItems.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
        showToast(`✅ Quantity Updated (${existingItem.quantity})`);
    } else {
        bagItems.push({
            id: itemId,
            quantity: quantity
        });
        showToast("✅ Item Added to Bag");
    }
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagIcon();
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
    <div class="item-container" onclick="openProduct('${item.id}')">
        <img class="item-image" src="${item.image}" alt="item image">
        <span class="wishlist-icon" onclick="event.stopPropagation(); toggleWishlist(this, '${item.id}')">
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
        <button class="btn-add-bag" onclick="event.stopPropagation(); addToBag('${item.id}')">Add to Bag</button>
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
        showToast('❤️ Added to Wishlist');
        wishlistItems.push(itemId);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } else {
        icon.innerText = '🤍';
        showToast('💔 Removed from Wishlist');
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

function openProductModal(itemId) {

    let selectedItem = items.find(item => item.id == itemId);

    document.getElementById('modal-image').src = selectedItem.image;
    document.getElementById('modal-company').innerText = selectedItem.company;
    document.getElementById('modal-name').innerText = selectedItem.item_name;
    document.getElementById('modal-rating').innerHTML =
    `⭐ ${selectedItem.rating.stars} (${selectedItem.rating.count} Ratings)`;
    document.getElementById('modal-price').innerHTML =
        `₹${selectedItem.current_price}
         <span style="text-decoration:line-through;color:gray;">
            ₹${selectedItem.original_price}
         </span>
         (${selectedItem.discount_percentage}% OFF)`;

    document.getElementById('modal-add-bag').onclick = function () {
        addToBag(itemId);
    };

    document.getElementById('product-modal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function openProduct(itemId) {
    window.location.href = `pages/product.html?id=${itemId}`;
}