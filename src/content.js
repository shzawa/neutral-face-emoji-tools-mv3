// CSSを動的に読み込む
const loadCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL('styles/content.css');
  document.head.appendChild(link);
};

// CSSを読み込む
loadCSS();

import App from './components/app.svelte';

const ELEMENT_TO_INSERT_BEFORE_SELECTOR = '.p-customize_emoji_wrapper';

function elementIsReady (selector) {
  return new Promise((resolve) => {
    function checkForElement () {
      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
      } else {
        setTimeout(checkForElement, 1000);
      }
    }

    checkForElement();
  });
}

elementIsReady(ELEMENT_TO_INSERT_BEFORE_SELECTOR).then((element) => {
  const containerDiv = document.createElement('div');

  element.before(containerDiv);
  new App({
    target: containerDiv
  });
});
