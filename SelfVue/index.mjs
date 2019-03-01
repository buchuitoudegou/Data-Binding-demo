import { Watcher, getValue } from './Watcher.mjs';
import { observe } from './Observable.mjs';

// export function SelfVue(data, el, exp) {
//   this.data = data;
//   exp = exp.split('.');
//   observe(data);
//   el.innerHTML = getValue(this.data, exp);
//   new Watcher(this, exp, (value) => {
//     el.innerHTML = value;
//   });
//   return this;
// }

export function SelfVue(options) {
  this.data = options.data;
  Object.keys(this.data).forEach((key) => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: (newVal) => {
        this.data[key] = newVal;
      }
    });
  });
  const root = options.el;
  const el = document.querySelector(root);
  let exp = el.innerHTML;
  exp = exp.slice(2, exp.length - 2).split('.');
  observe(this.data);
  el.innerHTML = getValue(this.data, exp);
  new Watcher(this, exp, (value) => {
    el.innerHTML = value;
  });
  return this;
}