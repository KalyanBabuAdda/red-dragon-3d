document.addEventListener("DOMContentLoaded", () {

    /* =========================
       GLOBAL STATE
    ========================= */

    let currentProduct = 0;
    let heroSide = "front";

    let selectedProduct = null;
    let selectedSize = null;
    let modalSide = "front";

    let cart = JSON.parse(
        localStorage.getItem("redDragonCart")
    ) || [];


    /* =========================
       ELEMENTS
    ========================= */

    const loader =
        document.getElementById("loader");

    const heroImage =
        document.getElementById("hero-image");

    const heroProduct =
        document.getElementById("hero-product");

    const heroNumber =
        document.getElementById("hero-number");

    const switchers =
        document.querySelectorAll(".switcher");

    const nextProduct =
        document.getElementById("next-product");

    const productsGrid =
        document.getElementById("products-grid");

    const modal =
        document.getElementById("product-modal");

    const modalImage =
        document.getElementById("modal-product-image");

    const cartDrawer =
        document.getElementById("cart-drawer");

    const cartOverlay =
        document.getElementById("cart-overlay");

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    /* =========================
       LOADER
    ========================= */

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 800);


    /* =========================
       HERO
    ========================= */

    function updateHeroRotationButtons() {

        const frontButton =
            document.getElementById("hero-front");

        const backButton =
            document.getElementById("hero-back");

        if (frontButton) {
            frontButton.classList.toggle(
                "active",
                heroSide === "front"
            );
        }

        if (backButton) {
            backButton.classList.toggle(
                "active",
                heroSide === "back"
            );
        }
    }


    function rotateHero(side) {

        if (!heroProduct || !heroImage) return;

        const product =
            products[currentProduct];

        if (!product) return;

        if (heroSide === side) return;

        heroProduct.classList.add("flipping");

        setTimeout(() => {

            heroSide = side;

            heroImage.src =
                product[side];

            updateHeroRotationButtons();

        }, 250);

        setTimeout(() => {

            heroProduct.classList.remove(
                "flipping"
            );

        }, 500);
    }


    function changeHeroProduct(index) {

        if (!products[index]) return;

        currentProduct = index;

        const product =
            products[index];

        if (heroProduct) {
            heroProduct.classList.add(
                "changing"
            );
        }

        setTimeout(() => {

            heroSide = "front";

            if (heroImage) {
                heroImage.src =
                    product.front;
            }

            if (heroNumber) {
                heroNumber.textContent =
                    product.number;
            }

            updateHeroRotationButtons();

            if (heroProduct) {
                heroProduct.classList.remove(
                    "changing"
                );
            }

        }, 250);


        switchers.forEach(button => {
            button.classList.remove("active");
        });

        if (switchers[index]) {
            switchers[index]
                .classList.add("active");
        }
    }


    const heroFront =
        document.getElementById("hero-front");

    const heroBack =
        document.getElementById("hero-back");


    if (heroFront) {

        heroFront.addEventListener(
            "click",
            () => rotateHero("front")
        );

    }


    if (heroBack) {

        heroBack.addEventListener(
            "click",
            () => rotateHero("back")
        );

    }


    switchers.forEach((button, index) => {

        button.addEventListener(
            "click",
            () => {
                changeHeroProduct(index);
            }
        );

    });


    if (nextProduct) {

        nextProduct.addEventListener(
            "click",
            () => {

                currentProduct++;

                if (
                    currentProduct >=
                    products.length
                ) {
                    currentProduct = 0;
                }

                changeHeroProduct(
                    currentProduct
                );

            }
        );

    }


    /* =========================
       HERO DRAG
    ========================= */

    let heroStartX = 0;

    if (heroProduct) {

        heroProduct.addEventListener(
            "pointerdown",
            event => {

                heroStartX =
                    event.clientX;

                try {
                    heroProduct.setPointerCapture(
                        event.pointerId
                    );
                } catch (error) {}

            }
        );


        heroProduct.addEventListener(
            "pointerup",
            event => {

                const difference =
                    event.clientX -
                    heroStartX;

                if (difference > 40) {
                    rotateHero("front");
                }

                if (difference < -40) {
                    rotateHero("back");
                }

            }
        );

    }


    /* =========================
       HERO MOUSE 3D EFFECT
    ========================= */

    document.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 768 ||
                !heroProduct
            ) return;

            if (
                heroProduct.classList.contains(
                    "flipping"
                )
            ) return;

            const centerX =
                window.innerWidth / 2;

            const centerY =
                window.innerHeight / 2;

            const rotateY =
                (event.clientX - centerX) /
                45;

            const rotateX =
                (event.clientY - centerY) /
                55;

            heroProduct.style.transform =
                `perspective(1200px)
                 rotateY(${rotateY}deg)
                 rotateX(${-rotateX}deg)`;
        }
    );


    /* =========================
       PARTICLES
    ========================= */

    const particles =
        document.getElementById("particles");

    if (particles) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                5 +
                Math.random() * 8 +
                "s";

            particles.appendChild(
                particle
            );
        }
    }


    /* =========================
       PRODUCT GRID
    ========================= */

    function renderProducts() {

        if (!productsGrid) return;

        productsGrid.innerHTML = "";

        products.forEach(product => {

            const card =
                document.createElement("article");

            card.className =
                "product-card";

            card.dataset.side =
                "front";

            card.innerHTML = `

                <div class="product-card-image">

                    <span class="card-number">
                        ${product.number}
                    </span>

                    <img
                        class="card-product-image"
                        src="${product.front}"
                        alt="${product.name}"
                    >

                    <div class="card-views">

                        <button
                            class="card-view active"
                            data-side="front"
                            type="button"
                        >
                            FRONT
                        </button>

                        <button
                            class="card-view"
                            data-side="back"
                            type="button"
                        >
                            BACK
                        </button>

                    </div>

                    <button
                        class="quick-view"
                        data-id="${product.id}"
                        type="button"
                    >
                        VIEW PRODUCT →
                    </button>

                </div>

                <div class="product-card-info">

                    <div>

                        <span>
                            RED DRAGON /
                            DROP ${product.number}
                        </span>

                        <h3>
                            ${product.name}
                        </h3>

                    </div>

                    <strong>
                        ₹${product.price}
                    </strong>

                </div>

            `;

            productsGrid.appendChild(card);

        });

        addProductCardEvents();
    }


    /* =========================
       PRODUCT CARD EVENTS
    ========================= */

    function addProductCardEvents() {

        document
            .querySelectorAll(".product-card")
            .forEach(card => {

                const quickView =
                    card.querySelector(
                        ".quick-view"
                    );

                if (!quickView) return;

                const productId =
                    Number(
                        quickView.dataset.id
                    );

                const product =
                    products.find(
                        item =>
                            item.id ===
                            productId
                    );

                if (!product) return;

                const image =
                    card.querySelector(
                        ".card-product-image"
                    );


                card
                    .querySelectorAll(
                        ".card-view"
                    )
                    .forEach(button => {

                        button.addEventListener(
                            "click",
                            () => {

                                const side =
                                    button.dataset.side;

                                if (
                                    card.dataset.side ===
                                    side
                                ) return;

                                image.classList.add(
                                    "card-flip"
                                );

                                setTimeout(() => {

                                    image.src =
                                        product[side];

                                    card.dataset.side =
                                        side;

                                    card
                                        .querySelectorAll(
                                            ".card-view"
                                        )
                                        .forEach(
                                            btn =>
                                                btn.classList
                                                    .remove(
                                                        "active"
                                                    )
                                        );

                                    button.classList.add(
                                        "active"
                                    );

                                }, 200);

                                setTimeout(() => {

                                    image.classList.remove(
                                        "card-flip"
                                    );

                                }, 400);

                            }
                        );

                    });


                quickView.addEventListener(
                    "click",
                    () => {

                        selectedProduct =
                            product;

                        openProductModal();

                    }
                );

            });
    }


    /* =========================
       PRODUCT MODAL
    ========================= */

    function openProductModal() {

        if (
            !modal ||
            !modalImage ||
            !selectedProduct
        ) return;

        modalSide = "front";

        modalImage.src =
            selectedProduct.front;


        const name =
            document.getElementById(
                "modal-product-name"
            );

        const description =
            document.getElementById(
                "modal-product-description"
            );

        const price =
            document.getElementById(
                "modal-product-price"
            );

        const number =
            document.getElementById(
                "modal-product-number"
            );


        if (name) {
            name.textContent =
                selectedProduct.name;
        }

        if (description) {
            description.textContent =
                selectedProduct.description;
        }

        if (price) {
            price.textContent =
                "₹" +
                selectedProduct.price;
        }

        if (number) {
            number.textContent =
                "RED DRAGON / DROP " +
                selectedProduct.number;
        }


        selectedSize = null;


        document
            .querySelectorAll(
                ".size-button"
            )
            .forEach(button => {

                button.classList.remove(
                    "selected"
                );

            });


        const modalFront =
            document.getElementById(
                "modal-front"
            );

        const modalBack =
            document.getElementById(
                "modal-back"
            );


        if (modalFront) {
            modalFront.classList.add(
                "active"
            );
        }

        if (modalBack) {
            modalBack.classList.remove(
                "active"
            );
        }


        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";
    }


    function rotateModal(side) {

        if (
            !selectedProduct ||
            !modalImage
        ) return;

        if (modalSide === side) return;

        modalImage.classList.add(
            "modal-flipping"
        );


        setTimeout(() => {

            modalSide = side;

            modalImage.src =
                selectedProduct[side];


            const modalFront =
                document.getElementById(
                    "modal-front"
                );

            const modalBack =
                document.getElementById(
                    "modal-back"
                );


            if (modalFront) {

                modalFront.classList.toggle(
                    "active",
                    side === "front"
                );

            }


            if (modalBack) {

                modalBack.classList.toggle(
                    "active",
                    side === "back"
                );

            }

        }, 250);


        setTimeout(() => {

            modalImage.classList.remove(
                "modal-flipping"
            );

        }, 500);
    }


    const modalFront =
        document.getElementById(
            "modal-front"
        );

    const modalBack =
        document.getElementById(
            "modal-back"
        );


    if (modalFront) {

        modalFront.addEventListener(
            "click",
            () => rotateModal("front")
        );

    }


    if (modalBack) {

        modalBack.addEventListener(
            "click",
            () => rotateModal("back")
        );

    }


    /* =========================
       MODAL DRAG
    ========================= */

    let modalStartX = 0;

    if (modalImage) {

        modalImage.addEventListener(
            "pointerdown",
            event => {

                modalStartX =
                    event.clientX;

            }
        );


        modalImage.addEventListener(
            "pointerup",
            event => {

                const difference =
                    event.clientX -
                    modalStartX;

                if (difference > 40) {
                    rotateModal("front");
                }

                if (difference < -40) {
                    rotateModal("back");
                }

            }
        );

    }


    /* =========================
       CLOSE MODAL
    ========================= */

    function closeProductModal() {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.style.overflow = "";
    }


    const modalClose =
        document.getElementById(
            "modal-close"
        );

    const modalOverlay =
        document.getElementById(
            "modal-overlay"
        );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProductModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProductModal
        );

    }


    /* =========================
       SIZE SELECTION
    ========================= */

    document
        .querySelectorAll(
            ".size-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".size-button"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "selected"
                            );

                        });


                    button.classList.add(
                        "selected"
                    );

                    selectedSize =
                        button.textContent
                            .trim();

                }
            );

        });


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        let toast =
            document.getElementById(
                "toast"
            );

        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.id = "toast";

            toast.className = "toast";

            document.body.appendChild(
                toast
            );
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);
    }


    /* =========================
       ADD TO CART
    ========================= */

    const addCartButton =
        document.getElementById(
            "add-cart-button"
        );


    if (addCartButton) {

        addCartButton.addEventListener(
            "click",
            () => {

                if (!selectedProduct) {
                    return;
                }


                if (!selectedSize) {

                    showToast(
                        "PLEASE SELECT A SIZE"
                    );

                    return;
                }


                const existingItem =
                    cart.find(
                        item =>
                            item.id ===
                            selectedProduct.id &&
                            item.size ===
                            selectedSize
                    );


                if (existingItem) {

                    existingItem.quantity++;

                } else {

                    cart.push({

                        id:
                            selectedProduct.id,

                        name:
                            selectedProduct.name,

                        price:
                            selectedProduct.price,

                        image:
                            selectedProduct.front,

                        size:
                            selectedSize,

                        quantity: 1

                    });

                }


                saveCart();

                renderCart();

                showToast(
                    "ADDED TO CART"
                );


                if (modal) {
                    closeProductModal();
                }

            }
        );

    }


    /* =========================
       SAVE CART
    ========================= */

    function saveCart() {

        localStorage.setItem(
            "redDragonCart",
            JSON.stringify(cart)
        );

    }


    /* =========================
       CART
    ========================= */

    function renderCart() {

        if (!cartItems) return;

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    YOUR CART IS EMPTY
                </div>
            `;

            updateCartSummary();

            return;
        }


        cart.forEach(
            (item, index) => {

                const cartItem =
                    document.createElement(
                        "div"
                    );

                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <span>
                            SIZE: ${item.size}
                        </span>

                        <strong>
                            ₹${item.price}
                        </strong>

                        <div class="quantity-controls">

                            <button
                                type="button"
                                data-action="minus"
                                data-index="${index}"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                type="button"
                                data-action="plus"
                                data-index="${index}"
                            >
                                +
                            </button>

                            <button
                                type="button"
                                class="remove-item"
                                data-action="remove"
                                data-index="${index}"
                            >
                                REMOVE
                            </button>

                        </div>

                    </div>

                `;


                cartItems.appendChild(
                    cartItem
                );

            }
        );


        cartItems
            .querySelectorAll(
                "[data-action]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const action =
                            button.dataset.action;

                        const index =
                            Number(
                                button.dataset.index
                            );


                        if (
                            index < 0 ||
                            index >= cart.length
                        ) {
                            return;
                        }


                        if (action === "minus") {

                            cart[index].quantity--;

                            if (
                                cart[index].quantity <=
                                0
                            ) {

                                cart.splice(
                                    index,
                                    1
                                );

                            }

                        }


                        if (action === "plus") {

                            cart[index].quantity++;

                        }


                        if (action === "remove") {

                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart();

                        renderCart();

                    }
                );

            });


        updateCartSummary();
    }


    function updateCartSummary() {

        let quantity = 0;
        let total = 0;


        cart.forEach(item => {

            quantity +=
                item.quantity;

            total +=
                item.price *
                item.quantity;

        });


        if (cartCount) {

            cartCount.textContent =
                quantity;

        }


        if (cartTotal) {

            cartTotal.textContent =
                "₹" + total;

        }

    }


    /* =========================
       OPEN / CLOSE CART
    ========================= */

    function openCart() {

        if (cartDrawer) {
            cartDrawer.classList.add(
                "open"
            );
        }

        if (cartOverlay) {
            cartOverlay.classList.add(
                "show"
            );
        }

        document.body.style.overflow =
            "hidden";
    }


    function closeCart() {

        if (cartDrawer) {
            cartDrawer.classList.remove(
                "open"
            );
        }

        if (cartOverlay) {
            cartOverlay.classList.remove(
                "show"
            );
        }

        document.body.style.overflow =
            "";
    }


    const openCartButton =
        document.getElementById(
            "open-cart"
        );

    const closeCartButton =
        document.getElementById(
            "close-cart"
        );


    if (openCartButton) {

        openCartButton.addEventListener(
            "click",
            openCart
        );

    }


    if (closeCartButton) {

        closeCartButton.addEventListener(
            "click",
            closeCart
        );

    }


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            closeCart
        );

    }


    /* =========================
       CHECKOUT
    ========================= */

    const checkoutButton =
        document.getElementById(
            "checkout-button"
        );


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    showToast(
                        "YOUR CART IS EMPTY"
                    );

                    return;
                }


                showToast(
                    "CHECKOUT COMING SOON"
                );

            }
        );

    }


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton =
        document.getElementById(
            "menu-button"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                mobileMenu.classList.toggle(
                    "open"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =========================
       NEWSLETTER
    ========================= */

    const newsletterForm =
        document.getElementById(
            "newsletter-form"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const input =
                    newsletterForm.querySelector(
                        "input"
                    );

                if (input) {
                    input.value = "";
                }

                showToast(
                    "THANK YOU FOR JOINING THE DRAGON"
                );

            }
        );

    }


    /* =========================
       INITIALIZE
    ========================= */

    renderProducts();

    renderCart();

    updateHeroRotationButtons();

});
