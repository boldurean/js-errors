// @ts-check
import path from 'path';
import Tree from '@hexlet/trees';

const getPathParts = (filepath) => filepath
  .split(path.sep)
  .filter((file) => file !== '');

export default class HexletFs {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const current = this.findNode(dir);
    return current.addChild(base, { type: 'file' });
  }

  isFile(filepath) {
    const current = this.findNode(filepath);
    return !!current && current.getMeta().type === 'file';
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    if (!this.isDirectory(dir)) {
      return false;
    }
    const parent = this.findNode(dir);
    return parent.addChild(base, { type: 'dir' });
  }

  isDirectory(filepath) {
    const current = this.findNode(filepath);
    return !!current && current.getMeta().type === 'dir';
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
