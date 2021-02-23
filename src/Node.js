import Stats from './Stats.js';

export default class Node {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    return new Stats(this);
  }

  getName() {
    return this.name;
  }
}
