import Node from './Node.js';

export default class Dir extends Node {
  isFile() {
    return false;
  }

  isDirectory() {
    return true;
  }
}
