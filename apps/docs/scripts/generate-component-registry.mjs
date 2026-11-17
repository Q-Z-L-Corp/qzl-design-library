import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '../../..');
const outputDirectory = path.join(repositoryRoot, 'apps/docs/app/generated');
const categoryOrder = ['Actions', 'Forms', 'Selection', 'Feedback', 'Layout', 'Navigation', 'Overlays', 'Data display', 'Advanced'];

const metadata = {
  Accordion: ['Layout', 'Disclose or collapse related content.'],
  Alert: ['Feedback', 'Present an important message with a clear severity.'],
  AreaChart: ['Data display', 'Show volume trends and cumulative series over time.'],
  Avatar: ['Layout', 'Represent a person or account with an image or fallback.'],
  BarChart: ['Data display', 'Compare labeled values in a compact chart.'],
  Badge: ['Feedback', 'Show a short status, category, or count.'],
  Breadcrumbs: ['Navigation', 'Show the current location within a hierarchy.'],
  Button: ['Actions', 'Trigger an action with a clearly communicated priority.'],
  BottomSheet: ['Overlays', 'Present focused content from the bottom edge of the viewport.'],
  Carousel: ['Navigation', 'Browse a sequence of slides with configurable navigation and position indicators.'],
  Card: ['Layout', 'Group related content into a surface.'],
  Checkbox: ['Selection', 'Select one or more independent options.'],
  DataTable: ['Data display', 'Present structured rows and columns with sorting support.'],
  DonutChart: ['Data display', 'Show part-to-whole proportions with labeled categories.'],
  Divider: ['Layout', 'Separate adjacent content groups.'],
  Dialog: ['Overlays', 'Present focused content that requires attention or interaction.'],
  DropdownMenu: ['Navigation', 'Reveal a menu of actions from a trigger.'],
  FileUploadInput: ['Forms', 'Select files through the platform file-selection control.'],
  HelperText: ['Forms', 'Provide supporting or error text near a form control.'],
  Indicator: ['Feedback', 'Communicate a concise status with a visual marker.'],
  IconButton: ['Actions', 'Trigger an action using a compact labeled icon control.'],
  Input: ['Forms', 'Accept a single line of text.'],
  LineChart: ['Data display', 'Compare trends across categories or time series.'],
  MetricCard: ['Data display', 'Highlight a key value with changes and comparison context.'],
  MarkdownEditor: ['Advanced', 'Edit Markdown and optionally preview the supported safe syntax.'],
  NavigationMenu: ['Navigation', 'Present a set of primary navigation destinations.'],
  Pagination: ['Navigation', 'Move through a sequence of result pages.'],
  Pips: ['Navigation', 'Choose or indicate a position in a small set.'],
  Popover: ['Overlays', 'Reveal contextual information beside its trigger.'],
  Progress: ['Feedback', 'Communicate progress toward a measurable value.'],
  QrScanner: ['Advanced', 'Start a QR scan only after an explicit user action.'],
  RadioGroup: ['Selection', 'Choose one option from a mutually exclusive set.'],
  Skeleton: ['Feedback', 'Show a placeholder while content is loading.'],
  SegmentedButtons: ['Selection', 'Choose one option from a compact set of segments.'],
  Select: ['Forms', 'Choose a value from a form selection control.'],
  SelectCard: ['Selection', 'Choose one option from a set of descriptive cards.'],
  SideSheet: ['Overlays', 'Present focused content from the side of the viewport.'],
  Slider: ['Forms', 'Choose a numeric value within a range.'],
  Spinner: ['Feedback', 'Indicate that an operation is in progress.'],
  StarRating: ['Selection', 'Display or select a score using a row of stars.'],
  SteppedProgressBar: ['Feedback', 'Show progress through a sequence of named steps.'],
  Stepper: ['Forms', 'Move forward and backward through a sequence of steps.'],
  Switch: ['Selection', 'Turn a setting on or off.'],
  Tag: ['Layout', 'Label, categorize, or optionally remove a piece of content.'],
  Tabs: ['Navigation', 'Switch between related panels of content.'],
  Textarea: ['Forms', 'Accept multi-line text.'],
  Toast: ['Feedback', 'Communicate a brief outcome or update.'],
  Tooltip: ['Overlays', 'Reveal a short explanation associated with an element.'],
  Typography: ['Layout', 'Apply a semantic text role and type scale.']
};

function packageConfiguration(platform) {
  const packageSettings = {
    web: { packageName: '@qzlcorp/react', directory: 'react' },
    native: { packageName: '@qzlcorp/react-native', directory: 'react-native', optionalEntry: 'src/expo/qr-scanner.tsx' },
    core: { packageName: '@qzlcorp/core', directory: 'core' },
    tokens: { packageName: '@qzlcorp/tokens', directory: 'tokens' }
  }[platform];
  if (!packageSettings) throw new Error(`Unknown package platform: ${platform}`);
  const packageDirectory = path.join(repositoryRoot, 'packages', packageSettings.directory);
  return {
    packageName: packageSettings.packageName,
    packageDirectory,
    entryPath: path.join(packageDirectory, 'src/index.ts'),
    optionalEntryPath: packageSettings.optionalEntry
      ? path.join(packageDirectory, packageSettings.optionalEntry)
      : undefined
  };
}

function getComment(symbol, checker) {
  return ts.displayPartsToString(symbol?.getDocumentationComment(checker) ?? []).trim();
}

