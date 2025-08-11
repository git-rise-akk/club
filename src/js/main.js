import '../style/main.scss';
import './carousel.js';

fetch('/sprite.svg')
  .then(res => res.text())
  .then(svg => {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = svg;
    document.body.prepend(div);
  });
