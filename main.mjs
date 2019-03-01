import { SelfVue } from './SelfVue/index.mjs';

window.onload = function() {
  const ele = document.querySelector('#root');
  // const selfVue = new SelfVue({
  //   name: 1
  // }, ele, 'name');
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