function getJSDocTags(symbol, checker) {
  return (symbol?.getJsDocTags(checker) ?? []).map((tag) => ({
    name: tag.name,
    text: typeof tag.text === 'string' ? tag.text : ts.displayPartsToString(tag.text ?? []).trim()
  }));
}

function getJSDocTagText(symbol, checker, name) {
  return getJSDocTags(symbol, checker).filter((tag) => tag.name === name).map((tag) => tag.text).filter(Boolean);
}

function getExamples(symbol, checker) {
  return getJSDocTagText(symbol, checker, 'example');
}

function isPackageSource(fileName) {
  const sourcePath = fileName.split(path.sep).join('/');
  return sourcePath.includes('/packages/react/src/')
    || sourcePath.includes('/packages/react-native/src/')
    || sourcePath.includes('/packages/core/src/')
    || sourcePath.includes('/packages/tokens/src/');
}

function getParameterDefaults(functionDeclaration, sourceFile) {
  const defaults = new Map();
  const firstParameter = functionDeclaration.parameters[0];
  if (!firstParameter || !ts.isObjectBindingPattern(firstParameter.name)) return defaults;

  for (const element of firstParameter.name.elements) {
    if (!element.initializer) continue;
    const propertyName = element.propertyName ?? element.name;
    if (!ts.isIdentifier(propertyName) && !ts.isStringLiteral(propertyName)) continue;
    defaults.set(propertyName.text, element.initializer.getText(sourceFile));
  }
  return defaults;
}

function getDeclaredProperties(propsType, checker) {
  const symbol = propsType.aliasSymbol ?? propsType.getSymbol();
  const declarations = symbol?.declarations ?? [];
  const propertyDeclarations = new Map();
  const baseTypes = [];

  for (const declaration of declarations) {
    if (ts.isInterfaceDeclaration(declaration)) {
      for (const clause of declaration.heritageClauses ?? []) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          baseTypes.push(...clause.types.map((type) => type.getText(declaration.getSourceFile())));
        }
      }
    } else if (ts.isTypeAliasDeclaration(declaration)) {
      if (ts.isIntersectionTypeNode(declaration.type)) {
        baseTypes.push(...declaration.type.types.filter(ts.isTypeReferenceNode).map((type) => type.getText(declaration.getSourceFile())));
      }
    }
  }

  for (const property of checker.getPropertiesOfType(propsType)) {
    const declaration = property.valueDeclaration ?? property.declarations?.[0];
    if (!declaration || !ts.isPropertySignature(declaration)) continue;
    const sourcePath = declaration.getSourceFile().fileName.split(path.sep).join('/');
    if (!sourcePath.includes('/packages/react/src/') && !sourcePath.includes('/packages/react-native/src/')) continue;
    propertyDeclarations.set(property.getName(), declaration);
  }

  return { propertyDeclarations: [...propertyDeclarations.values()], baseTypes: [...new Set(baseTypes)] };
}

function getAllowedValues(type) {
  const nonNullable = type.getNonNullableType?.() ?? type;
  const members = nonNullable.isUnion() ? nonNullable.types : [nonNullable];
  if (members.length < 2) return [];
  const isLiteral = (member) => member.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral | ts.TypeFlags.BooleanLiteral);
  if (!members.every(isLiteral)) return [];
  return members.map((member) => {
    if (member.flags & ts.TypeFlags.StringLiteral) return member.value;
    if (member.flags & ts.TypeFlags.NumberLiteral) return member.value;
    return member.intrinsicName === 'true';
  });
}

function getTypeDefinitions(typeNode, checker) {
  const declarations = new Map();
  const visited = new Set();
  const visit = (node) => {
    if (ts.isTypeReferenceNode(node)) {
      const importedSymbol = checker.getSymbolAtLocation(node.typeName);
      const symbol = importedSymbol && (importedSymbol.flags & ts.SymbolFlags.Alias)
        ? checker.getAliasedSymbol(importedSymbol)
        : importedSymbol;
      for (const declaration of symbol?.declarations ?? []) {
        if (!isPackageSource(declaration.getSourceFile().fileName)) continue;
        if (!ts.isTypeAliasDeclaration(declaration) && !ts.isInterfaceDeclaration(declaration)) continue;
        const key = `${declaration.getSourceFile().fileName}:${declaration.pos}`;
        if (visited.has(key)) continue;
        visited.add(key);
        declarations.set(key, declaration);
        if (ts.isTypeAliasDeclaration(declaration)) visit(declaration.type);
      }
    }
    ts.forEachChild(node, visit);
  };
  if (typeNode) visit(typeNode);

  return [...declarations.values()].map((declaration) => {
    const symbol = checker.getSymbolAtLocation(declaration.name);
    return {
      name: declaration.name.text,
      definition: declaration.getText(declaration.getSourceFile()),
      description: getComment(symbol, checker),
      examples: getExamples(symbol, checker),
      sourcePath: path.relative(repositoryRoot, declaration.getSourceFile().fileName).split(path.sep).join('/')
    };
  });
}

