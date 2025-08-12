export function scrollToElement(selector, options = {}) {
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