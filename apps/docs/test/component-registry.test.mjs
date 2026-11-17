import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const docsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(await readFile(path.join(docsDirectory, 'app/generated/component-registry.json'), 'utf8'));

test('registry covers all public component exports and the optional Expo entry', () => {
  assert.equal(registry.packages.web.componentCount, 45);
  assert.equal(registry.packages.native.componentCount, 44);
  assert.equal(registry.components.filter((component) => component.platforms.web).length, 45);
  assert.equal(registry.components.filter((component) => component.platforms.native).length, 44);
  assert.deepEqual(registry.packages.optionalNativeComponents, [{ name: 'QrScanner', optionalDependencies: ['expo-camera'] }]);
  assert.ok(registry.components.find((component) => component.name === 'QrScanner').platforms.nativeOptional);
});

test('component records contain platform-specific APIs, examples, and defaults from declarations', () => {
  for (const component of registry.components) {
    assert.ok(component.description, `${component.name} has an overview`);
    assert.ok(component.category, `${component.name} has a category`);
    assert.ok(component.status, `${component.name} has a status`);
    assert.ok(component.platforms.web || component.platforms.native || component.platforms.nativeOptional, `${component.name} has a platform`);
    assert.ok(component.examples.customization?.web, `${component.name} has a web customization example`);
    assert.ok(component.examples.customization?.native, `${component.name} has a native customization example`);

    for (const [platform, api] of Object.entries(component.platforms)) {
      if (!api) continue;
      assert.ok(component.examples[platform === 'nativeOptional' ? 'native' : platform], `${component.name} has a ${platform} example`);
      assert.ok(api.sourcePath.startsWith(`packages/${platform === 'web' ? 'react' : 'react-native'}/src/`));
      assert.ok(Array.isArray(api.examples), `${component.name} has extracted ${platform} JSDoc examples`);
      assert.ok(api.examples.length > 0, `${component.name} has at least one source-authored ${platform} example`);
      assert.equal(new Set(api.props.map((property) => property.name)).size, api.props.length, `${component.name} has unique ${platform} prop names`);
      for (const property of api.props) {
        assert.equal(typeof property.type, 'string', `${component.name}.${property.name} has a TypeScript type`);
        assert.equal(typeof property.required, 'boolean', `${component.name}.${property.name} has requiredness`);
        assert.ok(Array.isArray(property.allowedValues), `${component.name}.${property.name} lists allowed values`);
      }
    }
  }
});

test('API extraction includes QZL-defined inherited props and literal unions', () => {
  const stepper = registry.components.find((component) => component.name === 'Stepper');
  const nativeStepperProps = stepper.platforms.native.props.map((property) => property.name);
  assert.ok(nativeStepperProps.includes('steps'));
  assert.ok(nativeStepperProps.includes('activeStep'));

  const button = registry.components.find((component) => component.name === 'Button');
  const variant = button.platforms.web.props.find((property) => property.name === 'variant');
  assert.deepEqual(variant.allowedValues, ['primary', 'secondary', 'ghost', 'danger']);
  assert.ok(variant.relatedTypes.some((type) => type.name === 'ButtonVariant'));

  const nativeButtonStyle = registry.components
    .find((component) => component.name === 'Button')
    .platforms.native.props.find((property) => property.name === 'style');
  assert.deepEqual(nativeButtonStyle.allowedValues, []);
  assert.deepEqual(nativeButtonStyle.relatedTypes, []);
});

test('every advertised interactive preview has a component renderer', async () => {
  const source = await readFile(path.join(docsDirectory, 'app/component-documentation.tsx'), 'utf8');
  const advertised = registry.components.filter((component) => component.preview);
  assert.equal(advertised.length, registry.components.length);
  const missing = advertised.filter((component) => !source.includes(`case '${component.name}':`));
  assert.deepEqual(missing.map((component) => component.name), []);
});

test('StarRating playground keeps its preview value within the declared maximum', async () => {
  const source = await readFile(path.join(docsDirectory, 'app/component-documentation.tsx'), 'utf8');
  const initialRating = Number(source.match(/\brating:\s*(\d+)/)?.[1]);
  const maxProperty = registry.components
    .find((component) => component.name === 'StarRating')
    .platforms.web.props.find((property) => property.name === 'max');
  const maxRating = Number(maxProperty.defaultValue);

  assert.ok(Number.isInteger(initialRating));
  assert.ok(initialRating <= maxRating);
  assert.match(source, /value=\{state\.rating\} max=\{5\} onValueChange=\{\(value\) => update\('rating', value\)\}/);
});

test('coverage report distinguishes generated API data from unverified guidance', async () => {
  const report = await readFile(path.join(docsDirectory, 'docs-coverage.md'), 'utf8');
  assert.match(report, /^\| Component \| Web \| React Native \| Overview/m);
  assert.match(report, /\| Button \| Yes \| Yes \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| — \| — \|/);
  assert.match(report, /A dash means that coverage is not yet authored or verified/);
  const componentRows = report.split('\n').filter((line) => /^\| [A-Z][A-Za-z]+ \|/.test(line) && !line.startsWith('| Component |'));
  assert.equal(componentRows.length, registry.components.length);
});

