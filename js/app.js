const DEFAULT_MENU = [
    { id: 1, name: 'Свиная отбивная', price: 24, desc: 'Толстая отбивная в панировке, жаренная на гриле. Подается с лимоном и овощами.', category: 'Основное', img: 'images/dish-1.jpg' },
    { id: 2, name: 'Паста болоньезе', price: 18, desc: 'Тальятелле с домашним мясным соусом, тушёным три часа.', category: 'Паста', img: 'images/dish-2.jpg' },
    { id: 3, name: 'Карпаччо', price: 22, desc: 'Тонко нарезанная говядина, руккола, пармезан, оливковое масло.', category: 'Закуски', img: 'images/dish-3.jpg' },
    { id: 4, name: 'Рёбрышки BBQ', price: 32, desc: 'Свиные рёбрышки, медленно запечённые 6 часов в домашнем соусе.', category: 'Основное', img: 'images/dish-4.jpg' },
    { id: 5, name: 'Ризотто с грибами', price: 20, desc: 'Крем-рис с белыми грибами и трюфельным маслом.', category: 'Основное', img: 'images/dish-5.jpg' },
    { id: 6, name: 'Капрезе', price: 16, desc: 'Моцарелла ди буфало, помидоры, базилик, бальзамик.', category: 'Закуски', img: 'images/dish-6.jpg' },
    { id: 7, name: 'Лазанья', price: 19, desc: 'Слои домашней пасты, мясной соус, бешамель, пармезан.', category: 'Паста', img: 'images/dish-7.jpg' },
    { id: 8, name: 'Тирамису', price: 12, desc: 'Классический десерт с маскарпоне и кофе эспрессо.', category: 'Десерты', img: 'images/dish-8.jpg' },
    { id: 9, name: 'Панна-котта', price: 11, desc: 'Ванильный крем с сезонным ягодным соусом.', category: 'Десерты', img: 'images/dish-9.jpg' },
    { id: 10, name: 'Кофе эспрессо', price: 4, desc: 'Двойной эспрессо из обжаренных зёрен.', category: 'Напитки', img: 'images/dish-10.jpg' },
    { id: 11, name: 'Красное вино (бокал)', price: 14, desc: 'Домашнее красное — рекомендуем к мясным блюдам.', category: 'Напитки', img: 'images/dish-11.jpg' },
    { id: 12, name: 'Лимончелло', price: 8, desc: 'Домашний лимонный ликёр, охлаждённый.', category: 'Напитки', img: 'images/dish-12.jpg' },
];

const GALLERY_ITEMS = [
    { img: 'images/gallery-1.jpg', caption: 'Утренняя свежая доставка мяса' },
    { img: 'images/gallery-2.jpg', caption: 'Наша кухня за работой' },
    { img: 'images/gallery-3.jpg', caption: 'Интерьер лавки' },
    { img: 'images/gallery-4.jpg', caption: 'Винный погреб' },
    { img: 'images/gallery-5.jpg', caption: 'Домашняя паста' },
    { img: 'images/gallery-6.jpg', caption: 'Мясная витрина' },
    { img: 'images/gallery-7.jpg', caption: 'Летняя терраса' },
    { img: 'images/gallery-8.jpg', caption: 'Наша команда' },
    { img: 'images/gallery-9.jpg', caption: 'Десертная тарелка' },
];

const SOPRANOS_GALLERY = [
    { img: 'images/sopranos-1.jpg', caption: 'Тони за ужином в семейном кругу' },
    { img: 'images/sopranos-2.jpg', caption: 'Арти Букко — шеф ресторана «Везувий»' },
    { img: 'images/sopranos-3.jpg', caption: 'Крис и Адриана в ресторане' },
    { img: 'images/sopranos-4.jpg', caption: 'Сцена за столом — семейный ужин' },
    { img: 'images/sopranos-5.jpg', caption: 'Моменты из повседневной жизни' },
    { img: 'images/sopranos-6.jpg', caption: 'Тони и Поли — за прилавком' },
];

