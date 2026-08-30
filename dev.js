/* =========================
   ELEMENTS
========================= */

const body = document.body;

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");


/* =========================
   THEME ENGINE
========================= */

function applyTheme(theme) {

    if (theme === "light") {

        body.classList.add("light-mode");
        body.classList.remove("dark-mode");

        themeIcon.textContent = "☾";

    } else {

        body.classList.add("dark-mode");
        body.classList.remove("light-mode");

        themeIcon.textContent = "☀";
    }

    localStorage.setItem("devstudio-theme", theme);
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("devstudio-theme") || "dark";

applyTheme(savedTheme);


/* Toggle theme */

themeBtn.addEventListener("click", () => {

    const isLight =
        body.classList.contains("light-mode");

    applyTheme(isLight ? "dark" : "light");

});


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const isOpen =
        navLinks.classList.contains("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
});


/* Close menu after clicking link */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* =========================
   SCROLL SPY
========================= */

const sections =
    document.querySelectorAll("main section[id]");


const observerOptions = {
    root: null,
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
};


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navItems.forEach(link => {

                        link.classList.remove("active");

                    });

                    const activeLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        observerOptions
    );


sections.forEach(section => {
    observer.observe(section);
});