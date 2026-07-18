// Games Database
const games = [
    {
        id: 1,
        title: "Cyberpunk 2077",
        genre: "action",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Elden Ring",
        genre: "rpg",
        price: 3499,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "FIFA 24",
        genre: "sport",
        price: 2999,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "God of War",
        genre: "action",
        price: 2799,
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "The Witcher 3",
        genre: "rpg",
        price: 1999,
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Civilization VI",
        genre: "strategy",
        price: 1499,
        image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        title: "Call of Duty",
        genre: "action",
        price: 3299,
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        title: "Baldur's Gate 3",
        genre: "rpg",
        price: 2899,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        title: "NBA 2K24",
        genre: "sport",
        price: 2699,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        title: "StarCraft II",
        genre: "strategy",
        price: 999,
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop"
    },
    {
        id: 11,
        title: "Red Dead Redemption 2",
        genre: "action",
        price: 2999,
        image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        title: "Age of Empires IV",
        genre: "strategy",
        price: 1799,
        image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=400&h=300&fit=crop"
    }
];

// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Genre Names
const genreNames = {
    action: 'Экшен',
    rpg: 'RPG',
    strategy: 'Стратегия',
    sport: 'Спорт'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGames('all');
    updateCartUI();
    setupFilters();
});

// Render Games
function renderGames(filter) {
    const gamesGrid = document.getElementById('gamesGrid');
    const filteredGames = filter === 'all' ? games : games.filter(game => game.genre === filter);
    
    gamesGrid.innerHTML = filteredGames.map(game => `
        <div class="game-card" data-genre="${game.genre}">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-genre">${genreNames[game.genre]}</p>
                <div class="game-footer">
                    <span class="game-price">${game.price} ₽</span>
                    <button class="add-to-cart" onclick="addToCart(${game.id})">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            renderGames(filter);
        });
    });
}

// Add to Cart
function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        alert('Эта игра уже в корзине!');
        return;
    }
    
    cart.push({...game});
    saveCart();
    updateCartUI();
    
    // Animation
    const btn = event.target;
    btn.textContent = '✓ Добавлено';
    btn.style.background = '#4ade80';
    setTimeout(() => {
        btn.textContent = 'В корзину';
        btn.style.background = '';
    }, 1000);
}

// Remove from Cart
function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    saveCart();
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update count
    cartCount.textContent = cart.length;
    
    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} ₽</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `${total} ₽`;
}

// Toggle Cart
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const gamesList = cart.map(item => item.title).join(', ');
    
    alert(`Спасибо за заказ!\n\nИгры: ${gamesList}\n\nИтого: ${total} ₽\n\nВ реальном магазине здесь была бы форма оплаты 😊`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Send Message from Contact Form
function sendMessage(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    alert(`Спасибо, ${name}!\n\nВаше сообщение отправлено.\nМы свяжемся с вами по адресу ${email} в ближайшее время.\n\n(В реальном проекте здесь была бы отправка на сервер 😊)`);
    
    form.reset();
}
