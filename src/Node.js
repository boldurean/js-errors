import Stats from './Stats.js';

export default class Node {
  getStats() {
    return new Stats(this);
  }

  getName() {
    return this.name;
  }
}
