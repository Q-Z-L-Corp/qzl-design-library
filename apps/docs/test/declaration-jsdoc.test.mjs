import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

async function declaration(relativePath) {
  return readFile(path.join(repositoryRoot, relativePath), 'utf8');
}

test('published package declarations retain source JSDoc for IntelliSense', async () => {
  const [webButton, nativeButton, core, tokens] = await Promise.all([
    declaration('packages/react/dist/components/button.d.ts'),
    declaration('packages/react-native/dist/components/button.d.ts'),
    declaration('packages/core/dist/index.d.ts'),
    declaration('packages/tokens/dist/index.d.ts')
  ]);

  assert.match(webButton, /\/\*\*[\s\S]*?\*\/\s*export declare function Button/);
  assert.match(nativeButton, /\/\*\*[\s\S]*?\*\/\s*export declare function Button/);
  assert.match(core, /\/\*\*[\s\S]*?\*\/\s*export declare function clamp/);
  assert.match(tokens, /\/\*\*[\s\S]*?\*\/\s*export declare const qzlTokens/);
});
