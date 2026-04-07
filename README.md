# 🎓 Teste Técnico – Desenvolvedor(a) Frontend (EdTech)

Implementação completa de uma página educacional seguindo o design do Figma, utilizando HTML5, CSS3 e JavaScript Vanilla.

## 🚀 Como Rodar

### Opção 1: Abrir diretamente
```bash
# Basta abrir o arquivo index.html no navegador
```

### Opção 2: Servidor local (recomendado)
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npx)
npx serve .

# Com VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

Acesse: `http://localhost:8000`

## 📁 Estrutura do Projeto

```
Teste/
├── index.html              # Página principal
├── style.css               # Estilos (organizado por componentes)
├── README.md               # Documentação
│
├── js/
│   ├── carrossel.js        # Slider de imagens com estados
│   ├── cards.js            # Cards interativos (abre/fecha)
│   ├── podcast.js          # Player de áudio HTML5
│   ├── video.js            # Player de vídeo YouTube
│   ├── accordion.js        # FAQ com <details>
│   └── atividades.js       # Atividades + persistência sessionStorage
│
├── audio/
│   └── audio_podcast_exemplo.mp3
│
└── image/
    ├── image_header.png
    ├── image_graph.png
    ├── image_video.png
    ├── image_lateral.png
    ├── image_snow.jpg
    ├── image_forest_road.png
    ├── image_beach.jpg
    └── logo_footer.png
```

## 🛠 Decisões Técnicas

### HTML Semântico
- `<header>`, `<main>`, `<section>`, `<footer>`, `<article>` para estrutura
- `<details>` nativo para o accordion (acessibilidade built-in)
- Atributos ARIA (`aria-expanded`, `aria-label`, `role`) para acessibilidade
- Labels associados corretamente aos inputs

### CSS
- **Metodologia BEM** para nomenclatura de classes (`bloco__elemento--modificador`)
- **CSS Custom Properties** não utilizadas para manter compatibilidade máxima
- **Flexbox** para layouts (sem Grid para maior compatibilidade)
- **Mobile-first implícito** com breakpoints em 1100px, 1024px, 768px e 480px
- Transições suaves (0.2s-0.4s) para microinterações
- Organização do CSS por componentes, com responsivos no final

### JavaScript
- **Vanilla JS** puro, sem dependências
- **Módulos separados** por funcionalidade (um arquivo por componente)
- **Event delegation** onde apropriado
- **sessionStorage** para persistência das atividades (sobrevive a refresh, limpa ao fechar aba)

### Player de Vídeo
- Embed do YouTube via iframe
- Thumbnail customizada com botão play estilizado
- Função `changeVideo(url)` para trocar vídeo dinamicamente
- Extração automática de ID do YouTube de URLs completas

### Player de Áudio
- API nativa `<audio>` do HTML5
- Barra de progresso clicável e arrastável (drag)
- Controle de volume com mute/unmute
- Ícone de volume muda conforme nível (alto/baixo/mudo)

### Carrossel/Slider
- Implementado do zero (sem Swiper)
- 3 estados: Normal, Hover (verde), Disabled (opaco)
- Botões desabilitados nos extremos (não é loop infinito)
- Dots sincronizados com hover nos botões

### Cards Interativos
- Apenas 1 card aberto por vez (fecha os outros automaticamente)
- Animação de abertura com `@keyframes`
- Foco gerenciado para acessibilidade

### Atividades (Feitas do Zero)
- **Discursiva**: textarea → Responder → feedback → Alterar
- **Objetiva**: seleção radio → Responder → feedback → Alterar
- Estados dos botões gerenciados (disabled/enabled)
- Toda lógica implementada sem plugins

### Persistência (sessionStorage)
Os seguintes dados são salvos e restaurados ao atualizar a página:
- Conteúdo digitado no textarea
- Opção selecionada na atividade objetiva
- Estado dos botões (Responder/Alterar)
- Visibilidade do feedback
- Estado de "respondido" das atividades

### Accordion/FAQ
- Utiliza `<details>` e `<summary>` nativos do HTML5
- Comportamento exclusivo (só 1 item aberto por vez) via JavaScript
- Ícone chevron atualiza (up/down) conforme estado

## ✨ Diferenciais Implementados

### Animações
- Transições suaves em todos os elementos interativos
- Animação de abertura dos cards (`scale` + `opacity`)
- Hover states em botões, dots, opções
- Transição de opacidade no carrossel

### Acessibilidade
- HTML semântico
- `aria-expanded` nos cards
- `aria-label` em botões de ícone
- `role="radiogroup"` na atividade objetiva
- `<details>` nativo no accordion (navegável por teclado)
- Estados de foco visíveis
- Labels associados aos inputs

## 🎨 Design System

| Token | Valor |
|-------|-------|
| Cor Primária | `#76B900` (verde) |
| Fundo Página | `#F7F8F5` |
| Texto Escuro | `#171D0C` |
| Texto Secundário | `#5C6B48` |
| Fundo Card | `#F9FAFB` |
| Fundo Escuro | `#0C0A08` |
| Border Radius | 8px (cards), 12px (atividades) |
| Fonte | Inter (400, 500, 700, 900) |

## 📱 Breakpoints

| Breakpoint | Comportamento |
|------------|---------------|
| > 1100px | Layout completo com mockup |
| 1024px | Mockup escondido, cards empilham |
| 768px | Layout mobile, botões full-width |
| 480px | Ajustes finos para telas pequenas |

## 🔗 Dependências Externas

- **Google Fonts** (Inter)
- **Font Awesome 6.5.0** (ícones)

Ambas carregadas via CDN, sem instalação necessária.

## 👤 Autor

José Zaltar
- GitHub: [@josezaltar](https://github.com/josezaltar)
- LinkedIn: [linkedin.com/in/josezaltar](https://www.linkedin.com/in/josezaltar/)
