// ================= CARROSSEL =================

const images = document.querySelectorAll('.carrossel__img');
const dots = document.querySelectorAll('.carrossel__dot');
const prev = document.querySelector('.carrossel__btn--prev');
const next = document.querySelector('.carrossel__btn--next');

let current = 1; // Começa no slide do meio (índice 1)

function updateCarousel(index) {
  // Atualiza imagens
  images.forEach(img => img.classList.remove('active'));
  images[index].classList.add('active');

  // Atualiza dots
  dots.forEach(dot => {
    dot.classList.remove('carrossel__dot--active');
    dot.classList.remove('carrossel__dot--hover');
  });
  dots[index].classList.add('carrossel__dot--active');

  // Atualiza estado disabled dos botões
  updateButtonStates(index);
}

function updateButtonStates(index) {
  // Primeiro slide → desabilita prev
  if (index === 0) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }

  // Último slide → desabilita next
  if (index === images.length - 1) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
}

next.addEventListener('click', () => {
  if (current < images.length - 1) {
    current++;
    updateCarousel(current);
  }
});

prev.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updateCarousel(current);
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    current = index;
    updateCarousel(current);
  });
});

// Hover nos botões → dot ativo fica verde (só se não estiver disabled)
prev.addEventListener('mouseenter', () => {
  if (!prev.disabled) {
    dots[current].classList.add('carrossel__dot--hover');
  }
});
prev.addEventListener('mouseleave', () => {
  dots[current].classList.remove('carrossel__dot--hover');
});

next.addEventListener('mouseenter', () => {
  if (!next.disabled) {
    dots[current].classList.add('carrossel__dot--hover');
  }
});
next.addEventListener('mouseleave', () => {
  dots[current].classList.remove('carrossel__dot--hover');
});

// Inicializa
updateCarousel(current);