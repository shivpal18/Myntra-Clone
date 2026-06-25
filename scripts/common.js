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

});