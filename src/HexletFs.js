import path from 'path';
import Tree from '@hexlet/trees';

import Dir from './Dir.js';
import File from './File.js';

const getPathParts = (filepath) => filepath.split(path.sep).filter((part) => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    return current.getMeta().getStats();
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new File(base));
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new Dir(base));
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
