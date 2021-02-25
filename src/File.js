import Node from './Node.js';

export default class File extends Node {
  constructor(name) {
    super(name);
    this.file = true;
    this.directory = false;
  }

  isFile() {
    return this.file;
  }

  isDirectory() {
    return this.directory;
  }
}
