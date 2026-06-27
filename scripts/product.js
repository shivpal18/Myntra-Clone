const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = items.find(item => item.id == productId);
let quantity = 1;
if (product) {
    document.getElementById("product-img").src = "../" + product.image;

    document.getElementById("product-company").innerText =
        product.company;

    document.getElementById("product-name").innerText =
        product.item_name;

    document.getElementById("product-rating").innerHTML =
        `⭐ ${product.rating.stars} (${product.rating.count} Ratings)`;

    document.getElementById("current-price").innerText =
        `₹${product.current_price}`;

    document.getElementById("original-price").innerText =
        `₹${product.original_price}`;

    document.getElementById("discount").innerText =
        `${product.discount_percentage}% OFF`;

    document.getElementById("add-bag-btn").addEventListener("click", function () {
        addToBag(product.id, quantity);
    });

    const wishlistBtn = document.getElementById("wishlist-btn");

    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

    // Page load hote hi button text set karo
    if (wishlistItems.includes(product.id)) {
        wishlistBtn.innerHTML = "💔 Remove";
    } else {
        wishlistBtn.innerHTML = "❤️ Wishlist";
    }

    wishlistBtn.addEventListener("click", function () {

        if (wishlistItems.includes(product.id)) {

            wishlistItems = wishlistItems.filter(id => id != product.id);
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

            wishlistBtn.innerHTML = "❤️ Wishlist";
            showToast("💔 Removed from Wishlist");

        } else {

            wishlistItems.push(product.id);
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

            wishlistBtn.innerHTML = "💔 Remove";
            showToast("❤️ Added to Wishlist");
        }

        displayWishlistIcon();
    });
}

const quantityValue = document.getElementById("quantity-value");

document.getElementById("increase-qty").addEventListener("click", () => {
    quantity++;
    quantityValue.innerText = quantity;
});

document.getElementById("decrease-qty").addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityValue.innerText = quantity;
    }
});

let relatedContainer = document.querySelector(".related-products-container");

let relatedProducts = items.filter(item => item.id != productId).slice(0, 4);

let relatedHTML = "";

relatedProducts.forEach(item => {

    relatedHTML += `
        <div class="related-card" onclick="openRelatedProduct('${item.id}')">

            <img src="../${item.image}" alt="${item.item_name}">

            <div class="related-info">

                <div class="related-company">
                    ${item.company}
                </div>

                <div class="related-name">
                    ${item.item_name}
                </div>

                <div class="related-price">
                    ₹${item.current_price}
                </div>

            </div>

        </div>
    `;

});

relatedContainer.innerHTML = relatedHTML;

function openRelatedProduct(id) {
    window.location.href = `product.html?id=${id}`;
}