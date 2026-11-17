import assert from 'node:assert/strict';
import test from 'node:test';
import { clamp, parseMarkdown } from '../dist/index.js';

test('clamp preserves values within the bounds and clips outliers', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(11, 0, 10), 10);
});

test('parseMarkdown groups common safe preview blocks without interpreting HTML', () => {
  assert.deepEqual(parseMarkdown('# Title\n\n- One\n- Two\n\n> Note\n\n```ts\nconst n = 1;\n```'), [
    { type: 'heading', level: 1, text: 'Title' },
    { type: 'list', items: ['One', 'Two'] },
    { type: 'quote', text: 'Note' },
    { type: 'code', language: 'ts', text: 'const n = 1;' }
  ]);
  assert.deepEqual(parseMarkdown('<script>alert(1)</script>'), [
    { type: 'paragraph', text: '<script>alert(1)</script>' }
  ]);
});
