
/* ================================
   VARIABLES
================================ */

const heroImage =
    document.getElementById("hero-image");

const heroProduct =
    document.getElementById("hero-product");

const switchers =
    document.querySelectorAll(".switcher");

const productNumber =
    document.querySelector(".product-number");

const nextProduct =
    document.getElementById("next-product");

let currentProduct = 0;

let selectedProduct = null;

let selectedSize = null;

let cart =
    JSON.parse(localStorage.getItem("redDragonCart")) || [];



/* ================================
   LOADER
================================ */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList
            .add("hide");

    }, 900);

});



/* ================================
   HERO PRODUCT SWITCHER
================================ */

function changeHeroProduct(index) {

    currentProduct = index;

    const product =
        products[index];


    heroProduct.classList.add("changing");


    setTimeout(() => {

        heroImage.src =
            product.image;


        productNumber.textContent =
            "0" + (index + 1);


        heroProduct.classList.remove("changing");

    }, 250);


    switchers.forEach((button) => {

        button.classList.remove("active");

    });


    switchers[index]
        .classList
        .add("active");

}


switchers.forEach((button, index) => {

    button.addEventListener("click", () => {

        changeHeroProduct(index);

    });

});


nextProduct.addEventListener("click", () => {

    currentProduct++;

    if (currentProduct >= products.length) {

        currentProduct = 0;

    }


    changeHeroProduct(currentProduct);

});



/* ================================
   AUTO PRODUCT SWITCH
================================ */

setInterval(() => {

    currentProduct++;

    if (currentProduct >= products.length) {

        currentProduct = 0;

    }


    changeHeroProduct(currentProduct);

}, 7000);



/* ================================
   3D MOUSE EFFECT
================================ */

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 768) return;


    const centerX =
        window.innerWidth / 2;


    const centerY =
        window.innerHeight / 2;


    const rotateY =
        (event.clientX - centerX) / 35;


    const rotateX =
        (event.clientY - centerY) / 45;


    heroProduct.style.transform =

        `perspective(1000px)
        rotateY(${rotateY}deg)
        rotateX(${-rotateX}deg)
        translateZ(20px)`;

});



/* ================================
   RESET HERO POSITION
================================ */

document.addEventListener("mouseleave", () => {

    heroProduct.style.transform =

        `perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)`;

});



/* ================================
   PARTICLES
================================ */

const particles =
    document.getElementById("particles");


for (let i = 0; i < 40; i++) {

    const particle =
        document.createElement("span");


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.animationDelay =
        Math.random() * 8 + "s";


    particle.style.animationDuration =
        5 + Math.random() * 8 + "s";


    particles.appendChild(particle);

}



/* ================================
   CREATE PRODUCTS
================================ */

const productsGrid =
    document.getElementById("products-grid");


function renderProducts() {

    productsGrid.innerHTML = "";


    products.forEach((product) => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-card-image">

                <span class="card-number">

                    ${product.number}

                </span>


                <img
                    src="${product.image}"
                    alt="${product.name}">


                <div class="image-glow"></div>


                <button
                    class="quick-view"
                    data-id="${product.id}">

                    VIEW PRODUCT

                    →

                </button>

            </div>


            <div class="product-card-info">


                <div>

                    <span>

                        RED DRAGON / DROP ${product.number}

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


    addQuickViewEvents();

}


renderProducts();



/* ================================
   PRODUCT TILT
================================ */

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 768) return;


    document
        .querySelectorAll(".product-card")
        .forEach((card) => {


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            if (
                x >= 0 &&
                x <= rect.width &&
                y >= 0 &&
                y <= rect.height
            ) {


                const rotateY =
                    (x / rect.width - 0.5) * 8;


                const rotateX =
                    (y / rect.height - 0.5) * -8;


                card.style.transform =

                    `perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)`;

            }

        });

});


document
    .querySelectorAll(".product-card")
    .forEach((card) => {


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });



/* ================================
   PRODUCT MODAL
================================ */

const modal =
    document.getElementById("product-modal");

const modalImage =
    document.getElementById("modal-product-image");

const modalName =
    document.getElementById("modal-product-name");

const modalDescription =
    document.getElementById("modal-product-description");

const modalPrice =
    document.getElementById("modal-product-price");

const modalNumber =
    document.getElementById("modal-product-number");



function addQuickViewEvents() {


    document
        .querySelectorAll(".quick-view")
        .forEach((button) => {


            button.addEventListener("click", () => {


                const productId =
                    Number(button.dataset.id);


                selectedProduct =
                    products.find(
                        product =>
                            product.id === productId
                    );


                openProductModal();

            });

        });

}



