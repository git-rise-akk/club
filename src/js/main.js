import '../style/main.scss';
import './functions.js';
import { isMobile } from './functions.js';

const htmlEl = document.documentElement;

fetch('/sprite.svg')
  .then(res => res.text())
  .then(svg => {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = svg;
    document.body.prepend(div);
  });

if (isMobile()) {
  htmlEl.addClassList('mobile');
  console.log('Пользователь с мобильного устройства');
} else {
  htmlEl.addClassList('desktop');
  console.log('Пользователь с десктопа');
}
