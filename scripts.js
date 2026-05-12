document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.style.display = "none", 500);
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Scroll Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Run once on load

    // 4. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCounter(el), 1);
        } else {
            el.innerText = target;
        }
    };

    // Intersection Observer for counters
    const obsOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, obsOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Mobile Menu (Basic toggle)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if(hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            // Add style to show menu if active
            if(navMenu.classList.contains("active")) {
                navMenu.style.display = "flex";
                navMenu.style.flexDirection = "column";
                navMenu.style.position = "absolute";
                navMenu.style.top = "100%";
                navMenu.style.left = "0";
                navMenu.style.width = "100%";
                navMenu.style.background = "#08090a";
                navMenu.style.padding = "2rem";
            } else {
                navMenu.style.display = "none";
            }
        });
    }
});
