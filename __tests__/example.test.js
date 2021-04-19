import Example from '../src/example.js';

describe('Example', () => {
  test ('should create an Example', () => {
    let example = new Example(5)
    expect(example.number).toEqual(5);
  });
});