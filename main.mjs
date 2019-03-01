import { SelfVue } from './SelfVue/index.mjs';

window.onload = function() {
  const selfVue = new SelfVue({
    el: '#root',
    data: {
      name: 'abc',
      count: 123
    }
  });
  document.querySelector('#btn').addEventListener('click', () => {
    selfVue.count += 1;
  });
} 
