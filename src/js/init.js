document.addEventListener('DOMContentLoaded', () => {
  function scrollToElement(selector, options = {}) {
    const element = document.querySelector(selector);
    
    if (!element) return;
    
    const defaultOptions = {
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    };
    
    const settings = {
      ...defaultOptions,
      ...options
    };
    
    element.scrollIntoView(settings);
  }

  buttonBigOne.addEventListener('click', () => {
    scrollToElement('.lecture-info__text');
  });

  buttonBigTwo.addEventListener('click', () => {
    scrollToElement('.section_stages');
  });

});