let cart = JSON.parse(localStorage.getItem('satriales_cart') || '[]');
let orders = JSON.parse(localStorage.getItem('satriales_orders') || '[]');
let bookings = JSON.parse(localStorage.getItem('satriales_bookings') || '[]');

document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initScrollReveal();
    initHeaderHide();
    setDefaultBookingDate();

    const page = location.pathname.split('/').pop() || 'index.html';

    if (page === 'menu.html' || page === '') {
        renderMenuFilters();
        renderMenu();
    }
    if (page === 'gallery.html') renderGallery();
    if (page === 'index.html' || page === '') renderPopularDishes();
    if (page === 'menu.html') renderCartUI();

    // secret admin: Ctrl+Shift+A or triple-click logo mark
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            openAdmin();
        }
    });

    const logoMark = document.querySelector('.logo__mark');
    if (logoMark) {
        let clicks = 0;
        let timer;
        logoMark.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            clicks++;
            clearTimeout(timer);
            if (clicks >= 3) {
                clicks = 0;
                openAdmin();
            }
            timer = setTimeout(() => clicks = 0, 600);
        });
    }
});

function initBurger() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav__link').forEach(l => {
        l.addEventListener('click', () => {
            burger.classList.remove('open');
            nav.classList.remove('open');
        });
    });
}

function initHeaderHide() {
    const header = document.getElementById('header');
    if (!header) return;
    let last = 0;
    window.addEventListener('scroll', () => {
        const cur = window.scrollY;
        if (cur > 80 && cur > last) {
            header.classList.add('header--hidden');
        } else {
            header.classList.remove('header--hidden');
        }
        last = cur;
    }, { passive: true });
}
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    els.forEach(el => obs.observe(el));
}
function getActiveCategory() {
    const params = new URLSearchParams(location.search);
    return params.get('cat') || 'all';
}

function renderMenuFilters() {
    const container = document.getElementById('menuFilters');
    if (!container) return;
    const cats = ['all', ...new Set(DEFAULT_MENU.map(d => d.category))];
    const active = getActiveCategory();
    container.innerHTML = cats.map(c =>
        `<button class="menu__filter ${active === c ? 'active' : ''}" data-cat="${c}">${c === 'all' ? 'Все' : c}</button>`
    ).join('');

    container.querySelectorAll('.menu__filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.cat;
            const url = new URL(location);
            if (cat === 'all') {
                url.searchParams.delete('cat');
            } else {
                url.searchParams.set('cat', cat);
            }
            history.pushState(null, '', url);
            renderMenuFilters();
            renderMenu();
        });
    });
}

function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    const cat = getActiveCategory();
    const items = cat === 'all' ? DEFAULT_MENU : DEFAULT_MENU.filter(d => d.category === cat);

    grid.innerHTML = items.map(d => `
        <div class="dish-card">
            <div class="dish-card__img">
                ${d.img
                    ? `<img src="${d.img}" alt="${d.name}" onerror="this.parentElement.innerHTML='<div class=dish-card__placeholder>Фото: ${d.name}</div>'">`
                    : `<div class="dish-card__placeholder">${d.name}</div>`
                }
            </div>
            <div class="dish-card__body">
                <div class="dish-card__top">
                    <span class="dish-card__name">${d.name}</span>
                    <span class="dish-card__price">$${d.price}</span>
                </div>
                <p class="dish-card__desc">${d.desc}</p>
                <div class="dish-card__footer">
                    <span class="dish-card__tag">${d.category}</span>
                    <button class="btn btn--primary" onclick="addToCart(${d.id})" style="padding:8px 18px;font-size:13px;">В корзину</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPopularDishes() {
    const grid = document.getElementById('popularDishes');
    if (!grid) return;
    const popular = DEFAULT_MENU.filter(d => [1, 4, 2, 8].includes(d.id));
    grid.innerHTML = popular.map(d => `
        <div class="dish-card">
            <div class="dish-card__img">
                ${d.img
                    ? `<img src="${d.img}" alt="${d.name}" onerror="this.parentElement.innerHTML='<div class=dish-card__placeholder>Фото: ${d.name}</div>'">`
                    : `<div class="dish-card__placeholder">${d.name}</div>`
                }
            </div>
            <div class="dish-card__body">
                <div class="dish-card__top">
                    <span class="dish-card__name">${d.name}</span>
                    <span class="dish-card__price">$${d.price}</span>
                </div>
                <p class="dish-card__desc">${d.desc}</p>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const dish = DEFAULT_MENU.find(d => d.id === id);
    if (!dish) return;
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
    }
    saveCart();
    renderCartUI();
    showModal(`«${dish.name}» добавлен в корзину`);
}

function updateCartQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCartUI();
}

function renderCartUI() {
    const badge = document.getElementById('cartBadge');
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    const total = document.getElementById('cartTotalPrice');
    const count = cart.reduce((s, c) => s + c.qty, 0);

    if (badge) {
        badge.style.display = count > 0 ? 'flex' : 'none';
        badge.textContent = count;
    }

    if (!body) return;

    if (cart.length === 0) {
        body.innerHTML = '<p class="cart__empty-msg">Корзина пуста</p>';
        footer.style.display = 'none';
        return;
    }

    body.innerHTML = cart.map(item => `
        <div class="cart__item">
            <div class="cart__item-info">
                <div class="cart__item-name">${item.name}</div>
                <div class="cart__item-meta">$${item.price} × ${item.qty}</div>
            </div>
            <div class="cart__item-controls">
                <button onclick="updateCartQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const sum = cart.reduce((s, c) => s + c.price * c.qty, 0);
    total.textContent = '$' + sum;
    footer.style.display = 'block';
}

function toggleCart() {
    const panel = document.getElementById('cartPanel');
    if (panel) panel.classList.toggle('open');
}

function saveCart() {
    localStorage.setItem('satriales_cart', JSON.stringify(cart));
}

function openOrderModal() {
    toggleCart();
    showModal(`
        <div class="order-form">
            <h3>Оформление заказа</h3>
            <div class="form__field">
                <label>Имя *</label>
                <input type="text" id="orderName" required placeholder="Ваше имя">
            </div>
            <div class="form__field">
                <label>Телефон *</label>
                <input type="tel" id="orderPhone" required placeholder="+1 (___) ___-____">
            </div>
            <div class="form__field">
                <label>Адрес доставки *</label>
                <input type="text" id="orderAddress" required placeholder="Улица, дом, квартира">
            </div>
            <div class="form__field">
                <label>Комментарий</label>
                <textarea id="orderComment" placeholder="Пожелания к заказу"></textarea>
            </div>
            <button class="btn btn--primary" style="width:100%;" onclick="submitOrder()">Отправить заказ</button>
        </div>
    `);
}

function submitOrder() {
    const name = document.getElementById('orderName')?.value.trim();
    const phone = document.getElementById('orderPhone')?.value.trim();
    const address = document.getElementById('orderAddress')?.value.trim();
    const comment = document.getElementById('orderComment')?.value.trim();

    if (!name || !phone || !address) {
        showModal('Заполните все обязательные поля');
        return;
    }

    const order = {
        id: Date.now(),
        name, phone, address, comment,
        items: [...cart],
        total: cart.reduce((s, c) => s + c.price * c.qty, 0),
        date: new Date().toLocaleString('ru-RU'),
        status: 'new'
    };

    orders.push(order);
    localStorage.setItem('satriales_orders', JSON.stringify(orders));
    cart = [];
    saveCart();
    renderCartUI();
    showModal(`Заказ #${order.id} принят! Мы перезвоним для подтверждения.`);
}

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = GALLERY_ITEMS.map(item => `
        <div class="gallery__item">
            <img src="${item.img}" alt="${item.caption}"
                 onerror="this.parentElement.innerHTML='<div class=gallery__placeholder>${item.caption}</div><div class=gallery__caption>${item.caption}</div>'">
            <div class="gallery__caption">${item.caption}</div>
        </div>
    `).join('');

    const sopGrid = document.getElementById('sopranosGrid');
    if (sopGrid) {
        sopGrid.innerHTML = SOPRANOS_GALLERY.map(item => `
            <div class="gallery__item">
                <img src="${item.img}" alt="${item.caption}"
                     onerror="this.parentElement.innerHTML='<div class=gallery__placeholder>${item.caption}</div><div class=gallery__caption>${item.caption}</div>'">
                <div class="gallery__caption">${item.caption}</div>
            </div>
        `).join('');
    }
}

