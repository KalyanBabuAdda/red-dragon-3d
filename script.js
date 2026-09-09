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


let currentProduct = 0;

let heroSide = "front";

let selectedProduct = null;

let selectedSize = null;

let modalSide = "front";


let cart =
    JSON.parse(
        localStorage.getItem("redDragonCart")
    ) || [];



/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList
            .add("hide");

    }, 800);

});



/* =========================
   HERO PRODUCT
========================= */

function updateHeroRotationButtons() {

    document
        .getElementById("hero-front")
        .classList
        .toggle(
            "active",
            heroSide === "front"
        );


    document
        .getElementById("hero-back")
        .classList
        .toggle(
            "active",
            heroSide === "back"
        );

}



function rotateHero(side) {

    const product =
        products[currentProduct];


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



document
    .getElementById("hero-front")
    .addEventListener("click", () => {

        rotateHero("front");

    });



document
    .getElementById("hero-back")
    .addEventListener("click", () => {

        rotateHero("back");

    });



function changeHeroProduct(index) {

    currentProduct = index;

    const product =
        products[index];


    heroProduct.classList.add("changing");


    setTimeout(() => {

        heroSide = "front";


        heroImage.src =
            product.front;


        heroNumber.textContent =
            product.number;


        updateHeroRotationButtons();


        heroProduct.classList.remove(
            "changing"
        );

    }, 250);


    switchers.forEach((button) => {

        button.classList.remove("active");

    });


    switchers[index]
        .classList
        .add("active");

}



switchers.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                changeHeroProduct(index);

            }
        );

    }
);



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



/* =========================
   HERO DRAG ROTATION
========================= */

let heroStartX = 0;


heroProduct.addEventListener(
    "pointerdown",
    (event) => {

        heroStartX =
            event.clientX;


        heroProduct.setPointerCapture(
            event.pointerId
        );

    }
);



heroProduct.addEventListener(
    "pointerup",
    (event) => {

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



/* =========================
   HERO 3D MOUSE EFFECT
========================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            window.innerWidth < 768
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


        if (
            !heroProduct.classList.contains(
                "flipping"
            )
        ) {

            heroProduct.style.transform =

                `perspective(1200px)
                rotateY(${rotateY}deg)
                rotateX(${-rotateX}deg)`;

        }

    }
);



/* =========================
   PARTICLES
========================= */

const particles =
    document.getElementById("particles");


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



/* =========================
   PRODUCTS
========================= */

const productsGrid =
    document.getElementById(
        "products-grid"
    );



function renderProducts() {

    productsGrid.innerHTML = "";


    products.forEach(
        (product) => {


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "product-card";


            card.dataset.side =
                "front";


            card.innerHTML = `

                <div
                    class="product-card-image">


                    <span class="card-number">

                        ${product.number}

                    </span>


                    <img
                        class="card-product-image"
                        src="${product.front}"
                        alt="${product.name}">


                    <div class="card-views">


                        <button
                            class="card-view active"
                            data-side="front">

                            FRONT

                        </button>


                        <button
                            class="card-view"
                            data-side="back">

                            BACK

                        </button>


                    </div>


                    <button
                        class="quick-view"
                        data-id="${product.id}">

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


            productsGrid.appendChild(
                card
            );

        }
    );


    addProductCardEvents();

}


renderProducts();



/* =========================
   PRODUCT CARD FRONT/BACK
========================= */

function addProductCardEvents() {

    document
        .querySelectorAll(".product-card")
        .forEach((card) => {


            const productId =
                Number(
                    card
                    .querySelector(".quick-view")
                    .dataset.id
                );


            const product =
                products.find(
                    item =>
                        item.id === productId
                );


            const image =
                card.querySelector(
                    ".card-product-image"
                );


            card
                .querySelectorAll(
                    ".card-view"
                )
                .forEach((button) => {


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
                                            btn.classList.remove(
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


            card
                .querySelector(".quick-view")
                .addEventListener(
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

const modal =
    document.getElementById(
        "product-modal"
    );

const modalImage =
    document.getElementById(
        "modal-product-image"
    );



function openProductModal() {

    modalSide = "front";


    modalImage.src =
        selectedProduct.front;


    document
        .getElementById(
            "modal-product-name"
        )
        .textContent =
        selectedProduct.name;


    document
        .getElementById(
            "modal-product-description"
        )
        .textContent =
        selectedProduct.description;


    document
        .getElementById(
            "modal-product-price"
        )
        .textContent =
        "₹" +
        selectedProduct.price;


    document
        .getElementById(
            "modal-product-number"
        )
        .textContent =
        "RED DRAGON / DROP " +
        selectedProduct.number;


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


    document
        .getElementById("modal-front")
        .classList.add("active");


    document
        .getElementById("modal-back")
        .classList.remove("active");


    modal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}



function rotateModal(side) {

    if (modalSide === side) return;


    modalImage.classList.add(
        "modal-flipping"
    );


    setTimeout(() => {

        modalSide = side;


        modalImage.src =
            selectedProduct[side];


        document
            .getElementById("modal-front")
            .classList
            .toggle(
                "active",
                side === "front"
            );


        document
            .getElementById("modal-back")
            .classList
            .toggle(
                "active",
                side === "back"
            );

    }, 250);


    setTimeout(() => {

        modalImage.classList.remove(
            "modal-flipping"
        );

    }, 500);

}



document
    .getElementById("modal-front")
    .addEventListener(
        "click",
        () => rotateModal("front")
    );


document
    .getElementById("modal-back")
    .addEventListener(
        "click",
        () => rotateModal("back")
    );



/* =========================
   MODAL DRAG ROTATION
========================= */

let modalStartX = 0;


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



/* =========================
   CLOSE MODAL
========================= */

function closeProductModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

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



/* =========================
   SIZE
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
                    button.textContent.trim();

            }
        );

    });



/* =========================
   ADD TO CART
========================= */

document
    .getElementById("add-cart-button")
    .addEventListener(
        "click",
        () => {


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

            }

            else {

                cart.push({

                    id:
                        selectedProduct.id,

                    name:
                        selectedProduct.name,

                    image:
                        selectedProduct.front,

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

        }
    );



/* =========================
   CART
========================= */

const cartDrawer =
    document.getElementById(
        "cart-drawer"
    );

const cartOverlay =
    document.getElementById(
        "cart-overlay"
    );

const cartItems =
    document.getElementById(
        "cart-items"
    );

const cartCount =
    document.getElementById(
        "cart-count"
    );

const cartTotal =
    document.getElementById(
        "cart-total"
    );



document
    .getElementById("open-cart")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("close-cart")
    .addEventListener(
        "click",
        closeCart
    );


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


    cart.forEach(
        (item, index) => {


            totalItems +=
                item.quantity;


            totalPrice +=
                item.price *
                item.quantity;


            const element =
                document.createElement("div");


            element.className =
                "cart-item";


            element.innerHTML = `

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


            cartItems.appendChild(
                element
            );

        }
    );


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        "₹" + totalPrice;


    addCartControls();

}



function addCartControls() {

    document
        .querySelectorAll(
            ".quantity-controls button"
        )
        .forEach(button => {


            button.addEventListener(
                "click",
                () => {


                    const index =
                        Number(
                            button.dataset.index
                        );


                    const action =
                        button.dataset.action;


                    if (
                        action === "plus"
                    ) {

                        cart[index].quantity++;

                    }


                    if (
                        action === "minus"
                    ) {

                        cart[index].quantity--;


                        if (
                            cart[index].quantity <= 0
                        ) {

                            cart.splice(
                                index,
                                1
                            );

                        }

                   
