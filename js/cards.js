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

// Inicializa: fecha todos os cards
closeAllCards();