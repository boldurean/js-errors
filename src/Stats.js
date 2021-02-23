export default class Stats {
  constructor(obj) {
    this.obj = obj;
  }

  isFile() {
    return this.obj.isFile();
  }

  isDirectory() {
    return this.obj.isDirectory();
  }
}
