import { Watcher, getValue } from './Watcher.mjs';
import { observe } from './Observable.mjs';
import { Compile } from './Compile.mjs';
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
  observe(this.data);
  Object.keys(this.data).forEach((key) => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this.data[key];
      },
      set: (newVal) => {
        this.data[key] = newVal;
        // console.log('set index');
      }
    });
  });
  // const root = options.el;
  // const el = document.querySelector(root);
  // let exp = el.innerHTML;
  // exp = exp.slice(2, exp.length - 2).split('.');
  // el.innerHTML = getValue(this.data, exp);
  // new Watcher(this, exp, (value) => {
  //   el.innerHTML = value;
  // });

  new Compile(options.el, this);

  return this;
}