function serializeComponent(platform, packageName, functionDeclaration, checker) {
  const sourceFile = functionDeclaration.getSourceFile();
  const propsParameter = functionDeclaration.parameters[0];
  const propsType = propsParameter?.type ? checker.getTypeFromTypeNode(propsParameter.type) : undefined;
  const defaults = getParameterDefaults(functionDeclaration, sourceFile);
  const { propertyDeclarations, baseTypes } = propsType
    ? getDeclaredProperties(propsType, checker)
    : { propertyDeclarations: [], baseTypes: [] };
  const props = propertyDeclarations.flatMap((declaration) => {
    if (!declaration.name || (!ts.isIdentifier(declaration.name) && !ts.isStringLiteral(declaration.name))) return [];
    const propName = declaration.name.text;
    const propertySymbol = propsType && checker.getPropertyOfType(propsType, propName);
    const propertyType = propertySymbol
      ? checker.getTypeOfSymbolAtLocation(propertySymbol, declaration)
      : declaration.type && checker.getTypeFromTypeNode(declaration.type);
    const documentedDefault = getJSDocTagText(propertySymbol, checker, 'default')[0];
    const defaultValue = defaults.get(propName);
    const typeInformation = getTypeDefinitions(declaration.type, checker);
    return [{
      name: propName,
      type: propertyType ? checker.typeToString(propertyType, declaration, ts.TypeFormatFlags.NoTruncation) : 'unknown',
      optional: Boolean(declaration.questionToken),
      required: !declaration.questionToken && defaultValue === undefined,
      defaultValue: defaultValue ?? null,
      description: getComment(propertySymbol, checker),
      documentedDefault: documentedDefault ?? null,
      allowedValues: propertyType ? getAllowedValues(propertyType) : [],
      relatedTypes: typeInformation
    }];
  });
  const componentSymbol = checker.getSymbolAtLocation(functionDeclaration.name);
  const componentDescription = getComment(componentSymbol, checker);
  const relativeSourcePath = path.relative(repositoryRoot, sourceFile.fileName).split(path.sep).join('/');

  return {
    platform,
    packageName,
    importPath: platform === 'native' && relativeSourcePath.includes('/expo/')
      ? `${packageName}/expo/qr-scanner`
      : packageName,
    sourcePath: relativeSourcePath,
    description: componentDescription,
    examples: getExamples(componentSymbol, checker),
    propsType: propsParameter?.type?.getText(sourceFile) ?? null,
    extends: baseTypes,
    props
  };
}

function getNodeSymbol(node, checker) {
  return node.name ? checker.getSymbolAtLocation(node.name) : undefined;
}

function getNamedMembers(declaration) {
  if (ts.isInterfaceDeclaration(declaration)) return declaration.members;
  if (ts.isTypeAliasDeclaration(declaration)) {
    if (ts.isTypeLiteralNode(declaration.type)) return declaration.type.members;
    if (ts.isUnionTypeNode(declaration.type) || ts.isIntersectionTypeNode(declaration.type)) {
      return declaration.type.types.flatMap((type) => ts.isTypeLiteralNode(type) ? type.members : []);
    }
  }
  if (ts.isEnumDeclaration(declaration)) return declaration.members;
  if (ts.isClassDeclaration(declaration)) return declaration.members;
  return [];
}

function getFunctionTypeParameters(node) {
  if (ts.isFunctionTypeNode(node)) return node.parameters;
  if (ts.isParenthesizedTypeNode(node)) return getFunctionTypeParameters(node.type);
  if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
    return node.types.flatMap(getFunctionTypeParameters);
  }
  return [];
}

function hasParameterDocumentation(declaration, parameter, checker, ownerSymbol) {
  const parameterSymbol = parameter.name && ts.isIdentifier(parameter.name)
    ? checker.getSymbolAtLocation(parameter.name)
    : undefined;
  if (getComment(parameterSymbol, checker)) return true;
  const parameterName = parameter.name && ts.isIdentifier(parameter.name) ? parameter.name.text : undefined;
  if (!parameterName) return false;
  const declarationSymbol = ownerSymbol ?? getNodeSymbol(declaration, checker);
  return getJSDocTags(declarationSymbol, checker).some((tag) =>
    tag.name === 'param' && tag.text.trim().match(/^\[?([^\]\s=]+)(?:[=\]])?(?:\s|$)/)?.[1] === parameterName
  );
}

