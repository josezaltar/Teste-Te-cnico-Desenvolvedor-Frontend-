// ================= CARROSSEL =================

const images = document.querySelectorAll('.carrossel__img');
const dots   = document.querySelectorAll('.carrossel__dot');
const prev   = document.querySelector('.carrossel__btn--prev');
const next   = document.querySelector('.carrossel__btn--next');

let current = 0;

function updateCarousel(index) {
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');

  dots.forEach(dot => {
    dot.classList.remove('carrossel__dot--active');
    dot.classList.remove('carrossel__dot--hover');
  });
  dots[index].classList.add('carrossel__dot--active');
}

next.addEventListener('click', () => {
  current = (current + 1) % images.length;
  updateCarousel(current);
});

prev.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  updateCarousel(current);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    current = index;
    updateCarousel(current);
  });
});

// Hover nos botões → dot ativo fica verde
prev.addEventListener('mouseenter', () => {
  dots[current].classList.add('carrossel__dot--hover');
});
prev.addEventListener('mouseleave', () => {
  dots[current].classList.remove('carrossel__dot--hover');
});

next.addEventListener('mouseenter', () => {
  dots[current].classList.add('carrossel__dot--hover');
});
next.addEventListener('mouseleave', () => {
  dots[current].classList.remove('carrossel__dot--hover');
});

// Inicializa
updateCarousel(current);

// ================= CARDS INTERATIVOS =================

const cards = document.querySelectorAll('.card');

function closeCard(card) {
  const btnOpen = card.querySelector('.card__btn-open');
  const back = card.querySelector('.card__back');
  
  back.setAttribute('hidden', '');
  btnOpen.setAttribute('aria-expanded', 'false');
}

function closeAllCards() {
  cards.forEach(card => closeCard(card));
}

function openCard(card) {
  const btnOpen = card.querySelector('.card__btn-open');
  const btnClose = card.querySelector('.card__btn-close');
  const back = card.querySelector('.card__back');
  
  // Fecha todos os outros primeiro
  closeAllCards();
  
  // Abre este card
  back.removeAttribute('hidden');
  btnOpen.setAttribute('aria-expanded', 'true');
  btnClose.focus();
}

cards.forEach(card => {
  const btnOpen = card.querySelector('.card__btn-open');
  const btnClose = card.querySelector('.card__btn-close');

  btnOpen.addEventListener('click', () => {
    openCard(card);
  });

  btnClose.addEventListener('click', () => {
    closeCard(card);
    btnOpen.focus();
  });
});