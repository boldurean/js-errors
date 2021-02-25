import path from 'path';
import errors from 'errno'; // eslint-disable-line
import Tree from '@hexlet/trees'; // eslint-disable-line
import { Dir, File } from '@hexlet/fs'; // eslint-disable-line

import HexletFsError from './HexletFsError.js';

const getPathParts = (filepath) => (
  filepath.split(path.sep).filter((part) => part !== '')
);

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    return current.getMeta().getStats();
  }

  // BEGIN (write your solution here)
  copySync(src, dest) {
    const data = this.readFileSync(src);
    const destNode = this.findNode(dest);
    if (destNode && destNode.getMeta().isDirectory()) {
      const { base } = path.parse(src);
      const fullDest = path.join(dest, base);
      return this.writeFileSync(fullDest, data);
    }
    return this.writeFileSync(dest, data);
  }
  // END

  writeFileSync(filepath, body) {
    const { dir, base } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || !parent.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    const current = parent.getChild(base);
    if (current && current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    parent.addChild(base, new File(base, body));
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (!parent.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.ENOTDIR, filepath);
    }
    return parent.addChild(base, new File(base, ''));
  }

  mkdirpSync(filepath) {
    getPathParts(filepath).reduce((subtree, part) => {
      const current = subtree.getChild(part);
      if (!current) {
        return subtree.addChild(part, new Dir(part));
      }
      if (!current.getMeta().isDirectory()) {
        throw new HexletFsError(errors.code.ENOTDIR, filepath);
      }

      return current;
    }, this.tree);
  }

  readFileSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      throw new HexletFsError(errors.code.ENOENT, filepath);
    }
    if (current.getMeta().isDirectory()) {
      throw new HexletFsError(errors.code.EISDIR, filepath);
    }
    return current.getMeta().getBody();
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