function getPublicApiRecords(program, entryPath, platform, packageName) {
  const checker = program.getTypeChecker();
  const entryFile = program.getSourceFile(entryPath);
  const entrySymbol = entryFile && checker.getSymbolAtLocation(entryFile);
  if (!entrySymbol) throw new Error(`Could not resolve package entry point: ${entryPath}`);

  return checker.getExportsOfModule(entrySymbol).flatMap((exportSymbol) => {
    const target = exportSymbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exportSymbol) : exportSymbol;
    const declaration = target.declarations?.find((item) => isPackageSource(item.getSourceFile().fileName));
    if (!declaration) return [];
    const sourceFile = declaration.getSourceFile();
    const declarationSymbol = getNodeSymbol(declaration, checker) ?? target;
    const exportedType = checker.getTypeOfSymbolAtLocation(target, declaration);
    const isCallable = checker.getSignaturesOfType(exportedType, ts.SignatureKind.Call).length > 0;
    const isComponent = isCallable && /^[A-Z]/.test(exportSymbol.name);
    const isHook = isCallable && /^use[A-Z]/.test(exportSymbol.name);
    const kind = isComponent ? 'component'
      : isHook ? 'hook'
        : isCallable ? 'function'
          : ts.isInterfaceDeclaration(declaration) ? 'interface'
            : ts.isTypeAliasDeclaration(declaration) ? 'type'
              : ts.isEnumDeclaration(declaration) ? 'enum'
                : ts.isClassDeclaration(declaration) ? 'class'
                  : ts.isVariableDeclaration(declaration) ? 'constant'
                    : 'other';
    const members = getNamedMembers(declaration).flatMap((member) => {
      if (!member.name) return [];
      const symbol = checker.getSymbolAtLocation(member.name);
      const memberName = member.name.getText(sourceFile);
      const callbackParameters = member.type
        ? getFunctionTypeParameters(member.type)
        : ts.isMethodSignature(member) || ts.isMethodDeclaration(member)
          ? member.parameters
          : [];
      const callbackParameterDocs = callbackParameters.map((parameter) => ({
        name: parameter.name.getText(sourceFile),
        type: parameter.type?.getText(sourceFile) ?? 'unknown',
        description: getComment(checker.getSymbolAtLocation(parameter.name), checker),
        documented: hasParameterDocumentation(declaration, parameter, checker, symbol)
      }));
      return [{
        name: memberName,
        type: member.type?.getText(sourceFile)
          ?? (ts.isMethodSignature(member) || ts.isMethodDeclaration(member)
            ? `(${member.parameters.map((parameter) => `${parameter.name.getText(sourceFile)}: ${parameter.type?.getText(sourceFile) ?? 'unknown'}`).join(', ')}) => ${member.type?.getText(sourceFile) ?? 'void'}`
            : ts.isEnumMember(member) ? member.initializer?.getText(sourceFile) ?? 'enum member' : 'member'),
        optional: Boolean(member.questionToken),
        description: getComment(symbol, checker),
        callbackParameters: callbackParameterDocs
      }];
    });
    const functionDeclaration = ts.isFunctionDeclaration(declaration)
      ? declaration
      : ts.isVariableDeclaration(declaration) && declaration.initializer
        && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))
        ? declaration.initializer
        : undefined;
    const functionParameters = functionDeclaration && !isComponent
      ? functionDeclaration.parameters.map((parameter) => ({
        name: parameter.name.getText(sourceFile),
        type: parameter.type?.getText(sourceFile) ?? 'unknown',
        description: parameter.name && ts.isIdentifier(parameter.name)
          ? getComment(checker.getSymbolAtLocation(parameter.name), checker)
          : '',
        documented: hasParameterDocumentation(declaration, parameter, checker, declarationSymbol)
      }))
      : ts.isTypeAliasDeclaration(declaration)
        ? getFunctionTypeParameters(declaration.type).map((parameter) => ({
          name: parameter.name.getText(sourceFile),
          type: parameter.type?.getText(sourceFile) ?? 'unknown',
          description: parameter.name && ts.isIdentifier(parameter.name)
            ? getComment(checker.getSymbolAtLocation(parameter.name), checker)
            : '',
          documented: hasParameterDocumentation(declaration, parameter, checker)
        }))
        : [];
    const examples = getExamples(declarationSymbol, checker);
    const signature = isCallable
      ? checker.typeToString(exportedType, declaration, ts.TypeFormatFlags.NoTruncation)
      : ts.isTypeAliasDeclaration(declaration)
        ? declaration.type.getText(sourceFile)
        : ts.isInterfaceDeclaration(declaration) ? `interface ${declaration.name.text}`
          : ts.isEnumDeclaration(declaration) ? `enum ${declaration.name.text}`
            : ts.isVariableDeclaration(declaration) ? `typeof ${declaration.name.getText(sourceFile)}`
              : declaration.name?.getText(sourceFile) ?? exportSymbol.name;
    return [{
      packageName,
      platform,
      name: exportSymbol.name,
      kind,
      signature,
      sourcePath: path.relative(repositoryRoot, sourceFile.fileName).split(path.sep).join('/'),
      description: getComment(declarationSymbol, checker),
      examples,
      members,
      parameters: functionParameters
    }];
  });
}

