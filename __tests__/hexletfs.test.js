import HexletFs from '../src/HexletFs.js';

describe('FS', () => {
  let files;

  beforeEach(() => {
    files = new HexletFs();
    files.mkdirpSync('/etc/nginx');
    files.mkdirpSync('/opt');
    files.touchSync('/opt/file.txt');
    files.mkdirpSync('/etc/nginx/conf.d');
    files.touchSync('/etc/nginx/nginx.conf');
  });

  it('#copySync', () => {
    expect(() => files.copySync('undefined', '/etc'))
      .toThrow(/ENOENT/);

    expect(() => files.copySync('/opt', '/etc')).toThrow(/EISDIR/);

    expect(() => files.copySync('/op/file.txt', '/etc/file.txt/inner'))
      .toThrow(/ENOENT/);

    expect(() => files.copySync('/opt/file.txt', '/etc/undefined/inner'))
      .toThrow(/ENOENT/);

    files.copySync('/opt/file.txt', '/etc');
    expect(files.statSync('/etc/file.txt').isFile()).toBeTruthy();

    files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf');
    expect(files.readFileSync('/etc/nginx/nginx.conf')).toBe('');
  });

  it('#copySync2', () => {
    files.writeFileSync('/opt/file.txt', 'body');
    files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf');
    expect(files.readFileSync('/etc/nginx/nginx.conf')).toBe('body');

    files.copySync('/opt/file.txt', '/etc');
    expect(files.readFileSync('/etc/file.txt')).toBe('body');

    files.copySync('/opt/file.txt', '/opt/newfile');
    expect(files.readFileSync('/opt/newfile')).toBe('body');
  });

  it('#copySync3', () => {
    files.mkdirpSync('/etc/nginx/conf.d');
    files.touchSync('/etc/nginx/nginx.conf');
    files.writeFileSync('/opt/file.txt', 'body');
    expect(() => files.copySync('/opt/file.txt', '/etc/nginx/nginx.conf/testFile'))
      .toThrow(/ENOENT/);
  });
});
