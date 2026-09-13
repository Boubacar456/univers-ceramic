// ==========================================
// UNIVERS CERAMIC - CATALOGUE PRODUITS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const productsContainer = document.getElementById("products-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let allProducts = [];

    // ==========================================
    // CONFIGURATION
    // ==========================================

    // Produits affichés sur la page d'accueil
    const featuredProductIds = [
    14, // Empera Gris
    16, // Forest Wood Series
    34, // Laurrent Black
    44, // Spider Web Gold
    49, // Volcano Rush
    53, // Classic Crema
    60, // Porte Moderne Gris Anthracite
    58, // Tuile Toppana Superroof
    68, // Lavabo Circulaire avec Miroir LED
    84  // Albie Miel
];
    
// Détection de la page
    const isCataloguePage =
        window.location.pathname.toLowerCase().includes("catalogue.html");


    // ==========================================
    // CHARGEMENT DES PRODUITS
    // ==========================================

    fetch("data/products.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Impossible de charger products.json");
            }

            return response.json();

        })
        .then(products => {

            allProducts = products;

            // ======================================
            // PAGE CATALOGUE
            // ======================================

            if (isCataloguePage) {

                displayProducts(allProducts);
                updateProductCount(allProducts);

            }

            // ======================================
            // PAGE D'ACCUEIL
            // ======================================

            else {

                const featuredProducts = allProducts.filter(product =>
                    featuredProductIds.includes(product.id)
                );

                displayProducts(featuredProducts);

                updateProductCount(featuredProducts);

            }

        })
        .catch(error => {

            console.error("Erreur catalogue :", error);

            if (productsContainer) {

                productsContainer.innerHTML = `
                    <div class="catalogue-error">
                        <p>Impossible de charger le catalogue.</p>
                        <small>Vérifiez le fichier products.json.</small>
                    </div>
                `;

            }

        });


    // ==========================================
    // AFFICHAGE DES PRODUITS
    // ==========================================

    function displayProducts(products) {

        if (!productsContainer) {

            console.error(
                "Élément #products-container introuvable."
            );

            return;
        }

        productsContainer.innerHTML = "";

        if (products.length === 0) {

            productsContainer.innerHTML = `
                <div class="no-products">
                    <p>Aucun produit trouvé dans cette catégorie.</p>
                </div>
            `;

            return;
        }

       products.forEach((product, index) => {

    const productCard = createProductCard(product);

    productCard.style.transitionDelay = "0s";

    productsContainer.appendChild(productCard);

    setTimeout(() => {
        productCard.classList.add("show");
    }, 50 + index * 120);

});

    }


    // ==========================================
    // CRÉATION D'UNE CARTE PRODUIT
    // ==========================================

    function createProductCard(product) {

        const card = document.createElement("article");

        card.className = "product-card";


        // ------------------------------------------
        // Badge
        // ------------------------------------------

        let badgeHTML = "";

        if (product.badge) {

            badgeHTML = `
                <span class="product-badge">
                    ${product.badge}
                </span>
            `;

        }


        // ------------------------------------------
        // Dimensions
        // ------------------------------------------

        let dimensionsHTML = "";

        if (product.dimensions) {

            dimensionsHTML = `
                <div class="product-info-item">
                    <span class="info-label">Dimensions</span>
                    <span class="info-value">
                        ${product.dimensions}
                        ${product.dimensionsEstimated ? "*" : ""}
                    </span>
                </div>
            `;

        }


        // ------------------------------------------
        // Finition
        // ------------------------------------------

        let finishHTML = "";

        if (product.finish) {

            finishHTML = `
                <div class="product-info-item">
                    <span class="info-label">Finition</span>
                    <span class="info-value">
                        ${product.finish}
                        ${product.finishEstimated ? "*" : ""}
                    </span>
                </div>
            `;

        }


        // ------------------------------------------
        // Couleur
        // ------------------------------------------

        let colorHTML = "";

        if (product.color) {

            colorHTML = `
                <div class="product-info-item">
                    <span class="info-label">Couleur</span>
                    <span class="info-value">
                        ${product.color}
                    </span>
                </div>
            `;

        }


        // ------------------------------------------
        // Prix
        // ------------------------------------------

        let priceHTML = "";

        if (
            product.price !== null &&
            product.price !== undefined
        ) {

            priceHTML = `
                <div class="product-price">
                    ${formatPrice(product.price)} ${product.currency}
                </div>
            `;

        } else {

            priceHTML = `
                <div class="product-price price-request">
                    Prix sur demande
                </div>
            `;

        }


        // ------------------------------------------
        // CARTE
        // ------------------------------------------

        card.innerHTML = `

            <div class="product-image-wrapper">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

                ${badgeHTML}

            </div>


            <div class="product-content">

                <span class="product-category">
                    ${getCategoryLabel(product.category)}
                </span>

                <h3 class="product-title">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-info">

                    ${dimensionsHTML}

                    ${finishHTML}

                    ${colorHTML}

                </div>


                <div class="product-footer">

                    ${priceHTML}

                    <button
                        class="product-order-btn"
                        type="button"
                        data-product-id="${product.id}"
                    >
                        Commander via WhatsApp
                    </button>

                </div>

            </div>

        `;


        // ==========================================
        // BOUTON WHATSAPP
        // ==========================================

        const orderButton =
            card.querySelector(".product-order-btn");

        orderButton.addEventListener("click", () => {

            commanderProduit(product);

        });


        return card;

    }


    // ==========================================
    // FILTRAGE
    // ==========================================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const category = button.dataset.category;


            // --------------------------------------
            // PAGE CATALOGUE
            // --------------------------------------

            if (isCataloguePage) {

                if (category === "all") {

                    displayProducts(allProducts);
                    updateProductCount(allProducts);

                    return;
                }


                const filteredProducts =
                    allProducts.filter(product =>
                        product.category === category
                    );


                displayProducts(filteredProducts);
                updateProductCount(filteredProducts);

                return;

            }


            // --------------------------------------
            // PAGE ACCUEIL
            // --------------------------------------

            const featuredProducts =
                allProducts.filter(product =>
                    featuredProductIds.includes(product.id)
                );


            if (category === "all") {

                displayProducts(featuredProducts);
                updateProductCount(featuredProducts);

                return;

            }


            const filteredFeaturedProducts =
                featuredProducts.filter(product =>
                    product.category === category
                );


            displayProducts(filteredFeaturedProducts);
            updateProductCount(filteredFeaturedProducts);

        });

    });


    // ==========================================
    // LABELS DES CATÉGORIES
    // ==========================================

    function getCategoryLabel(category) {

        const categories = {

            "interieur": "Intérieur",

            "exterieur": "Extérieur",

            "panneaux-contreplaques":
                "Panneaux & Contreplaqués",

            "portes": "Portes",

            "toitures": "Toitures",
            
            "sanitaires": "Sanitaires",

              "parquets": "Parquets"


        };

        return categories[category] || category;

    }


    // ==========================================
    // FORMAT PRIX
    // ==========================================

    function formatPrice(price) {

        return new Intl.NumberFormat("fr-FR")
            .format(price);

    }


    // ==========================================
    // COMPTEUR
    // ==========================================

    function updateProductCount(products) {

        const countElement =
            document.getElementById("product-count");

        if (!countElement) {
            return;
        }

        countElement.textContent = products.length;

    }


    // ==========================================
    // COMMANDER VIA WHATSAPP
    // ==========================================

    function commanderProduit(product) {

        /*
         * IMPORTANT :
         * Remplace ce numéro par le numéro WhatsApp
         * professionnel d'Univers Ceramic.
         *
         * Format :
         * 221XXXXXXXXX
         */

        const phoneNumber = "221768360818";


        const message = `Bonjour Univers Ceramic,

Je souhaite avoir des informations concernant le produit :

${product.name}

Catégorie : ${getCategoryLabel(product.category)}

Merci de me communiquer les informations disponibles.`;


        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


        window.open(whatsappURL, "_blank");

    }

});