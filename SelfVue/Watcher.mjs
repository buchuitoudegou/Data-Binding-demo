import { Dep } from './Dep.mjs';

export class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }

  update() {
    const value = this.vm.data[this.exp];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }

  get() {
    Dep.target = this;
    const value = this.vm.data[this.exp];
    Dep.target = null;
    return value;
  }
}