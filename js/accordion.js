// ================= ACCORDION =================

const accordionItems = document.querySelectorAll('.accordion__item');

accordionItems.forEach(item => {
  const summary = item.querySelector('.accordion__summary');
  const icon = item.querySelector('.accordion__icon i');

  // Atualiza o ícone baseado no estado
  function updateIcon() {
    if (item.open) {
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    } else {
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    }
  }

  // Fecha outros items ao abrir um (accordion exclusivo)
  summary.addEventListener('click', (e) => {
    // Fecha todos os outros
    accordionItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.open) {
        otherItem.open = false;
        const otherIcon = otherItem.querySelector('.accordion__icon i');
        otherIcon.classList.remove('fa-chevron-up');
        otherIcon.classList.add('fa-chevron-down');
      }
    });
  });

  // Observer para mudanças no atributo open
  item.addEventListener('toggle', updateIcon);

  // Inicializa
  updateIcon();
});