// --- БАЗА ДАННЫХ ТОВАРОВ (Осталась прежней) ---
const productsData = [
    { id: 1, name: "RTX 4090 Monster", category: "gpu", price: 1200000, displayPrice: "1 200 000 ₸", description: "Топовая карта для 4K гейминга.", image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Intel Core i9-13900K", category: "cpu", price: 350000, displayPrice: "350 000 ₸", description: "Сердце любого зверя. 24 ядра.", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Cyber Case X (RGB)", category: "case", price: 85000, displayPrice: "85 000 ₸", description: "Стеклянный корпус с ARGB подсветкой.", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "AMD Radeon RX 7900 XTX", category: "gpu", price: 950000, displayPrice: "950 000 ₸", description: "Флагман от красных.", image: "https://images.unsplash.com/photo-1629081290886-0ac51b9e2c65?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "AMD Ryzen 9 7950X", category: "cpu", price: 300000, displayPrice: "300 000 ₸", description: "Рабочая лошадка для тяжелых задач.", image: "https://images.unsplash.com/photo-1616654157116-f36894c2111d?auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "CoolerMaster NR200", category: "case", price: 40000, displayPrice: "40 000 ₸", description: "Компактный SFF корпус.", image: "https://images.unsplash.com/photo-1616785501860-247547514309?auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "GeForce RTX 3060", category: "gpu", price: 200000, displayPrice: "200 000 ₸", description: "Народная видеокарта.", image: "https://images.unsplash.com/photo-1601053709289-e1525997b6cc?auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Intel Core i5-13600K", category: "cpu", price: 180000, displayPrice: "180 000 ₸", description: "Лучший процессор.", image: "https://images.unsplash.com/photo-1616654157116-f36894c2111d?auto=format&fit=crop&w=300&q=80" }
];
// Обрати внимание: теперь у каждого товара есть числовое price и строковое displayPrice

let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Загружаем корзину из хранилища
const productsContainer = document.getElementById('products-container');


// --- НОВОЕ: ФУНКЦИИ КОРЗИНЫ И МОДАЛЬНОГО ОКНА ---

// Обновляет счетчик корзины в шапке
function updateCartCount() {
    document.getElementById('cart-count').innerText = cartItems.length;
}

// 1. Добавление товара в корзину (сохраняем в localStorage)
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        cartItems.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
        alert(`"${product.name}" добавлен в корзину!`);
    }
}

// 2. Открытие модального окна
function openCartModal() {
    const modal = document.getElementById('cartModal');
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total');
    let total = 0;
    
    list.innerHTML = '';
    
    if (cartItems.length === 0) {
        list.innerHTML = '<p style="text-align: center;">Корзина пуста. Добавьте товар!</p>';
        totalEl.innerText = 'Итого: 0 ₸';
    } else {
        cartItems.forEach(item => {
            total += item.price;
            list.innerHTML += `
                <div>
                    <span>${item.name}</span>
                    <span>${item.displayPrice}</span>
                </div>
            `;
        });
        
        // Форматирование общей суммы (чтобы было красиво с пробелами)
        const formattedTotal = total.toLocaleString('ru-RU', { style: 'currency', currency: 'KZT', minimumFractionDigits: 0 });
        totalEl.innerText = `Итого: ${formattedTotal}`;
    }
    
    modal.style.display = "block";
}

// 3. Закрытие модального окна
function closeCartModal() {
    document.getElementById('cartModal').style.display = "none";
}

// 4. Переход к оформлению заказа
function goToCheckout() {
    if (cartItems.length === 0) {
        alert("Нельзя оформить пустой заказ!");
        return;
    }
    // Здесь мы просто переходим на новую страницу, данные уже лежат в localStorage
    window.location.href = 'checkout.html';
}

// --- ФУНКЦИИ РЕНДЕРИНГА И ФИЛЬТРОВ (Обновлены для работы с addToCart) ---

function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.displayPrice}</div>
                <button class="buy-btn" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `;
}

function renderProducts(products) {
    productsContainer.innerHTML = ''; 
    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="color: var(--text-color);">Нет товаров в этой категории.</p>';
        return;
    }
    
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += createProductCard(product);
    });
    productsContainer.innerHTML = productsHTML;
}

function filterProducts(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.filter-buttons button[onclick="filterProducts('${category}')"]`).classList.add('active');

    let filteredProducts = category === 'all' ? productsData : productsData.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// --- СТАРЫЕ ФУНКЦИИ (Сохранены) ---

const backgrounds = {
    // ... (ссылки на гифки)
    energetic: "https://media.giphy.com/media/L0T1N7s78gO2tXfF6s/giphy.gif",
    calm: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
    moderate: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
};
const bgElement = document.getElementById('bg-video');

function setMood(mood) {
    if(backgrounds[mood]) {
        bgElement.style.backgroundImage = `url('${backgrounds[mood]}')`;
    }
}
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}
function submitForm(event) {
    event.preventDefault(); 
    const inputs = event.target.getElementsByTagName('input');
    const name = inputs[0].value;
    if(name) {
        alert(`Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`);
        event.target.reset(); 
    }
}

// --- ИНИЦИАЛИЗАЦИЯ ---
setMood('moderate');
filterProducts('all'); 
updateCartCount(); // Загружаем счетчик при старте