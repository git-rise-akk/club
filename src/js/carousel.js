document.addEventListener('DOMContentLoaded', () => {
  const inner = document.querySelector('.cards__inner');
  const cards = inner.querySelectorAll('.card');
  const prevBtn = document.querySelector('.controls_participants .controls__button_prev');
  const nextBtn = document.querySelector('.controls_participants .controls__button_next');
  const counterCurrent = document.querySelector('.controls_participants .controls__current-element');
  const counterTotal = document.querySelector('.controls_participants .controls__total-elements');

  const visibleCount = 3;
  const cardCount = cards.length;

  let cardWidth = 0;
  let currentIndex = 0;
  let shift = 0;
  let autoSlideInterval = null;

  counterTotal.textContent = cardCount;


  for (let i = 0; i < visibleCount; i++) {
    inner.insertBefore(cards[cardCount - 1 - i].cloneNode(true), inner.firstChild);
    inner.appendChild(cards[i].cloneNode(true));
  }

  currentIndex = visibleCount;

  function recalcWidthAndShift() {
    const card = inner.querySelector('.card');
    const style = getComputedStyle(inner);
    const gap = parseInt(style.columnGap) || 20; 
    cardWidth = card.offsetWidth + gap;
    shift = -cardWidth * currentIndex;
    inner.style.transition = 'none';
    inner.style.transform = `translateX(${shift}px)`;
  }

  function slideTo(index) {
    shift = -cardWidth * index;
    inner.style.transition = 'transform 0.3s linear';
    inner.style.transform = `translateX(${shift}px)`;
    currentIndex = index;
    updateCounter();
  }

  function updateCounter() {
    let displayIndex = currentIndex - visibleCount + 1;
    if (displayIndex > cardCount) displayIndex = 1;
    if (displayIndex < 1) displayIndex = cardCount;
    counterCurrent.textContent = displayIndex;
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      slideTo(currentIndex + 1);
    }, 4000);
  }

  nextBtn.addEventListener('click', () => {
    slideTo(currentIndex + 1);
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    slideTo(currentIndex - 1);
    resetAutoSlide();
  });

  inner.addEventListener('transitionend', () => {
    if (currentIndex >= cardCount + visibleCount) {
      inner.style.transition = 'none';
      currentIndex = visibleCount;
      shift = -cardWidth * currentIndex;
      inner.style.transform = `translateX(${shift}px)`;
    } else if (currentIndex < visibleCount) {
      inner.style.transition = 'none';
      currentIndex = cardCount + visibleCount - 1;
      shift = -cardWidth * currentIndex;
      inner.style.transform = `translateX(${shift}px)`;
    }
    updateCounter();
  });

  window.addEventListener('resize', recalcWidthAndShift);
  recalcWidthAndShift();

  resetAutoSlide();

  updateCounter();
});