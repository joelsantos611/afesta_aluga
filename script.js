/***********************
 *  DADOS DOS PRODUTOS *
 ***********************/
const products = [
  // --- EXEMPLOS: substitua / adicione até 199+ itens ---
  { id: 1, name: 'Backdrop Multi-arco', price: 10000, img: 'img/backdropbranco.jpeg', category: 'Arcos & Backdrops' },
  { id: 1, name: 'Painel de festa unicornio colorido', price: 10000, img: 'img/painelUnicornio.jpeg', category: 'Arcos & Backdrops' },
  { id: 1, name: 'Painel de festa Happy Birthday ouro', price: 10000, img: 'img/painelHappyOuro.jpeg', category: 'Arcos & Backdrops' },
  { id: 1, name: 'Painel de festa Happy Birthday', price: 10000, img: 'img/painelHappy.jpeg', category: 'Arcos & Backdrops' },
  { id: 1, name: 'Painel de festa Boys and Girls', price: 10000, img: 'img/painelBoysGirl.jpeg', category: 'Arcos & Backdrops' },
  { id: 1, name: 'Painel Metalizado', price: 10000, img: 'img/painelMetalizado.jpeg', category: 'Arcos & Backdrops' },
  { id: 2, name: 'Cortina de Luzes LED',    price: 40,  img: 'images/luzes-led.jpg',   category: 'cilindros' },
  { id: 3, name: 'Centro de Mesa Vintage',  price: 12,  img: 'images/centro-vintage.jpg', category: 'Centros de Mesa' },
  { id: 3, name: 'Centro de Mesa Vintage',  price: 12,  img: 'images/centro-vintage.jpg', category: 'Vasos e bases' },
  // … acrescente os demais objetos, cada qual com category …
];
  
/********************************
 *  VARIÁVEIS DE CONTROLO UI    *
 ********************************/
const productContainer = document.getElementById('product-container');
const prevBtn          = document.getElementById('prev-btn');
const nextBtn          = document.getElementById('next-btn');
const categoryNav      = document.getElementById('category-nav');

let currentCategory = '';
let page            = 1;
const PER_PAGE       = 10;

/********************************
 *  CONSTRÓI NAVEGAÇÃO          *
 ********************************/
function buildCategoryNav(){
  const cats = [...new Set(products.map(p => p.category))].sort();
  cats.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.cat = cat;
    if(idx === 0){ btn.classList.add('active'); currentCategory = cat; }
    btn.addEventListener('click', () => {
      document.querySelectorAll('#category-nav button')
              .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = cat;
      page = 1;
      renderProducts();
    });
    categoryNav.appendChild(btn);
  });
}

/********************************
 *  RENDERIZA PRODUTOS          *
 ********************************/
function renderProducts(){
  const filtered = products.filter(p => p.category === currentCategory);
  const start = (page - 1) * PER_PAGE;
  const end   = start + PER_PAGE;
  const slice = filtered.slice(start, end);

  productContainer.innerHTML = '';

  slice.forEach(({name, price, img}) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${img}" alt="${name}">
      <h3>${name}</h3>
      <span class="price">${price.toLocaleString('pt-PT',{style:'currency',currency:'AOA'})}</span>
      <a class="whatsapp-btn" 
         href="https://wa.me/244945352531?text=${encodeURIComponent('Olá! Gostaria de reservar o item '+name)}">
        Reservar via WhatsApp
      </a>
    `;
    productContainer.appendChild(card);
  });

  prevBtn.disabled = (page === 1);
  nextBtn.disabled = (end >= filtered.length);
}

/********************************
 *  HANDLERS DE PAGINAÇÃO       *
 ********************************/
prevBtn.addEventListener('click', () => {
  if(page > 1){ page--; renderProducts(); }
});
nextBtn.addEventListener('click', () => {
  page++; renderProducts();
});

/********************************
 *  INICIALIZA SITE             *
 ********************************/
buildCategoryNav();
renderProducts();