// ================= ATIVIDADES COM PERSISTÊNCIA (sessionStorage) =================

// ========== ATIVIDADE DISCURSIVA ==========
const discursivaTextarea = document.getElementById('discursiva-textarea');
const discursivaBtnResponder = document.getElementById('discursiva-btn-responder');
const discursivaBtnAlterar = document.getElementById('discursiva-btn-alterar');
const discursivaFeedback = document.getElementById('discursiva-feedback');
const discursivaFeedbackClose = document.getElementById('discursiva-feedback-close');

// Estado inicial
let discursivaState = {
  texto: '',
  respondido: false,
  feedbackVisivel: false
};

// Carregar estado do sessionStorage
function loadDiscursivaState() {
  const saved = sessionStorage.getItem('discursivaState');
  if (saved) {
    discursivaState = JSON.parse(saved);
    
    // Restaurar textarea
    discursivaTextarea.value = discursivaState.texto;
    
    // Restaurar estados
    if (discursivaState.respondido) {
      discursivaBtnResponder.disabled = true;
      discursivaBtnResponder.classList.add('atividade__btn--disabled');
      discursivaBtnAlterar.disabled = false;
      discursivaBtnAlterar.classList.remove('atividade__btn--disabled');
    }
    
    // Restaurar feedback
    if (discursivaState.feedbackVisivel) {
      discursivaFeedback.style.display = 'flex';
    }
  }
}

// Salvar estado no sessionStorage
function saveDiscursivaState() {
  discursivaState.texto = discursivaTextarea.value;
  sessionStorage.setItem('discursivaState', JSON.stringify(discursivaState));
}

// Atualizar estado dos botões
function updateDiscursivaButtons() {
  if (discursivaState.respondido) {
    discursivaBtnResponder.disabled = true;
    discursivaBtnResponder.classList.add('atividade__btn--disabled');
    discursivaBtnAlterar.disabled = false;
    discursivaBtnAlterar.classList.remove('atividade__btn--disabled');
  } else {
    discursivaBtnResponder.disabled = false;
    discursivaBtnResponder.classList.remove('atividade__btn--disabled');
    discursivaBtnAlterar.disabled = true;
    discursivaBtnAlterar.classList.add('atividade__btn--disabled');
  }
}

// Evento: digitar no textarea
discursivaTextarea.addEventListener('input', () => {
  saveDiscursivaState();
});

// Evento: clicar em Responder
discursivaBtnResponder.addEventListener('click', () => {
  if (discursivaTextarea.value.trim() === '') {
    discursivaTextarea.focus();
    return;
  }
  
  discursivaState.respondido = true;
  discursivaState.feedbackVisivel = true;
  
  // Mostrar feedback
  discursivaFeedback.style.display = 'flex';
  
  // Atualizar botões
  updateDiscursivaButtons();
  
  // Salvar estado
  saveDiscursivaState();
});

// Evento: clicar em Alterar
discursivaBtnAlterar.addEventListener('click', () => {
  discursivaState.respondido = false;
  
  // Atualizar botões
  updateDiscursivaButtons();
  
  // Focar no textarea
  discursivaTextarea.focus();
  
  // Salvar estado
  saveDiscursivaState();
});

// Evento: fechar feedback
if (discursivaFeedbackClose) {
  discursivaFeedbackClose.addEventListener('click', () => {
    discursivaFeedback.style.display = 'none';
    discursivaState.feedbackVisivel = false;
    saveDiscursivaState();
  });
}


// ========== ATIVIDADE OBJETIVA ==========
const objetivaOptions = document.querySelectorAll('.objetiva__label');
const objetivaInputs = document.querySelectorAll('.objetiva__label input[type="radio"]');
const objetivaBtnResponder = document.getElementById('objetiva-btn-responder');
const objetivaBtnAlterar = document.getElementById('objetiva-btn-alterar');
const objetivaFeedback = document.getElementById('objetiva-feedback');
const objetivaFeedbackClose = document.getElementById('objetiva-feedback-close');

// Estado inicial
let objetivaState = {
  selecionado: null,
  respondido: false,
  feedbackVisivel: false
};

