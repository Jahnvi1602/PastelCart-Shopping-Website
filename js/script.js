// ==========================================
// PASTELCART - MAIN JAVASCRIPT
// ==========================================


// ------------------------------------------
// 1. GET CART FROM LOCAL STORAGE
// ------------------------------------------

function getCart() {

    let cart = localStorage.getItem("cart");

    if (cart) {
        return JSON.parse(cart);
    }

    return [];
}


// ------------------------------------------
// 2. SAVE CART TO LOCAL STORAGE
// ------------------------------------------

function saveCart(cart) {

    localStorage.setItem("cart", JSON.stringify(cart));

}


// ------------------------------------------
// 3. UPDATE CART COUNT
// ------------------------------------------

function updateCartCount() {

    let cart = getCart();

    let totalItems = 0;

    // Add all quantities
    for (let i = 0; i < cart.length; i++) {

        totalItems = totalItems + cart[i].quantity;

    }

    // Find all cart count elements
    let cartCounts = document.querySelectorAll(".cart-count");

    // Update count
    cartCounts.forEach(function(element) {

        element.innerText = totalItems;

    });

}


// ------------------------------------------
// 4. ADD PRODUCT TO CART
// ------------------------------------------

function addToCart(name, price) {

    let cart = getCart();

    // Check whether product already exists
    let existingProduct = cart.find(function(product) {

        return product.name === name;

    });


    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity++;

    } 
    
    else {

        // Add new product
        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }


    // Save cart
    saveCart(cart);

    // Update number near cart icon
    updateCartCount();

    // Show message
    alert(name + " added to cart! 🛒");

}


// ------------------------------------------
// 5. DISPLAY CART
// ------------------------------------------

function displayCart() {

    let cartContainer = document.getElementById("cartItems");

    // If cart container does not exist,
    // stop the function
    if (!cartContainer) {

        return;

    }


    let cart = getCart();


    // Check empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Your cart is empty</h2>
                <p>Add some beautiful products to your cart!</p>

                <a href="index.html" class="btn">
                    Continue Shopping
                </a>
            </div>
        `;

        updateTotal();

        return;

    }


    // Clear old cart items
    cartContainer.innerHTML = "";


    // Display every product
    for (let i = 0; i < cart.length; i++) {

        let product = cart[i];

        let itemTotal = product.price * product.quantity;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="cart-product-info">

                    <h3>${product.name}</h3>

                    <p>
                        Price: ₹${product.price}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${i})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button onclick="increaseQuantity(${i})">
                        +
                    </button>

                </div>


                <div class="cart-product-price">

                    <strong>
                        ₹${itemTotal}
                    </strong>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${i})">

                    Remove

                </button>

            </div>

        `;

    }


    // Update total
    updateTotal();

}


// ------------------------------------------
// 6. INCREASE QUANTITY
// ------------------------------------------

function increaseQuantity(index) {

    let cart = getCart();

    cart[index].quantity++;

    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ------------------------------------------
// 7. DECREASE QUANTITY
// ------------------------------------------

function decreaseQuantity(index) {

    let cart = getCart();

    // Decrease quantity
    cart[index].quantity--;


    // If quantity becomes 0,
    // remove the product
    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


// ------------------------------------------
// 8. REMOVE PRODUCT
// ------------------------------------------

function removeFromCart(index) {

    let cart = getCart();

    let productName = cart[index].name;


    let confirmRemove = confirm(
        "Do you want to remove " + productName + "?"
    );


    if (confirmRemove) {

        cart.splice(index, 1);

        saveCart(cart);

        displayCart();

        updateCartCount();

        alert(productName + " removed from cart.");

    }

}


// ------------------------------------------
// 9. UPDATE TOTAL PRICE
// ------------------------------------------

function updateTotal() {

    let cart = getCart();

    let total = 0;


    for (let i = 0; i < cart.length; i++) {

        total = total +
            (cart[i].price * cart[i].quantity);

    }


    // Cart total
    let cartTotal = document.getElementById("cartTotal");

    if (cartTotal) {

        cartTotal.innerText = "₹" + total;

    }


    // Final total
    let finalTotal = document.getElementById("finalTotal");

    if (finalTotal) {

        finalTotal.innerText = "₹" + total;

    }

}


// ------------------------------------------
// 10. SEARCH PRODUCTS
// ------------------------------------------

function searchProducts() {

    let searchBox = document.getElementById("productSearch");

    if (!searchBox) {

        return;

    }


    let searchText =
        searchBox.value.toLowerCase();


    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let productName =
            product.querySelector("h3").innerText.toLowerCase();


        if (productName.includes(searchText)) {

            product.style.display = "block";

        }

        else {

            product.style.display = "none";

        }

    });

}


// ------------------------------------------
// 11. FILTER PRODUCTS BY CATEGORY
// ------------------------------------------

function filterProducts(category) {

    let products =
        document.querySelectorAll(".product-card");


    products.forEach(function(product) {

        let productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        }

        else {

            product.style.display = "none";

        }

    });

}


// ------------------------------------------
// 12. CHECKOUT
// ------------------------------------------

function checkout() {

    let cart = getCart();


    // Check empty cart
    if (cart.length === 0) {

        alert("Your cart is empty! 🛒");

        return;

    }


    // Calculate total
    let total = 0;


    for (let i = 0; i < cart.length; i++) {

        total = total +
            (cart[i].price * cart[i].quantity);

    }


    // Ask confirmation
    let confirmOrder = confirm(
        "Your total amount is ₹" +
        total +
        ".\n\nDo you want to place the order?"
    );


    if (!confirmOrder) {

        return;

    }


    // Create form
    let form = document.createElement("form");

    form.method = "POST";

    form.action = "php/order.php";


    // Create hidden input
    let cartInput =
        document.createElement("input");

    cartInput.type = "hidden";

    cartInput.name = "cart";

    cartInput.value =
        JSON.stringify(cart);


    // Add input to form
    form.appendChild(cartInput);


    // Add form to page
    document.body.appendChild(form);


    // Submit form
    form.submit();


    // Remove cart
    localStorage.removeItem("cart");

}


// ------------------------------------------
// 13. RUN WHEN PAGE LOADS
// ------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Display cart if cart page
        displayCart();

        // Update navbar cart count
        updateCartCount();

    }
);