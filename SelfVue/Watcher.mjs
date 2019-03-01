import { Dep } from './Dep.mjs';

export function getValue(data, exp) {
  if (exp.length === 0) {
    return null;
  }
  let temp = data;
  exp.forEach((key) => {
    temp = temp[key];
  });
  return temp;
}

export class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
  }

  update() {
    const value = getValue(this.vm.data, this.exp);
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }

  get() {
    Dep.target = this;
    const value = getValue(this.vm.data, this.exp);
    Dep.target = null;
    return value;
  }
}