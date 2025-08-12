import { scrollToElement } from './functions/scrollToElement.js';
import Carousel from './modules/carousel.js';


document.addEventListener('DOMContentLoaded', () => {
  new Carousel({
    container: '.stages',
    track: '.stages__inner',
    items: '.stages__item',
    prevBtn: '.controls__button_prev',
    nextBtn: '.controls__button_next',
    dots: true,
    infinite: false,
    visibleCount: 1,
    gap: 20
  });

  new Carousel({
    container: '.section_participants',
    track: '.cards__inner',
    items: '.card',
    prevBtn: '.controls__button_prev',
    nextBtn: '.controls__button_next',
    counterCurrent: '.controls__current-element',
    counterTotal: '.controls__total-elements',
    infinite: true,
    visibleCount: 3,
    autoSlide: 4000,
    gap: 20
  });

  const buttonBigOne = document.querySelector('.button-big_type-one');
  const buttonBigTwo = document.querySelector('.button-big_type-two');

  buttonBigOne.addEventListener('click', () => {
    scrollToElement('.lecture-info__text');
  });

  buttonBigTwo.addEventListener('click', () => {
    scrollToElement('.section_stages');
  });
});