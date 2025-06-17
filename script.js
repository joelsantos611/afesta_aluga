/********************************************************
 * CONFIGURAÇÃO
 * Coloque aqui o número de telefone que receberá reservas
 ********************************************************/
const WHATSAPP_PHONE = '351912345678';    // Ex.: +351 912 345 678 (sem +)

/*******************************************************
 * 1. Gera 199 produtos fictícios com imagem associada
 *******************************************************/
const products = Array.from({ length: 199 }, (_, i) => ({
  id: i + 1,
  name: `Produto ${i + 1}`,
  price: (Math.random() * 40 + 10).toFixed(2).replace('.', ','),
  // Usa seed para ter imagem diferente por produto
  image: `https://picsum.photos/seed/prod${i + 1}/400/300`
}));

/*******************************************************
 * 2. Paginação
 *******************************************************/
const pageSize   = 20;
let   currentPage = 1;
const totalPages = Math.ceil(products.length / pageSize);

/*******************************************************
 * 3. Elementos do DOM
 *******************************************************/
const container = document.getElementById('product-container');
const prevBtn   = document.getElementById('prev-btn');
const nextBtn   = document.getElementById('next-btn');
const pageInfo  = document.getElementById('page-info');

/*******************************************************
 * 4. Renderização da página
 *******************************************************/
function renderPage(page) {
  container.innerHTML = '';

  const start = (page - 1) * pageSize;
  const end   = Math.min(start + pageSize, products.length);

  products.slice(start, end).forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card';

    // Mensagem pré-preenchida para o WhatsApp
    const msg = encodeURIComponent(
      `Olá! Gostaria de reservar o ${prod.name} (ID ${prod.id}).`
    );
    const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;

    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="info">
        <h3>${prod.name}</h3>
        <p class="price">€ ${prod.price}</p>
      </div>
      <a class="whatsapp-btn" href="${waLink}" 
         rel="noopener noreferrer">
         Reservar via WhatsApp
      </a>
    `;
    container.appendChild(card);
  });

  pageInfo.textContent = `Página ${page} de ${totalPages}`;
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;
}

/*******************************************************
 * 5. Controlo dos botões
 *******************************************************/
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/*******************************************************
 * 6. Primeira execução
 *******************************************************/
renderPage(currentPage);