// Carregar estado do sessionStorage
function loadObjetivaState() {
  const saved = sessionStorage.getItem('objetivaState');
  if (saved) {
    objetivaState = JSON.parse(saved);
    
    // Restaurar opção selecionada
    if (objetivaState.selecionado !== null) {
      const input = document.querySelector(`input[name="objetiva"][value="${objetivaState.selecionado}"]`);
      if (input) {
        input.checked = true;
        input.closest('.objetiva__label').classList.add('objetiva__label--selected');
      }
    }
    
    // Restaurar estados dos botões
    if (objetivaState.respondido) {
      objetivaBtnResponder.disabled = true;
      objetivaBtnResponder.classList.add('objetiva__btn--disabled');
      objetivaBtnAlterar.disabled = false;
      objetivaBtnAlterar.classList.remove('objetiva__btn--disabled');
      
      // Desabilitar seleção
      objetivaOptions.forEach(label => {
        label.style.pointerEvents = 'none';
      });
    } else if (objetivaState.selecionado !== null) {
      objetivaBtnResponder.disabled = false;
      objetivaBtnResponder.classList.remove('objetiva__btn--disabled');
    }
    
    // Restaurar feedback
    if (objetivaState.feedbackVisivel) {
      objetivaFeedback.style.display = 'flex';
    }
  }
}

// Salvar estado no sessionStorage
function saveObjetivaState() {
  sessionStorage.setItem('objetivaState', JSON.stringify(objetivaState));
}

// Atualizar estado dos botões
function updateObjetivaButtons() {
  if (objetivaState.respondido) {
    objetivaBtnResponder.disabled = true;
    objetivaBtnResponder.classList.add('objetiva__btn--disabled');
    objetivaBtnAlterar.disabled = false;
    objetivaBtnAlterar.classList.remove('objetiva__btn--disabled');
  } else {
    if (objetivaState.selecionado !== null) {
      objetivaBtnResponder.disabled = false;
      objetivaBtnResponder.classList.remove('objetiva__btn--disabled');
    } else {
      objetivaBtnResponder.disabled = true;
      objetivaBtnResponder.classList.add('objetiva__btn--disabled');
    }
    objetivaBtnAlterar.disabled = true;
    objetivaBtnAlterar.classList.add('objetiva__btn--disabled');
  }
}

// Evento: selecionar opção
objetivaOptions.forEach(label => {
  label.addEventListener('click', () => {
    if (objetivaState.respondido) return;
    
    const input = label.querySelector('input[type="radio"]');
    
    // Remover seleção anterior
    objetivaOptions.forEach(l => l.classList.remove('objetiva__label--selected'));
    
    // Selecionar atual
    label.classList.add('objetiva__label--selected');
    input.checked = true;
    
    // Atualizar estado
    objetivaState.selecionado = input.value;
    
    // Habilitar botão Responder
    updateObjetivaButtons();
    
    // Salvar estado
    saveObjetivaState();
  });
});

// Evento: clicar em Responder
objetivaBtnResponder.addEventListener('click', () => {
  if (objetivaState.selecionado === null) return;
  
  objetivaState.respondido = true;
  objetivaState.feedbackVisivel = true;
  
  // Mostrar feedback
  objetivaFeedback.style.display = 'flex';
  
  // Desabilitar seleção
  objetivaOptions.forEach(label => {
    label.style.pointerEvents = 'none';
  });
  
  // Atualizar botões
  updateObjetivaButtons();
  
  // Salvar estado
  saveObjetivaState();
});

// Evento: clicar em Alterar
objetivaBtnAlterar.addEventListener('click', () => {
  objetivaState.respondido = false;
  
  // Habilitar seleção novamente
  objetivaOptions.forEach(label => {
    label.style.pointerEvents = 'auto';
  });
  
  // Atualizar botões
  updateObjetivaButtons();
  
  // Salvar estado
  saveObjetivaState();
});

// Evento: fechar feedback
if (objetivaFeedbackClose) {
  objetivaFeedbackClose.addEventListener('click', () => {
    objetivaFeedback.style.display = 'none';
    objetivaState.feedbackVisivel = false;
    saveObjetivaState();
  });
}


// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
  // Carregar estados salvos
  loadDiscursivaState();
  loadObjetivaState();
  
  // Configurar estados iniciais dos botões
  updateDiscursivaButtons();
  updateObjetivaButtons();
  
  // Esconder feedbacks inicialmente (se não estiverem salvos)
  if (!discursivaState.feedbackVisivel) {
    discursivaFeedback.style.display = 'none';
  }
  if (!objetivaState.feedbackVisivel) {
    objetivaFeedback.style.display = 'none';
  }
});