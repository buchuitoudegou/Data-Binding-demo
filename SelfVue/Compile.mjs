import { getValue } from './Watcher.mjs';
import { Watcher } from './Watcher.mjs';

export class Compile {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
  }

  init() {
    if (this.el) {
      this.fragment = document.createDocumentFragment();
      let child = this.el.firstChild;
      while (child) {
        this.fragment.appendChild(child);
        child = this.el.firstChild;
      }
      [].slice.call(this.fragment.childNodes).forEach(node => {
        this.compileElement(node);
      });
      this.el.appendChild(this.fragment);
    }
  }

  compileElement(ele) {
    const reg = /\{\{(.*)\}\}/;
    if (ele.nodeType === 3) {
      if (reg.test(ele.nodeValue)) {
        let temp = RegExp.$1;
        temp = temp.trim();
        ele.nodeValue = getValue(this.vm, temp.split('.'));
        new Watcher(this.vm, temp.split('.'), (value) => {
          ele.nodeValue = value;
        });
      }
    } else if (ele.nodeType === 1) {
      const attr = ele.getAttribute('vmodel');
      if (attr) {
        ele.value = getValue(this.vm, attr.split('.'));
        new Watcher(this.vm, attr.split('.'), (value) => {
          ele.value = value;
        });
        ele.addEventListener('input', (e) => {
          this.vm[attr] = e.target.value;
        });
      }
    }
  }
}