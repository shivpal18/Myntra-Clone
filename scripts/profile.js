let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

window.onload = function () {

    let totalBagItems = bagItems.reduce((total, item) => total + Number(item.quantity), 0);

    document.getElementById("bag-count").textContent = totalBagItems;
    document.getElementById("wishlist-count").textContent = wishlistItems.length;

    console.log("Bag:", totalBagItems);
    console.log("Wishlist:", wishlistItems.length);

    let savedName = localStorage.getItem("profileName");
    let savedEmail = localStorage.getItem("profileEmail");

    if (savedName) {
        document.getElementById("profile-name").innerText = savedName;
    }

    if (savedEmail) {
        document.getElementById("profile-email").innerText = savedEmail;
    }

    loadSavedAddress();
};

// Profile Elements
const editBtn = document.getElementById("edit-profile-btn");
const modal = document.getElementById("edit-profile-modal");

const saveBtn = document.getElementById("save-profile");
const closeBtn = document.getElementById("close-profile");

const editName = document.getElementById("edit-name");
const editEmail = document.getElementById("edit-email");
const editPhone = document.getElementById("edit-phone");

// Open Modal
editBtn.addEventListener("click", () => {

    editName.value = localStorage.getItem("profileName") || "Shivpal Chaurasiya";
    editEmail.value = localStorage.getItem("profileEmail") || "shivpal@example.com";
    editPhone.value = localStorage.getItem("profilePhone") || "";

    modal.style.display = "flex";
});

// Close Modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Save Profile
saveBtn.addEventListener("click", () => {

    localStorage.setItem("profileName", editName.value);
    localStorage.setItem("profileEmail", editEmail.value);
    localStorage.setItem("profilePhone", editPhone.value);

    document.getElementById("profile-name").innerText = editName.value;
    document.getElementById("profile-email").innerText = editEmail.value;

    modal.style.display = "none";
});

// Profile Photo Upload

const photoUpload = document.getElementById("photo-upload");
const profilePhoto = document.getElementById("profile-photo");

// Saved Photo Load
const savedPhoto = localStorage.getItem("profilePhoto");

if (savedPhoto) {
    profilePhoto.src = savedPhoto;
}

// Upload Photo
photoUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        profilePhoto.src = e.target.result;
        localStorage.setItem("profilePhoto", e.target.result);
    };
    reader.readAsDataURL(file);
});

// Address Elements
const addressBtn = document.getElementById("address-btn");
const editAddressBtn = document.getElementById("edit-address-btn");
const addressModal = document.getElementById("address-modal");

const saveAddressBtn = document.getElementById("save-address");
const closeAddressBtn = document.getElementById("close-address");

const fullName = document.getElementById("full-name");
const phoneNumber = document.getElementById("phone-number");
const houseNumber = document.getElementById("house-number");
const street = document.getElementById("street");
const city = document.getElementById("city");
const state = document.getElementById("state");
const pincode = document.getElementById("pincode");

// Open Address Popup

function openAddressModal() {
    fullName.value = localStorage.getItem("addressFullName") || "";
    phoneNumber.value = localStorage.getItem("addressPhone") || "";
    houseNumber.value = localStorage.getItem("addressHouse") || "";
    street.value = localStorage.getItem("addressStreet") || "";
    city.value = localStorage.getItem("addressCity") || "";
    state.value = localStorage.getItem("addressState") || "";
    pincode.value = localStorage.getItem("addressPincode") || "";

    addressModal.style.display = "flex";
}

addressBtn.addEventListener("click", openAddressModal);
editAddressBtn.addEventListener("click", openAddressModal);

// Close Popup
closeAddressBtn.addEventListener("click", () => {
    addressModal.style.display = "none";
});

// Save Address
saveAddressBtn.addEventListener("click", () => {

    localStorage.setItem("addressFullName", fullName.value);
    localStorage.setItem("addressPhone", phoneNumber.value);
    localStorage.setItem("addressHouse", houseNumber.value);
    localStorage.setItem("addressStreet", street.value);
    localStorage.setItem("addressCity", city.value);
    localStorage.setItem("addressState", state.value);
    localStorage.setItem("addressPincode", pincode.value);

    alert("✅ Address Saved Successfully");
    loadSavedAddress();
    addressModal.style.display = "none";
});

function loadSavedAddress() {

    let fullName = localStorage.getItem("addressFullName");
    let phone = localStorage.getItem("addressPhone");
    let house = localStorage.getItem("addressHouse");
    let street = localStorage.getItem("addressStreet");
    let city = localStorage.getItem("addressCity");
    let state = localStorage.getItem("addressState");
    let pincode = localStorage.getItem("addressPincode");

    let addressText = document.getElementById("saved-address-text");

    if (!fullName) {
        addressText.innerText = "No Address Added";
        return;
    }

    addressText.innerText =
`${fullName}
${phone}

${house}
${street}

${city}, ${state}
${pincode}`;
}