import '../style/main.scss';
import './init.js';

fetch('/club/sprite.svg')
  .then(res => res.text())
  .then(svg => {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = svg;
    document.body.prepend(div);
  });
