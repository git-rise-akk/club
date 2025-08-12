export default class Carousel {
  constructor({
    container,
    track,
    items,
    prevBtn,
    nextBtn,
    dots = false,
    infinite = false,
    visibleCount = 1,
    gap = 0,
    counterCurrent = null,
    counterTotal = null,
    autoSlide = 0
  }) {
    this.container = document.querySelector(container);
    if (!this.container) return;

    this.track = this.container.querySelector(track);
    this.itemsSelector = items;
    this.originalItems = Array.from(this.container.querySelectorAll(items));
    this.items = this.originalItems.slice();

    this.prevBtn = this.container.querySelector(prevBtn);
    this.nextBtn = this.container.querySelector(nextBtn);

    this.dotsEnabled = dots;
    this.infinite = infinite;
    this.visibleCount = visibleCount;
    this.gap = gap;

    this.counterCurrent = counterCurrent ? this.container.querySelector(counterCurrent) : null;
    this.counterTotal = counterTotal ? this.container.querySelector(counterTotal) : null;
    this.autoSlideTime = autoSlide;

    this.currentIndex = this.infinite ? this.visibleCount : 0;
    this.cardWidth = 0;
    this.shift = 0;
    this.autoSlideInterval = null;

    if (this.infinite) {
      this.cloneSlides();
    }

    if (this.counterTotal) {
      this.counterTotal.textContent = this.originalItems.length;
    }

    if (this.dotsEnabled) {
      this.initDots();
    }

    this.addEvents();
    this.recalc();
    if (this.autoSlideTime) {
      this.resetAutoSlide();
    }
    this.updateUI();
  }

  cloneSlides() {
    const count = this.visibleCount;
    const total = this.originalItems.length;

    for (let i = 0; i < count; i++) {
      this.track.insertBefore(this.originalItems[total - 1 - i].cloneNode(true), this.track.firstChild);
      this.track.appendChild(this.originalItems[i].cloneNode(true));
    }
    this.items = Array.from(this.track.querySelectorAll(this.itemsSelector));
  }

  initDots() {
    this.dotsContainer = this.container.querySelector('.controls__dots');
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.originalItems.length; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('dot_active');
      dot.addEventListener('click', () => this.goToSlide(i + (this.infinite ? this.visibleCount : 0)));
      this.dotsContainer.appendChild(dot);
    }
    this.dots = this.dotsContainer.querySelectorAll('.dot');
  }

  updateDots() {
    if (!this.dotsEnabled || !this.dots) return;
    let activeIndex = this.currentIndex;
    if (this.infinite) activeIndex -= this.visibleCount;
    if (activeIndex < 0) activeIndex = this.originalItems.length - 1;
    if (activeIndex >= this.originalItems.length) activeIndex = 0;

    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('dot_active', idx === activeIndex);
    });
  }

  recalc() {
    const item = this.track.querySelector(this.itemsSelector);
    const style = getComputedStyle(this.track);
    const gap = parseInt(style.columnGap) || this.gap;
    this.cardWidth = item.offsetWidth + gap;
    this.shift = -this.cardWidth * this.currentIndex;
    this.track.style.transition = 'none';
    this.track.style.transform = `translateX(${this.shift}px)`;
  }

  goToSlide(index) {
    if (!this.infinite && (index < 0 || index >= this.items.length)) return;
    this.currentIndex = index;
    this.shift = -this.cardWidth * this.currentIndex;
    this.track.style.transition = 'transform 0.3s linear';
    this.track.style.transform = `translateX(${this.shift}px)`;
    this.updateUI();
  }

  slideNext() {
    this.goToSlide(this.currentIndex + 1);
  }

  slidePrev() {
    this.goToSlide(this.currentIndex - 1);
  }

  updateUI() {
    if (this.counterCurrent) {
      let displayIndex = this.currentIndex;
      if (this.infinite) {
        displayIndex -= this.visibleCount;
      }
      if (displayIndex < 0) displayIndex = this.originalItems.length - 1;
      if (displayIndex >= this.originalItems.length) displayIndex = 0;

      this.counterCurrent.textContent = displayIndex + 1;
    }

    this.updateDots();

    if (!this.infinite && this.prevBtn && this.nextBtn) {
      this.prevBtn.classList.toggle('controls__button_disabled', this.currentIndex === 0);
      this.nextBtn.classList.toggle('controls__button_disabled', this.currentIndex >= this.items.length - this.visibleCount);
    }
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(() => this.slideNext(), this.autoSlideTime);
  }

  addEvents() {
    this.nextBtn?.addEventListener('click', () => {
      this.slideNext();
      if (this.autoSlideTime) this.resetAutoSlide();
    });

    this.prevBtn?.addEventListener('click', () => {
      this.slidePrev();
      if (this.autoSlideTime) this.resetAutoSlide();
    });

    if (this.infinite) {
      this.track.addEventListener('transitionend', () => {
        if (this.currentIndex >= this.items.length - this.visibleCount) {
          this.track.style.transition = 'none';
          this.currentIndex = this.visibleCount;
          this.shift = -this.cardWidth * this.currentIndex;
          this.track.style.transform = `translateX(${this.shift}px)`;
        } else if (this.currentIndex < this.visibleCount) {
          this.track.style.transition = 'none';
          this.currentIndex = this.items.length - this.visibleCount * 2;
          this.shift = -this.cardWidth * this.currentIndex;
          this.track.style.transform = `translateX(${this.shift}px)`;
        }
        this.updateUI();
      });
    }

    window.addEventListener('resize', () => this.recalc());
  }
}