import { test, expect } from '@jest/globals';
import half from '../src/half.js';

test('half', () => {
  expect(half(6)).toBe(3);
});
