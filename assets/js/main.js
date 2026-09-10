// =========================
// RETOUR EN HAUT
// =========================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// =========================
// FAQ
// =========================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        document.querySelectorAll(".faq-item").forEach((item) => {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });

        currentItem.classList.toggle("active");

    });

});
// =========================
// MENU MOBILE
// =========================

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

}
// =========================================
// PRELOADER + ANIMATION DU HERO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(() => {

            preloader.classList.add("hide");

            // Déclenche les animations du site
            document.body.classList.add("page-loaded");

        }, 800);

    } else {

        document.body.classList.add("page-loaded");

    }

});
 // =========================================
 // ANIMATION — CARTES CATÉGORIES
 // =========================================

const categoryCards = document.querySelectorAll(".category-card");

if (categoryCards.length > 0) {

    const categoryObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    categoryCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.12}s`;

        categoryObserver.observe(card);

    });

}
// =========================================
// ANIMATION — CARTES PRODUITS
// =========================================

const productCards = document.querySelectorAll(".product-card");

if (productCards.length > 0) {

    const productObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    productCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.12}s`;

        productObserver.observe(card);

    });

}
// =========================
// ANIMATION À PROPOS
// =========================

const aboutObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const image =
                entry.target.querySelector(".about-image");

            const content =
                entry.target.querySelector(".about-content");

            image.classList.add("show");

            setTimeout(() => {
                content.classList.add("show");
            }, 250);

        }

    });

}, {
    threshold: 0.25
});

const aboutSection =
    document.querySelector("#about");

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}
// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================

const reveals = document.querySelectorAll(
    ".reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add(
                    "reveal-visible"
                );

            }

        });

    },

    {
        threshold: 0.2
    }

);

reveals.forEach((element) => {
    revealObserver.observe(element);
});
// ==========================================
// ANIMATION — INSPIRATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const inspirationCards =
        document.querySelectorAll(
            "#inspiration .inspiration-reveal"
        );

    if (inspirationCards.length === 0) {
        return;
    }

    const inspirationObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const card = entry.target;

                        const index =
                            Array.from(inspirationCards)
                                .indexOf(card);

                        setTimeout(() => {

                            card.classList.add(
                                "inspiration-visible"
                            );

                        }, index * 150);

                        observer.unobserve(card);
                    }

                });

            },
            {
                threshold: 0.2
            }
        );

    inspirationCards.forEach((card) => {
        inspirationObserver.observe(card);
    });

});
// ==========================================
// ANIMATION — FAQ
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const faqHeading = document.querySelector("#faq .section-heading");
    const faqItems = document.querySelectorAll("#faq .faq-item");

    if (!faqHeading && faqItems.length === 0) {
        return;
    }

    const faqElements = [];

    if (faqHeading) {
        faqElements.push(faqHeading);
    }

    faqItems.forEach((item) => {
        faqElements.push(item);
    });

    const faqObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const element = entry.target;
                    const index = faqElements.indexOf(element);

                    setTimeout(() => {

                        element.classList.add("faq-visible");

                    }, index * 120);

                    observer.unobserve(element);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    faqElements.forEach((element) => {
        faqObserver.observe(element);
    });

});
// ==========================================
// ANIMATION — CONTACT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const contactElements = document.querySelectorAll(
        "#contact .contact-reveal, " +
        "#contact .contact-reveal-left, " +
        "#contact .contact-reveal-right"
    );

    if (contactElements.length === 0) {
        return;
    }

    const contactObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const element = entry.target;

                    const index =
                        Array.from(contactElements)
                            .indexOf(element);

                    setTimeout(() => {

                        element.classList.add("contact-visible");

                    }, index * 180);

                    observer.unobserve(element);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    contactElements.forEach((element) => {
        contactObserver.observe(element);
    });

});
// ==========================================
// ANIMATION — LOCALISATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const locationElements = document.querySelectorAll(
        "#location .location-reveal, " +
        "#location .location-map-reveal, " +
        "#location .location-button-reveal"
    );

    if (locationElements.length === 0) {
        return;
    }

    const locationObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const element = entry.target;

                    const index =
                        Array.from(locationElements)
                            .indexOf(element);

                    setTimeout(() => {

                        element.classList.add("location-visible");

                    }, index * 180);

                    observer.unobserve(element);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    locationElements.forEach((element) => {
        locationObserver.observe(element);
    });

});
// ==========================================
// ANIMATION — FOOTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const footerElements = document.querySelectorAll(
        "#footer .footer-reveal-left, " +
        "#footer .footer-reveal, " +
        "#footer .footer-reveal-right, " +
        "#footer .footer-social-reveal, " +
        "#footer .footer-bottom-reveal"
    );

    if (footerElements.length === 0) {
        return;
    }

    const footerObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const element = entry.target;

                    const index =
                        Array.from(footerElements)
                            .indexOf(element);

                    setTimeout(() => {

                        element.classList.add("footer-visible");

                    }, index * 150);

                    observer.unobserve(element);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    footerElements.forEach((element) => {
        footerObserver.observe(element);
    });

});