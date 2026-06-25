function applyTheme() {
    let savedTheme = localStorage.getItem("theme");
    let icon = document.querySelector("#theme-toggle .action_icon");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (icon) icon.innerText = "light_mode";
    } else {
        document.body.classList.remove("dark-mode");
        if (icon) icon.innerText = "dark_mode";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    let icon = document.querySelector("#theme-toggle .action_icon");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        if (icon) icon.innerText = "light_mode";
    } else {
        localStorage.setItem("theme", "light");
        if (icon) icon.innerText = "dark_mode";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();

    let themeBtn = document.getElementById("theme-toggle");

    if (themeBtn) {
        themeBtn.addEventListener("click", toggleTheme);
    }
});