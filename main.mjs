import { SelfVue } from './SelfVue/index.mjs';

window.onload = function() {
  const ele = document.querySelector('#root');
  const selfVue = new SelfVue({
    name: 1
  }, ele, 'name');
  document.querySelector('#btn').addEventListener('click', () => {
    selfVue.data.name ++;
  });
} 
