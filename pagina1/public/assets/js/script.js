// ---------- BASE DE DATOS DE PRODUCTOS ----------
const productsDB = [
    { id: 1, name: "Teclado Mecánico RGB", price: 89.99, icon: "fas fa-keyboard", category: "teclado" },
    { id: 2, name: "Mouse Inalámbrico 3200 DPI", price: 39.99, icon: "fas fa-computer-mouse", category: "mouse" },
    { id: 3, name: "Auriculares 7.1 Surround", price: 59.99, icon: "fas fa-headphones", category: "audio" },
    { id: 4, name: "Mousepad XXL RGB", price: 24.99, icon: "fas fa-stop", category: "accesorio" },
    { id: 5, name: "Teclado 60% Wireless", price: 69.99, icon: "fas fa-keyboard", category: "teclado" },
    { id: 6, name: "Mouse Gaming 8 botones", price: 49.99, icon: "fas fa-computer-mouse", category: "mouse" }
];

// ---------- ESTADO DEL CARRITO ----------
let cart = [];

// Cargar carrito desde localStorage si existe
function loadCartFromStorage() {
    const storedCart = localStorage.getItem("techCart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartUI();
        updateCartCount();
    }
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem("techCart", JSON.stringify(cart));
}

// ---------- FUNCIONES DEL CARRITO ----------
function addToCart(productId) {
    const product = productsDB.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartToStorage();
    updateCartUI();
    updateCartCount();
    showTemporaryMessage("✅ " + product.name + " agregado");
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCartToStorage();
        updateCartUI();
        updateCartCount();
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById("cart-count");
    if (cartCountSpan) cartCountSpan.innerText = totalItems;
}

// ---------- RENDERIZAR PRODUCTOS EN EL GRID ----------
function renderProducts() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    grid.innerHTML = "";
    productsDB.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-img">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Añadir
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Eventos a botones "Añadir"
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"));
            addToCart(id);
        });
    });
}

// ---------- RENDERIZAR CARRITO (SIDEBAR) ----------
function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total-price");
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-cart-msg">🛒 Tu carrito está vacío</p>`;
        if (totalSpan) totalSpan.innerText = "$0.00";
        return;
    }

    let cartHtml = "";
    cart.forEach(item => {
        cartHtml += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div style="display: flex; gap: 8px; margin-top: 6px;">
                        <button class="qty-minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;
    });
    cartContainer.innerHTML = cartHtml;
    const total = getCartTotal();
    if (totalSpan) totalSpan.innerText = `$${total.toFixed(2)}`;

    // Eventos de los botones dentro del carrito
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            removeFromCart(id);
        });
    });
    document.querySelectorAll(".qty-plus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            if (item) updateQuantity(id, item.quantity + 1);
        });
    });
    document.querySelectorAll(".qty-minus").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.getAttribute("data-id"));
            const item = cart.find(i => i.id === id);
            if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
            else if (item && item.quantity === 1) removeFromCart(id);
        });
    });
}

// ---------- TOAST / MENSAJE TEMPORAL ----------
function showTemporaryMessage(msg) {
    let toast = document.querySelector(".custom-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "custom-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#6C63FF";
        toast.style.color = "white";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "50px";
        toast.style.zIndex = "1100";
        toast.style.fontWeight = "bold";
        toast.style.boxShadow = "0 4px 12px black";
        toast.style.transition = "opacity 0.3s";
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.style.opacity = "1";
    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2000);
}

// ---------- MANEJAR CARRITO LATERAL (OPEN/CLOSE) ----------
function setupCartDrawer() {
    const cartIcon = document.querySelector(".cart-icon");
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("close-cart");

    if (!cartIcon || !sidebar || !overlay) return;

    cartIcon.addEventListener("click", () => {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    });

    const closeDrawer = () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    };

    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);
}

// Checkout (simular compra)
function setupCheckout() {
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                showTemporaryMessage("❌ Tu carrito está vacío");
                return;
            }
            alert("🎉 ¡Compra simulada con éxito! Gracias por elegir TechPeripherals.\nTotal: $" + getCartTotal().toFixed(2));
            cart = [];
            saveCartToStorage();
            updateCartUI();
            updateCartCount();
            // Cerrar carrito después de comprar
            document.getElementById("cart-sidebar")?.classList.remove("open");
            document.getElementById("overlay")?.classList.remove("active");
            showTemporaryMessage("🧾 Pedido completado");
        });
    }
}

// ---------- INICIALIZACIÓN ----------
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    loadCartFromStorage();
    setupCartDrawer();
    setupCheckout();
});