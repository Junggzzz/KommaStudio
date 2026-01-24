// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Animations on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Trigger bar animations in impact page
            if (entry.target.classList.contains('impact-graph-placeholder')) {
                document.querySelectorAll('.bar').forEach(bar => {
                    const height = bar.style.height;
                    bar.style.height = '0';
                    setTimeout(() => bar.style.height = height, 100);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .impact-graph-placeholder').forEach(el => observer.observe(el));

// Mini Cart Logic
let cart = JSON.parse(localStorage.getItem('kopas_cart')) || [];

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    if (cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x Rp ${item.price.toLocaleString()}</p>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:red; cursor:pointer;">&times;</button>
            </div>
        `).join('');
    }

    if (totalPrice) {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalPrice.innerText = `Rp ${total.toLocaleString()}`;
    }
}

function addToCart(productId, name, price) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    // Open cart sidebar on add
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.add('open');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

function saveCart() {
    localStorage.setItem('kopas_cart', JSON.stringify(cart));
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Halo KOPAS! Saya ingin memesan:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} (Rp ${(item.price * item.quantity).toLocaleString()})\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\nTotal: Rp ${total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
}

// Initial UI Update
document.addEventListener('DOMContentLoaded', updateCartUI);