function openProductModal() {


    modalImage.src =
        selectedProduct.image;


    modalName.textContent =
        selectedProduct.name;


    modalDescription.textContent =
        selectedProduct.description;


    modalPrice.textContent =
        "₹" + selectedProduct.price;


    modalNumber.textContent =
        "RED DRAGON / DROP " +
        selectedProduct.number;


    selectedSize = null;


    document
        .querySelectorAll(".size-button")
        .forEach((button) => {

            button.classList.remove("selected");

        });


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}



function closeProductModal() {


    modal.classList.remove("show");


    document.body.style.overflow =
        "";

}


document
    .getElementById("modal-close")
    .addEventListener(
        "click",
        closeProductModal
    );


document
    .getElementById("modal-overlay")
    .addEventListener(
        "click",
        closeProductModal
    );



/* ================================
   SIZE SELECTION
================================ */

document
    .querySelectorAll(".size-button")
    .forEach((button) => {


        button.addEventListener("click", () => {


            document
                .querySelectorAll(".size-button")
                .forEach((item) => {

                    item.classList.remove("selected");

                });


            button.classList.add("selected");


            selectedSize =
                button.textContent.trim();

        });

    });



/* ================================
   ADD TO CART
================================ */

const addCartButton =
    document.getElementById("add-cart-button");


addCartButton.addEventListener("click", () => {


    if (!selectedSize) {

        showToast(
            "PLEASE SELECT A SIZE"
        );

        return;

    }


    const existingItem =
        cart.find((item) =>

            item.id === selectedProduct.id &&
            item.size === selectedSize

        );


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id:
                selectedProduct.id,

            name:
                selectedProduct.name,

            image:
                selectedProduct.image,

            price:
                selectedProduct.price,

            size:
                selectedSize,

            quantity:
                1

        });

    }


    saveCart();


    updateCart();


    closeProductModal();


    showToast(
        "ADDED TO CART"
    );

});



/* ================================
   CART
================================ */

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


document
    .getElementById("open-cart")
    .addEventListener("click", openCart);


document
    .getElementById("close-cart")
    .addEventListener("click", closeCart);


cartOverlay.addEventListener(
    "click",
    closeCart
);



function openCart() {

    cartDrawer.classList.add("open");

    cartOverlay.classList.add("show");

}


function closeCart() {

    cartDrawer.classList.remove("open");

    cartOverlay.classList.remove("show");

}



function saveCart() {

    localStorage.setItem(

        "redDragonCart",

        JSON.stringify(cart)

    );

}



function updateCart() {


    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {


        cartItems.innerHTML =

            `<p class="empty-cart">

                YOUR CART IS EMPTY.

            </p>`;


    }


    cart.forEach((item, index) => {


        totalItems +=
            item.quantity;


        totalPrice +=
            item.price *
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}">


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
                        data-action="minus"
                        data-index="${index}">

                        −

                    </button>


                    <span>

                        ${item.quantity}

                    </span>


                    <button
                        data-action="plus"
                        data-index="${index}">

                        +

                    </button>


                    <button
                        class="remove-item"
                        data-action="remove"
                        data-index="${index}">

                        REMOVE

                    </button>


                </div>


            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        "₹" + totalPrice;


    addCartControlEvents();

}



function addCartControlEvents() {


    document
        .querySelectorAll(
            ".quantity-controls button"
        )
        .forEach((button) => {


            button.addEventListener("click", () => {


                const index =
                    Number(
                        button.dataset.index
                    );


                const action =
                    button.dataset.action;


                if (action === "plus") {

                    cart[index].quantity++;

                }


                if (action === "minus") {


                    cart[index].quantity--;


                    if (
                        cart[index].quantity <= 0
                    ) {

                        cart.splice(
                            index,
                            1
                        );

                    }

                }


                if (action === "remove") {

                    cart.splice(
                        index,
                        1
                    );

                }


                saveCart();

                updateCart();

            });

        });

}



updateCart();



/* ================================
   MOBILE MENU
================================ */

const menuButton =
    document.getElementById("menu-button");

const mobileMenu =
    document.getElementById("mobile-menu");


menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {


        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });



/* ================================
   NEWSLETTER
================================ */

document
    .getElementById("newsletter-form")
    .addEventListener("submit", (event) => {


        event.preventDefault();


        event.target.reset();


        showToast(
            "WELCOME TO THE DRAGON."
        );

    });



/* ================================
   TOAST
================================ */

function showToast(message) {


    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}



/* ================================
   CHECKOUT
================================ */

document
    .getElementById("checkout-button")
    .addEventListener("click", () => {


        if (cart.length === 0) {

            showToast(
                "YOUR CART IS EMPTY"
            );

            return;

        }


        showToast(
            "CHECKOUT COMING SOON"
        );

    });
