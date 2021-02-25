import Node from './Node.js';

export default class Dir extends Node {
  constructor(name) {
    super(name);
    this.file = false;
    this.directiry = true;
  }

  isFile() {
    return this.file;
  }

  isDirectory() {
    return this.directiry;
  }
}
