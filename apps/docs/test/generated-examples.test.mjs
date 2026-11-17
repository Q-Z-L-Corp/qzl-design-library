import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import ts from 'typescript';

const docsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = path.resolve(docsDirectory, '../..');
const registry = JSON.parse(await readFile(path.join(docsDirectory, 'app/generated/component-registry.json'), 'utf8'));

function readCompilerOptions(configPath) {
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  assert.equal(config.error, undefined, `Could not read ${configPath}`);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configPath));
  assert.deepEqual(parsed.errors, [], `Could not parse ${configPath}`);
  return parsed.options;
}

function checkExamples(platform, apiKey, configPath, exampleDirectory) {
  const sources = new Map();
  for (const component of registry.components) {
    const api = component.platforms[apiKey] ?? (apiKey === 'native' ? component.platforms.nativeOptional : undefined);
    if (!api) continue;
    for (const [kind, example] of Object.entries({
      usage: component.examples[platform],
      customization: component.examples.customization?.[platform]
    })) {
      if (!example) continue;
      const filePath = path.join(exampleDirectory, `${component.slug}-${kind}.tsx`);
      const source = platform === 'web'
        ? example.replace(/^import '@qzl\/react\/styles\.css';\s*$/m, '')
        : example;
      sources.set(path.resolve(filePath), source);
    }
  }

  const options = { ...readCompilerOptions(configPath), noEmit: true, incremental: false, composite: false };
  const host = ts.createCompilerHost(options);
  const originalFileExists = host.fileExists.bind(host);
  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  host.fileExists = (fileName) => sources.has(path.resolve(fileName)) || originalFileExists(fileName);
  host.readFile = (fileName) => sources.get(path.resolve(fileName)) ?? originalReadFile(fileName);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
    const source = sources.get(path.resolve(fileName));
    if (source !== undefined) return ts.createSourceFile(fileName, source, languageVersion, true, ts.ScriptKind.TSX);
    return originalGetSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
  };

  const program = ts.createProgram([...sources.keys()], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const formattedDiagnostics = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => repositoryRoot,
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => '\n'
  });
  assert.equal(diagnostics.length, 0, `${platform} generated examples must type-check:\n${formattedDiagnostics}`);
}

test('generated Web examples type-check against the Web package', () => {
  checkExamples(
    'web',
    'web',
    path.join(docsDirectory, 'tsconfig.json'),
    path.join(docsDirectory, 'app', 'generated-examples-check')
  );
});

test('generated React Native examples type-check against the React Native package', () => {
  checkExamples(
    'native',
    'native',
    path.join(repositoryRoot, 'examples/react-native/tsconfig.json'),
    path.join(repositoryRoot, 'examples/react-native', 'generated-examples-check')
  );
});
