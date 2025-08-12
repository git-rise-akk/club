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

  document.body.addEventListener("scroll", () => {
    const scrollY = document.body.scrollTop;

    const king = document.querySelector(".collage__king");
    const queen = document.querySelector(".collage__queen");
    const knight = document.querySelector(".collage__knight");

    if (king) {
      const translateY = scrollY * -0.15;
      const translateX = scrollY * -0.05;
      king.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-6deg)`;
    }

    if (queen) {
      const translateY = scrollY * -0.3;
      const translateX = scrollY * 0.1;
      queen.style.transform = `translate(${translateX}px, ${translateY}px) rotate(8deg)`;
    }

    if (knight) {
      const translateY = scrollY * -0.1;
      const translateX = scrollY * -0.1;
      knight.style.transform = `translate(${translateX}px, ${translateY}px) rotate(-11deg)`;
    }
  });
});