function createApiDocumentationCoverage(packages) {
  const rows = packages.flatMap(({ publicApi }) => publicApi);
  const failures = [];
  let totalChecks = 0;
  const requireDocumented = (condition, message) => {
    totalChecks += 1;
    if (!condition) failures.push(message);
  };
  for (const api of rows) {
    requireDocumented(Boolean(api.description), `${api.packageName}: ${api.name} is missing a description.`);
    if (['component', 'hook', 'function'].includes(api.kind)) {
      requireDocumented(api.examples.length > 0, `${api.packageName}: ${api.name} is missing a @example.`);
    }
    for (const member of api.members) {
      requireDocumented(Boolean(member.description), `${api.packageName}: ${api.name}.${member.name} is missing a description.`);
      for (const parameter of member.callbackParameters) {
        requireDocumented(parameter.documented, `${api.packageName}: ${api.name}.${member.name} callback parameter "${parameter.name}" is missing documentation.`);
      }
    }
    for (const parameter of api.parameters) {
      requireDocumented(parameter.documented, `${api.packageName}: ${api.name} parameter "${parameter.name}" is missing documentation.`);
    }
  }
  for (const { packageName, components } of packages) {
    for (const component of components) {
      for (const property of component.api.props) {
        requireDocumented(Boolean(property.description), `${packageName}: ${component.name}.${property.name} is missing a description.`);
        const runtimeDefault = property.defaultValue;
        if (runtimeDefault !== null) {
          requireDocumented(property.documentedDefault !== null, `${packageName}: ${component.name}.${property.name} is missing @default documentation.`);
        }
        if (property.documentedDefault !== null && runtimeDefault !== null) {
          const normalize = (value) => value.trim().replace(/^(['"])(.*)\1$/, '$2');
          requireDocumented(
            normalize(runtimeDefault) === normalize(property.documentedDefault),
            `${packageName}: ${component.name}.${property.name} @default "${property.documentedDefault}" does not match "${runtimeDefault}".`
          );
        }
      }
    }
  }
  return { total: totalChecks, documented: totalChecks - failures.length, failures };
}

function renderApiDocumentationCoverage(packages, coverage) {
  const lines = [
    '# Public API JSDoc coverage',
    '',
    'Generated from the exported TypeScript APIs of `@qzlcorp/react`, `@qzlcorp/react-native`, `@qzlcorp/core`, and `@qzlcorp/tokens`.',
    '',
    `Coverage: ${coverage.documented}/${coverage.total} public API documentation checks pass.`,
    '',
    '| Package | Public symbols | Components | Hooks | Utilities | Types | Constants |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: |'
  ];
  for (const { packageName, publicApi } of packages) {
    const count = (kind) => publicApi.filter((api) => api.kind === kind).length;
    lines.push(`| ${packageName} | ${publicApi.length} | ${count('component')} | ${count('hook')} | ${count('function')} | ${count('type') + count('interface') + count('enum')} | ${count('constant')} |`);
  }
  lines.push('', '## Missing documentation', '');
  if (coverage.failures.length === 0) {
    lines.push('No missing public API documentation was found.');
  } else {
    lines.push(...coverage.failures.map((failure) => `- ${failure}`));
  }
  lines.push('');
  return lines.join('\n');
}

function getExportedComponents(program, entryPath, platform, packageName) {
  const checker = program.getTypeChecker();
  const entryFile = program.getSourceFile(entryPath);
  const entrySymbol = entryFile && checker.getSymbolAtLocation(entryFile);
  if (!entrySymbol) throw new Error(`Could not resolve package entry point: ${entryPath}`);

  return checker.getExportsOfModule(entrySymbol).flatMap((exportSymbol) => {
    const target = exportSymbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exportSymbol) : exportSymbol;
    const declaration = target.declarations?.find((item) => ts.isFunctionDeclaration(item) && item.name?.text === exportSymbol.name);
    if (!declaration || !/^[A-Z]/.test(exportSymbol.name)) return [];
    return [{
      name: exportSymbol.name,
      api: serializeComponent(platform, packageName, declaration, checker)
    }];
  });
}

function getOptionalNativeComponents(program, filePath, packageName) {
  if (!filePath) return [];
  const sourceFile = program.getSourceFile(filePath);
  if (!sourceFile) throw new Error(`Could not read optional platform entry: ${filePath}`);
  const checker = program.getTypeChecker();
  return sourceFile.statements.flatMap((statement) => {
    if (!ts.isFunctionDeclaration(statement) || !statement.name || !statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) return [];
    return [{
      name: statement.name.text,
      api: serializeComponent('native', packageName, statement, checker),
      optional: true,
      optionalDependencies: ['expo-camera']
    }];
  });
}

async function loadPackage(platform) {
  const configuration = packageConfiguration(platform);
  const configPath = path.join(configuration.packageDirectory, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configuration.packageDirectory);
  const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: { ...parsed.options, noEmit: true, incremental: false }
  });
  const packageJson = JSON.parse(await readFile(path.join(configuration.packageDirectory, 'package.json'), 'utf8'));
  const components = getExportedComponents(program, configuration.entryPath, platform, configuration.packageName);
  const optionalComponents = getOptionalNativeComponents(program, configuration.optionalEntryPath, configuration.packageName);
  const publicApi = getPublicApiRecords(program, configuration.entryPath, platform, configuration.packageName);
  if (configuration.optionalEntryPath) {
    publicApi.push(...getPublicApiRecords(program, configuration.optionalEntryPath, platform, configuration.packageName));
  }
  return { components, optionalComponents, publicApi, version: packageJson.version, packageName: configuration.packageName };
}

function kebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function getCoverage(component) {
  const platforms = [component.platforms.web, component.platforms.native, component.platforms.nativeOptional].filter(Boolean);
  return {
    overview: Boolean(component.description),
    webExample: Boolean(component.examples?.web),
    nativeExample: Boolean(component.examples?.native) && Boolean(component.platforms.native || component.platforms.nativeOptional),
    apiReference: platforms.every((platform) => platform.props),
    interactivePreview: Boolean(component.preview),
    customization: Boolean(component.examples?.customization?.web && component.examples?.customization?.native),
    accessibility: false,
    relatedComponents: false
  };
}

function renderCoverageReport(components) {
  const lines = [
    '# Component documentation coverage',
    '',
    'Generated from the public package exports and TypeScript component prop declarations.',
    '',
    '| Component | Web | React Native | Overview | Web example | React Native example | API | Preview | Customization | Accessibility | Related |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |'
  ];
  for (const component of components) {
    const coverage = getCoverage(component);
    lines.push(`| ${component.name} | ${component.platforms.web ? 'Yes' : '—'} | ${component.platforms.native ? 'Yes' : component.platforms.nativeOptional ? 'Optional' : '—'} | ${coverage.overview ? '✓' : '—'} | ${coverage.webExample ? '✓' : '—'} | ${coverage.nativeExample ? '✓' : '—'} | ${coverage.apiReference ? '✓' : '—'} | ${coverage.interactivePreview ? '✓' : '—'} | ${coverage.customization ? '✓' : '—'} | ${coverage.accessibility ? '✓' : '—'} | ${coverage.relatedComponents ? '✓' : '—'} |`);
  }
  lines.push('', `Total: ${components.length} component records.`, '', 'A dash means that coverage is not yet authored or verified; generated API data alone does not count as complete documentation.', '');
  return lines.join('\n');
}

