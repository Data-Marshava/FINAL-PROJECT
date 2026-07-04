const slides   = document.getElementById('slides');
const total    = slides.children.length;
const dotsBox  = document.getElementById('dots');
let current    = 0;

for (let i = 0; i < total; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsBox.appendChild(d);
}
const dots = dotsBox.children;

function goTo(i) {
  current = (i + total) % total;
  slides.style.transform = `translateX(-${current * 100}%)`;
  for (let d of dots) d.classList.remove('active');
  dots[current].classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));

let timer = setInterval(() => goTo(current + 1), 5000);
slides.addEventListener('mouseenter', () => clearInterval(timer));
slides.addEventListener('mouseleave', () => timer = setInterval(() => goTo(current + 1), 5000));

const categories = [
  { ico: '🎮', name: 'STEAM' },
  { ico: '❎', name: 'XBOX' },
  { ico: '🎯', name: 'PLAYSTATION' },
  { ico: '🔑', name: 'KEYS' },
  { ico: '🤖', name: 'AI' },
  { ico: '🕹️', name: 'NINTENDO' },
  { ico: '💻', name: 'SOFTWARE' },
  { ico: '🔁', name: 'SUBS' },
];
const catGrid = document.getElementById('catGrid');
categories.forEach(c => {
  const el = document.createElement('div');
  el.className = 'cat-item';
  el.innerHTML = `<div class="ico">${c.ico}</div><span>${c.name}</span>`;
  catGrid.appendChild(el);
});

const products = [
  { title: 'Cyber Drift 2077', platform: 'PC · Steam Key', price: '₾49.99', badge: 'BESTSELLER', short: 'CD' },
  { title: 'Neon Warfare',     platform: 'PC · Global',     price: '₾34.99', badge: 'SPONSORED', short: 'NW' },
  { title: 'Galaxy Odyssey',   platform: 'Xbox · Key',      price: '₾59.99', badge: 'HOT',       short: 'GO' },
  { title: 'PSN Card 50 GEL',  platform: 'PSN · Georgia',   price: '₾50.00', badge: 'GIFT',      short: 'PSN' },
  { title: 'Shadow Legends',   platform: 'PC · Global',     price: '₾29.99', badge: 'PROMO',     short: 'SL' },
  { title: 'Steam Wallet 25',  platform: 'Steam · Global',  price: '₾25.00', badge: 'GIFT',      short: '25' },
  { title: 'Pixel Racers',     platform: 'Switch · Key',    price: '₾39.99', badge: 'NEW',       short: 'PR' },
  { title: 'Void Explorer',    platform: 'PC · Epic',       price: '₾44.99', badge: 'BESTSELLER',short: 'VE' },
];
const cardGrid = document.getElementById('cardGrid');
let cart = 0;
products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-thumb">
      <span class="card-badge">${p.badge}</span>
      ${p.short}
    </div>
    <div class="card-body">
      <h4>${p.title}</h4>
      <div class="platform">${p.platform}</div>
      <div class="card-foot">
        <span class="price">${p.price}</span>
        <button class="buy">კალათაში</button>
      </div>
    </div>`;
  card.querySelector('.buy').addEventListener('click', (e) => {
    e.stopPropagation();
    cart++;
    document.getElementById('cartCount').textContent = cart;
  });
  cardGrid.appendChild(card);
});

document.getElementById('searchBtn').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});
function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  const found = products.filter(p =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );
  alert(found.length
    ? `ნაპოვნია ${found.length} შედეგი: ` + found.map(f => f.title).join(', ')
    : `შედეგი ვერ მოიძებნა "${q}"-ზე`);
}

document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('newsEmail').value.trim();
  const msg = document.getElementById('newsMsg');
  if (email) {
    msg.textContent = '✔ გმადლობთ! წარმატებით გამოიწერეთ.';
    document.getElementById('newsEmail').value = '';
  }
});