// --- Booking ---
function setDefaultBookingDate() {
    const input = document.getElementById('bookDate');
    if (!input) return;
    const today = new Date().toISOString().split('T')[0];
    input.min = today;
    input.value = today;
}

function submitBooking(e) {
    e.preventDefault();
    const name = document.getElementById('bookName')?.value.trim();
    const phone = document.getElementById('bookPhone')?.value.trim();
    const date = document.getElementById('bookDate')?.value;
    const time = document.getElementById('bookTime')?.value;
    const guests = document.getElementById('bookGuests')?.value;
    const occasion = document.getElementById('bookOccasion')?.value;
    const comment = document.getElementById('bookComment')?.value.trim();

    if (!name || !phone || !date || !time || !guests) {
        showModal('Заполните все обязательные поля');
        return;
    }

    const booking = {
        id: Date.now(),
        name, phone, date, time, guests, occasion, comment,
        created: new Date().toLocaleString('ru-RU'),
        status: 'confirmed'
    };

    bookings.push(booking);
    localStorage.setItem('satriales_bookings', JSON.stringify(bookings));

    document.getElementById('bookingFormWrapper').style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';

    setTimeout(() => {
        document.getElementById('bookingFormWrapper').style.display = 'block';
        document.getElementById('bookingSuccess').style.display = 'none';
        document.getElementById('bookingForm').reset();
        setDefaultBookingDate();
    }, 4000);
}

function showModal(html) {
    const overlay = document.getElementById('modal');
    const body = document.getElementById('modalBody');
    if (!overlay || !body) return;
    body.innerHTML = html;
    overlay.classList.add('open');
}

function closeModal() {
    const overlay = document.getElementById('modal');
    if (overlay) overlay.classList.remove('open');
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

function openAdmin() {
    const pw = prompt('Пароль:');
    if (pw !== 'satriales') return;

    const overlay = document.createElement('div');
    overlay.className = 'admin-overlay open';
    overlay.innerHTML = `
        <div class="admin__panel">
            <h2>Панель управления</h2>
            <p style="color:var(--text-dim);margin-bottom:24px;">Заказы: ${orders.length} | Бронирования: ${bookings.length}</p>
            <h3 style="margin-bottom:12px;">Заказы</h3>
            <div id="adminOrdersList">${renderAdminOrdersHTML()}</div>
            <h3 style="margin:24px 0 12px;">Бронирования</h3>
            <div id="adminBookingsList">${renderAdminBookingsHTML()}</div>
            <button class="btn btn--outline" style="margin-top:24px;" onclick="this.closest('.admin-overlay').remove()">Закрыть</button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}

function renderAdminOrdersHTML() {
    if (!orders.length) return '<p style="color:var(--text-dim);">Заказов пока нет</p>';
    return orders.map(o => `
        <div style="padding:12px;border:1px solid var(--border);border-radius:4px;margin-bottom:8px;">
            <strong>#${o.id}</strong> — ${o.name}, ${o.phone}<br>
            <span style="color:var(--text-dim);font-size:13px;">
                ${o.items.map(i => `${i.name}×${i.qty}`).join(', ')} — $${o.total} — ${o.date}
            </span>
        </div>
    `).join('');
}

function renderAdminBookingsHTML() {
    if (!bookings.length) return '<p style="color:var(--text-dim);">Бронирований пока нет</p>';
    return bookings.map(b => `
        <div style="padding:12px;border:1px solid var(--border);border-radius:4px;margin-bottom:8px;">
            <strong>#${b.id}</strong> — ${b.name}, ${b.phone}<br>
            <span style="color:var(--text-dim);font-size:13px;">
                ${b.date} ${b.time} — ${b.guests} гостей — ${b.occasion || '—'}
            </span>
        </div>
    `).join('');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