function getExampleValue(componentName, prop, platform) {
  const { name, type } = prop;
  if (name.startsWith('on') || type.includes('=>')) {
    if (name === 'getRowKey') return 'row => row.name';
    return '() => {}';
  }
  if (name === 'children') return null;
  if (name === 'label') return "'Example label'";
  if (name === 'title') return componentName === 'BarChart' ? "'Weekly activity'" : "'Example title'";
  if (name === 'description') return "'A short supporting description.'";
  if (name === 'caption') return "'Example records'";
  if (name === 'name') return componentName === 'Avatar' ? "'Alex Morgan'" : "'plan'";
  if (name === 'trigger') return "'More information'";
  if (name === 'value') return componentName === 'MetricCard' ? "'$24.8k'" : type.includes('number') ? '4' : "'team'";
  if (name === 'page') return '1';
  if (name === 'pageCount' || name === 'count') return '3';
  if (name === 'index' || name === 'activeStep') return '0';
  if (name === 'max') return '5';
  if (name === 'open' || name === 'checked') return 'false';
  if (name === 'steps') return "[{ label: 'Profile' }, { label: 'Review' }]";
  if (name === 'slides') return platform === 'native'
    ? "[<Typography key=\"overview\">Overview</Typography>, <Typography key=\"details\">Details</Typography>]"
    : "[<span>Overview</span>, <span>Details</span>]";
  if (name === 'labels' && ['LineChart', 'AreaChart'].includes(componentName)) return "['Mon', 'Tue', 'Wed']";
  if (name === 'series' && ['LineChart', 'AreaChart'].includes(componentName)) return "[{ label: 'Visits', values: [12, 18, 15] }]";
  if (name === 'data' && componentName === 'DonutChart') return "[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]";
  if (name === 'data') return "[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]";
  if (name === 'rows') return "[{ name: 'Design system' }, { name: 'Component docs' }]";
  if (name === 'columns') return "[{ key: 'name', header: 'Name', render: (row: { name: string }) => row.name, sortValue: (row: { name: string }) => row.name }]";
  if (name === 'items') {
    if (componentName === 'Breadcrumbs') return platform === 'native'
      ? "[{ label: 'Home' }, { label: 'Current page' }]"
      : "[{ label: 'Home', href: '/' }, { label: 'Current page' }]";
    if (componentName === 'DropdownMenu') return "[{ label: 'Edit', onSelect: () => {} }, { label: 'Duplicate', onSelect: () => {} }]";
    if (componentName === 'NavigationMenu' && platform === 'native') return "[{ label: 'Overview', onPress: () => {}, current: true }, { label: 'Components', onPress: () => {} }]";
    if (componentName === 'Tabs') return "[{ value: 'overview', label: 'Overview' }, { value: 'details', label: 'Details' }]";
    return "[{ label: 'Overview', href: '/' }, { label: 'Components', href: '/components' }]";
  }
  if (name === 'options') {
    if (componentName === 'SelectCard') return "[{ value: 'team', title: 'Team', description: 'For collaboration' }]";
    if (componentName === 'SegmentedButtons') return "[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]";
    return "[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]";
  }
  if (name === 'accept') return "'.pdf'";
  if (name === 'selectedFiles') return "['report.pdf']";
  if (name === 'placeholder') return "'Enter a value'";
  if (name === 'error' || name === 'disabled' || name === 'multiple' || name === 'preview' || name === 'circle' || name === 'elevated' || name === 'fullWidth' || name === 'decorative') return 'false';
  if (type.includes('number')) return '1';
  if (type.includes('boolean')) return 'false';
  if (type.endsWith('[]')) return '[]';
  if (type.includes('string')) return "'Example'";
  return null;
}

function getExampleBody(componentName, platform, props) {
  if (componentName === 'Select' && platform === 'web') {
    return '<option value="team">Team</option>';
  }
  if (componentName === 'Button' && platform === 'native') return null;
  if (componentName === 'Tooltip' && platform === 'web') {
    return '<Button>Focus or hover</Button>';
  }
  const needsChildren = new Set([
    'Accordion', 'Alert', 'Badge', 'BottomSheet', 'Button', 'Card', 'Dialog', 'HelperText',
    'IconButton', 'Popover', 'SideSheet', 'Tag', 'Tooltip', 'Typography'
  ]);
  if (!needsChildren.has(componentName) && !props.some((prop) => prop.name === 'children' && prop.required)) return null;
  if (componentName === 'IconButton') return platform === 'native' ? '<Text>⌕</Text>' : '<span aria-hidden="true">⌕</span>';
  if (componentName === 'Tooltip' && platform === 'native') return '<Text>Focus for help</Text>';
  return platform === 'native' ? '<Text>Example content</Text>' : 'Example content';
}

function getExampleExtras(componentName, platform) {
  if (platform !== 'web') return [];
  const extraProps = {
    Checkbox: ['checked={false}', 'onChange={() => {}}', 'aria-label="Remember this choice"'],
    Input: ['aria-label="Project name"', 'placeholder="Name your project"'],
    Select: ['aria-label="Choose a plan"', 'value="team"'],
    Textarea: ['aria-label="Notes"', 'placeholder="Write a note"'],
    Tooltip: []
  };
  return extraProps[componentName] ?? [];
}

