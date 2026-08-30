/* =========================================================
   STYLEHUB - FASHION & APPAREL
   JavaScript - Frontend Only
   ========================================================= */


/* =========================================================
   PRODUCTS
========================================================= */

const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "Men",
        price: 400,
        image: "images.jpg"
    },
    {
        id: 2,
        name: "Denim Jacket",
        category: "Men",
        price: 999,
        image: "images.jpg"
    },
    {
        id: 3,
        name: "Floral Dress",
        category: "Women",
        price: 799,
        image: "images.jpg"
    },
    {
        id: 4,
        name: "Kids Hoodie",
        category: "Kids",
        price: 599,
        image: "images.jpg"
    }
];


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(localStorage.getItem("stylehubCart")) || [];


/* Save cart */

function saveCart() {
    localStorage.setItem("stylehubCart", JSON.stringify(cart));
}


/* Add product to cart */

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(product.name + " added to cart!");
}


/* Remove product */

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();

    updateCartCount();

    displayCart();
}


/* Change quantity */

function changeQuantity(productId, change) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();

    displayCart();
}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


/* =========================================================
   DISPLAY CART
========================================================= */

function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML =
            "<p>Your cart is empty.</p>";

        return;
    }

    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <h3>${item.name}</h3>

            <p>Price: ₹${item.price}</p>

            <p>
                Quantity:
                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                ${item.quantity}

                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </p>

            <p>
                Subtotal:
                ₹${item.price * item.quantity}
            </p>

            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartContainer.appendChild(div);
    });
}


/* =========================================================
   CHECKOUT ORDER SUMMARY
========================================================= */

function displayOrderSummary() {

    const summary = document.getElementById("order-summary");

    if (!summary) return;

    if (cart.length === 0) {

        summary.innerHTML = `
            <h2>Order Summary</h2>
            <p>Your cart is empty.</p>
        `;

        return;
    }

    let subtotal = 0;

    let productHTML = "";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        productHTML += `
            <p>
                ${item.name} × ${item.quantity}
                — ₹${itemTotal}
            </p>
        `;
    });

    const deliveryFee = 40;
    const tax = 20;
    const total = subtotal + deliveryFee + tax;

    summary.innerHTML = `
        <h2>Order Summary</h2>

        ${productHTML}

        <p>Delivery Fee — ₹${deliveryFee}</p>

        <p>Tax — ₹${tax}</p>

        <h2>Total — ₹${total}</h2>
    `;
}


/* =========================================================
   PLACE ORDER
========================================================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const deliveryFee = 40;
    const tax = 20;
    const total = subtotal + deliveryFee + tax;

    const order = {
        orderId: "SH" + Math.floor(1000 + Math.random() * 9000),

        products: cart,

        subtotal: subtotal,

        deliveryFee: deliveryFee,

        tax: tax,

        total: total,

        delivery: "3-5 Days",

        date: new Date().toLocaleDateString()
    };


    /* Save order */

    localStorage.setItem(
        "stylehubOrder",
        JSON.stringify(order)
    );


    /* Empty cart */

    cart = [];

    saveCart();

    updateCartCount();


    /* Go to order confirmation */

    window.location.href = "order.html";
}


/* =========================================================
   ORDER CONFIRMATION
========================================================= */

function displayOrderConfirmation() {

    const order = JSON.parse(
        localStorage.getItem("stylehubOrder")
    );

    if (!order) return;


    const orderDetails =
        document.getElementById("order-details");

    if (!orderDetails) return;


    let productsHTML = "";

    order.products.forEach(item => {

        productsHTML += `
            <p>
                Product:
                ${item.name}
                × ${item.quantity}
            </p>
        `;
    });


    orderDetails.innerHTML = `
        <p>Order ID: #${order.orderId}</p>

        ${productsHTML}

        <p>Subtotal: ₹${order.subtotal}</p>

        <p>Delivery Fee: ₹${order.deliveryFee}</p>

        <p>Tax: ₹${order.tax}</p>

        <h2>Total: ₹${order.total}</h2>

        <p>Delivery: ${order.delivery}</p>

        <p>Order Date: ${order.date}</p>
    `;
}


/* =========================================================
   SIGN UP
========================================================= */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("register-name")?.value;

    const email =
        document.getElementById("register-email")?.value;

    const password =
        document.getElementById("register-password")?.value;


    if (!name || !email || !password) {

        alert("Please fill all fields.");

        return;
    }


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "stylehubUser",
        JSON.stringify(user)
    );


    alert("Registration successful!");

    window.location.href = "login.html";
}


/* =========================================================
   LOGIN
========================================================= */

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("login-email")?.value;

    const password =
        document.getElementById("login-password")?.value;


    const user = JSON.parse(
        localStorage.getItem("stylehubUser")
    );


    if (
        user &&
        user.email === email &&
        user.password === password
    ) {

        localStorage.setItem(
            "stylehubLoggedIn",
            "true"
        );

        alert("Login successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid email or password.");
    }
}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem("stylehubLoggedIn");

    alert("Logged out successfully.");

    window.location.href = "index.html";
}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    displayCart();

    displayOrderSummary();

    displayOrderConfirmation();

});