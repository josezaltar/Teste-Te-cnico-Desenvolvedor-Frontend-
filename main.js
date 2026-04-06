// CARROSSEL

const images = document.querySelectorAll('.carrossel__img');
const prevBtn = document.querySelector('.carrossel__btn--prev');
const nextBtn = document.querySelector('.carrossel__btn--next');
const dots = document.querySelectorAll('.carrossel__dot');

let current = 0;

function updateCarousel(index) {
  images.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('carrossel__dot--active'));

  images[index].classList.add('active');
  dots[index].classList.add('carrossel__dot--active');
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % images.length;
  updateCarousel(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  updateCarousel(current);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    current = index;
    updateCarousel(current);
  });
});