function generateExample(componentName, api, platform) {
  return generateExampleWithOverrides(componentName, api, platform, {});
}

function getCustomizationOverrides(componentName, api, platform) {
  const preferredProps = ['variant', 'status', 'size', 'orientation', 'theme'];
  const candidates = [
    ...preferredProps.map((name) => api.props.find((property) => property.name === name)),
    ...api.props.filter((property) => property.optional && property.allowedValues.length > 1)
  ].filter(Boolean);

  for (const property of candidates) {
    const defaultValue = property.defaultValue?.replace(/^['"]|['"]$/g, '');
    const value = property.allowedValues.find((allowedValue) => String(allowedValue) !== defaultValue);
    if (value !== undefined) return { [property.name]: JSON.stringify(value) };
  }

  if (componentName === 'Carousel' && api.props.some((property) => property.name === 'defaultIndex')) {
    return { defaultIndex: '1' };
  }
  if (componentName === 'Tabs' && api.props.some((property) => property.name === 'value')) {
    return { value: "'details'" };
  }
  if (componentName === 'Tooltip' && api.props.some((property) => property.name === 'content')) {
    return { content: "'Helpful details for this action.'" };
  }

  if (platform === 'web' && (api.props.some((property) => property.name === 'className') || api.extends.some((type) => /HTMLAttributes/.test(type)))) {
    return { className: "'custom-example'" };
  }
  if (platform === 'native' && api.props.some((property) => property.name === 'style')) {
    return { style: '{ opacity: 0.9 }' };
  }
  return null;
}

function generateCustomizationExample(componentName, api, platform) {
  const overrides = getCustomizationOverrides(componentName, api, platform);
  return overrides ? generateExampleWithOverrides(componentName, api, platform, overrides) : undefined;
}

function formatExampleAttribute(name, value) {
  if (/^"[^"]*"$/.test(value)) return `${name}=${value}`;
  const stringLiteral = value.match(/^'([^'\\]*)'$/);
  if (stringLiteral) return `${name}=${JSON.stringify(stringLiteral[1])}`;
  return `${name}={${value}}`;
}

function generateExampleWithOverrides(componentName, api, platform, overrides) {
  const props = api.props.filter((prop) => prop.required && prop.name !== 'children');
  const attributes = props.flatMap((prop) => {
    const value = overrides[prop.name] ?? getExampleValue(componentName, prop, platform);
    return value === null ? [] : [formatExampleAttribute(prop.name, value)];
  });
  for (const [name, value] of Object.entries(overrides)) {
    if (!props.some((prop) => prop.name === name)) attributes.push(formatExampleAttribute(name, value));
  }
  attributes.push(...getExampleExtras(componentName, platform));
  const body = getExampleBody(componentName, platform, api.props);
  const childRequired = api.props.some((prop) => prop.name === 'children' && prop.required);
  const selfClosing = !body && !childRequired;
  const componentTag = componentName;
  const componentMarkup = selfClosing
    ? `<${componentTag}${attributes.length ? ` ${attributes.join(' ')}` : ''} />`
    : `<${componentTag}${attributes.length ? ` ${attributes.join(' ')}` : ''}>\n      ${body ?? ''}\n    </${componentTag}>`;
  const importedComponents = [componentName];
  if (componentName === 'Carousel' && platform === 'native') importedComponents.push('Typography');
  if (componentName === 'Tooltip' && platform === 'web') importedComponents.push('Button');
  const imports = [`import { ${importedComponents.join(', ')} } from '${api.importPath}';`];
  if (platform === 'web') imports.push("import '@qzlcorp/react/styles.css';");
  if (platform === 'native' && body?.includes('<Text')) imports.push("import { Text } from 'react-native';");
  return `${imports.join('\n')}\n\nexport function Example() {\n  return (\n    ${componentMarkup}\n  );\n}`;
}

const [webPackage, nativePackage, corePackage, tokensPackage] = await Promise.all([
  loadPackage('web'),
  loadPackage('native'),
  loadPackage('core'),
  loadPackage('tokens')
]);
const apiPackages = [webPackage, nativePackage, corePackage, tokensPackage].map((pkg) => ({
  ...pkg,
  components: [...pkg.components, ...pkg.optionalComponents]
}));
const apiDocumentationCoverage = createApiDocumentationCoverage(apiPackages);
const publicApiDocumentation = {
  coverage: apiDocumentationCoverage,
  packages: apiPackages.map(({ packageName, publicApi }) => ({ packageName, publicApi }))
};
const componentMap = new Map();

for (const item of webPackage.components) {
  const [category] = metadata[item.name] ?? ['Uncategorized'];
  componentMap.set(item.name, {
    name: item.name,
    slug: kebabCase(item.name),
    category,
    description: item.api.description,
    status: 'beta',
    preview: Boolean(metadata[item.name]),
    examples: {
      web: generateExample(item.name, item.api, 'web'),
      customization: { web: generateCustomizationExample(item.name, item.api, 'web') }
    },
    platforms: { web: { ...item.api, version: webPackage.version } }
  });
}

for (const item of nativePackage.components) {
  const component = componentMap.get(item.name);
  if (component) {
    component.platforms.native = { ...item.api, version: nativePackage.version };
    component.examples.native = generateExample(item.name, item.api, 'native');
    component.examples.customization.native = generateCustomizationExample(item.name, item.api, 'native');
  }
  else {
    const [category] = metadata[item.name] ?? ['Uncategorized'];
    componentMap.set(item.name, {
      name: item.name,
      slug: kebabCase(item.name),
      category,
      description: item.api.description,
      status: 'beta',
      preview: Boolean(metadata[item.name]),
      examples: {
        native: generateExample(item.name, item.api, 'native'),
        customization: { native: generateCustomizationExample(item.name, item.api, 'native') }
      },
      platforms: { native: { ...item.api, version: nativePackage.version } }
    });
  }
}

for (const item of nativePackage.optionalComponents) {
  const component = componentMap.get(item.name);
  if (component) {
    component.platforms.nativeOptional = { ...item.api, version: nativePackage.version, dependencies: item.optionalDependencies };
    component.examples.native = generateExample(item.name, item.api, 'native');
    component.examples.customization.native = generateCustomizationExample(item.name, item.api, 'native');
  } else {
    const [category] = metadata[item.name] ?? ['Advanced'];
    componentMap.set(item.name, {
      name: item.name,
      slug: kebabCase(item.name),
      category,
      description: item.api.description,
      status: 'beta',
      preview: Boolean(metadata[item.name]),
      examples: {
        native: generateExample(item.name, item.api, 'native'),
        customization: { native: generateCustomizationExample(item.name, item.api, 'native') }
      },
      platforms: { nativeOptional: { ...item.api, version: nativePackage.version, dependencies: item.optionalDependencies } }
    });
  }
}

const components = [...componentMap.values()].sort((left, right) =>
  categoryOrder.indexOf(left.category) - categoryOrder.indexOf(right.category) || left.name.localeCompare(right.name)
);
const registry = {
  generatedAt: new Date().toISOString(),
  categories: [...new Set(components.map((component) => component.category))],
  packages: {
    web: { name: webPackage.packageName, version: webPackage.version, componentCount: webPackage.components.length },
    native: { name: nativePackage.packageName, version: nativePackage.version, componentCount: nativePackage.components.length },
    optionalNativeComponents: nativePackage.optionalComponents.map(({ name, optionalDependencies }) => ({ name, optionalDependencies }))
  },
  components
};

const registryTypeDefinitions = `export interface ApiTypeDefinition {
  name: string;
  definition: string;
  description: string;
  examples: string[];
  sourcePath: string;
}

export interface ApiProperty {
  name: string;
  type: string;
  optional: boolean;
  required: boolean;
  defaultValue: string | null;
  description: string;
  documentedDefault: string | null;
  allowedValues: (string | number | boolean)[];
  relatedTypes: ApiTypeDefinition[];
}

export interface PlatformApi {
  platform: 'web' | 'native';
  packageName: string;
  importPath: string;
  sourcePath: string;
  description: string;
  examples: string[];
  propsType: string | null;
  extends: string[];
  props: ApiProperty[];
  version: string;
  dependencies?: string[];
}

export interface ComponentRecord {
  name: string;
  slug: string;
  category: string;
  description: string;
  status: string;
  preview: boolean;
  examples: {
    web?: string;
    native?: string;
    customization?: { web?: string; native?: string };
  };
  platforms: {
    web?: PlatformApi;
    native?: PlatformApi;
    nativeOptional?: PlatformApi;
  };
}

export interface ComponentRegistry {
  generatedAt: string;
  categories: string[];
  packages: {
    web: { name: string; version: string; componentCount: number };
    native: { name: string; version: string; componentCount: number };
    optionalNativeComponents: { name: string; optionalDependencies: string[] }[];
  };
  components: ComponentRecord[];
}
`;

const publicApiTypeDefinitions = `export interface PublicApiParameter {
  name: string;
  type: string;
  description: string;
  documented: boolean;
}

export interface PublicApiMember {
  name: string;
  type: string;
  optional: boolean;
  description: string;
  callbackParameters: PublicApiParameter[];
}

export interface PublicApiRecord {
  packageName: string;
  platform: string;
  name: string;
  kind: string;
  signature: string;
  sourcePath: string;
  description: string;
  examples: string[];
  members: PublicApiMember[];
  parameters: PublicApiParameter[];
}

export interface PublicApiPackage {
  packageName: string;
  publicApi: PublicApiRecord[];
}

export interface PublicApiDocumentation {
  coverage: { total: number; documented: number; failures: string[] };
  packages: PublicApiPackage[];
}
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'component-registry.json'), `${JSON.stringify(registry, null, 2)}\n`);
await writeFile(
  path.join(outputDirectory, 'component-registry.ts'),
  `${registryTypeDefinitions}\nexport const componentRegistry: ComponentRegistry = ${JSON.stringify(registry, null, 2)};\n`
);
await writeFile(path.join(repositoryRoot, 'apps/docs/docs-coverage.md'), renderCoverageReport(components));
await writeFile(
  path.join(outputDirectory, 'public-api-docs-coverage.json'),
  `${JSON.stringify(publicApiDocumentation, null, 2)}\n`
);
await writeFile(
  path.join(outputDirectory, 'public-api-docs.ts'),
  `${publicApiTypeDefinitions}\nexport const publicApiDocumentation: PublicApiDocumentation = ${JSON.stringify(publicApiDocumentation, null, 2)};\n`
);
await writeFile(
  path.join(repositoryRoot, 'apps/docs/api-docs-coverage.md'),
  renderApiDocumentationCoverage(apiPackages, apiDocumentationCoverage)
);
console.log(`Generated ${components.length} component records (${webPackage.components.length} Web, ${nativePackage.components.length} React Native, ${nativePackage.optionalComponents.length} optional React Native).`);
