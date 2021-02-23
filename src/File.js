import Node from './Node.js';

export default class File extends Node {
  isFile() {
    return true;
  }

  isDirectory() {
    return false;
  }
}
