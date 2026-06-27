function toggleTheme() {
    let themeIcon = document.querySelector('#theme-toggle .action_icon');

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.innerText = 'light_mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.innerText = 'dark_mode';
    }
}

document.addEventListener("DOMContentLoaded", function () {

    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    let themeBtn = document.getElementById("theme-toggle");

    if (themeBtn) {

        let icon = themeBtn.querySelector(".action_icon");

        if (icon) {
            icon.innerText = document.body.classList.contains("dark-mode")
                ? "light_mode"
                : "dark_mode";
        }

        themeBtn.addEventListener("click", toggleTheme);
    }

    const profileToggle = document.getElementById("profile-toggle");
    const profileDropdown = document.getElementById("profile-dropdown");

    if (profileToggle && profileDropdown) {

        profileToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function () {
            profileDropdown.classList.remove("show");
        });

    }

    displayBagIcon();
    displayWishlistIcon();  

});

function displayBagIcon() {

    let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

    let bagCount = bagItems.reduce((total, item) => {
        return total + Number(item.quantity);
    }, 0);

    let bagIcon = document.querySelector(".bag-item-count");

    if (!bagIcon) return;

    if (bagCount > 0) {
        bagIcon.style.visibility = "visible";
        bagIcon.innerText = bagCount;
    } else {
        bagIcon.style.visibility = "hidden";
    }
}

function displayWishlistIcon() {

    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

    let wishlistIcon = document.querySelector(".wishlist-item-count");

    if (!wishlistIcon) return;

    if (wishlistItems.length > 0) {
        wishlistIcon.style.visibility = "visible";
        wishlistIcon.innerText = wishlistItems.length;
    } else {
        wishlistIcon.style.visibility = "hidden";
    }
}