/* eslint-env jest */
import lavaIcons from '../index';

test('has correct properties', () => {
  expect(lavaIcons).toHaveProperty('icons');
  expect(lavaIcons).toHaveProperty('toSvg');
  expect(lavaIcons).toHaveProperty('replace');
});
