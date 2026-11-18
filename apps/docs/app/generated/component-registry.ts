export interface ApiTypeDefinition {
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

export const componentRegistry: ComponentRegistry = {
  "generatedAt": "2026-11-18T16:46:34.160Z",
  "categories": [
    "Actions",
    "Forms",
    "Selection",
    "Feedback",
    "Layout",
    "Navigation",
    "Overlays",
    "Data display",
    "Advanced"
  ],
  "packages": {
    "web": {
      "name": "@qzlcorp/react",
      "version": "0.2.0-beta.0",
      "componentCount": 50
    },
    "native": {
      "name": "@qzlcorp/react-native",
      "version": "0.2.0-beta.0",
      "componentCount": 48
    },
    "optionalNativeComponents": [
      {
        "name": "QrScanner",
        "optionalDependencies": [
          "expo-camera"
        ]
      }
    ]
  },
  "components": [
    {
      "name": "Button",
      "slug": "button",
      "category": "Actions",
      "description": "Renders a styled HTML button with variant, size, and width options. Its `type`\ndefaults to `button`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Button } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Button>\n      Example content\n    </Button>\n  );\n}",
        "customization": {
          "web": "import { Button } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Button variant=\"secondary\">\n      Example content\n    </Button>\n  );\n}",
          "native": "import { Button } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Button title=\"Example title\" variant=\"danger\" />\n  );\n}"
        },
        "native": "import { Button } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Button title=\"Example title\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/button.tsx",
          "description": "Renders a styled HTML button with variant, size, and width options. Its `type`\ndefaults to `button`.",
          "examples": [
            "```tsx\n<Button variant=\"primary\" onClick={save}>Save</Button>\n```"
          ],
          "propsType": "ButtonProps",
          "extends": [
            "React.ButtonHTMLAttributes<HTMLButtonElement>"
          ],
          "props": [
            {
              "name": "variant",
              "type": "ButtonVariant | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'primary'",
              "description": "Visual treatment of the button.",
              "documentedDefault": "'primary'",
              "allowedValues": [
                "primary",
                "secondary",
                "ghost",
                "danger"
              ],
              "relatedTypes": [
                {
                  "name": "ButtonVariant",
                  "definition": "export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';",
                  "description": "Visual treatment applied to a {@link Button}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/button.tsx"
                }
              ]
            },
            {
              "name": "size",
              "type": "ButtonSize | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "Preset size of the button.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": [
                {
                  "name": "ButtonSize",
                  "definition": "export type ButtonSize = 'sm' | 'md' | 'lg';",
                  "description": "Supported button size presets.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/button.tsx"
                }
              ]
            },
            {
              "name": "fullWidth",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Stretch the button to fill the width of its container.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "loading",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Disable the button and show a busy indicator while an operation is pending.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/button.tsx",
          "description": "Renders a React Native pressable button with disabled and busy accessibility states.",
          "examples": [
            "<Button title=\"Save changes\" onPress={saveChanges} />"
          ],
          "propsType": "ButtonProps",
          "extends": [
            "Omit<PressableProps, 'children' | 'style'>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Button text; replaced by an activity indicator while loading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"danger\" | \"primary\" | \"secondary\" | \"ghost\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'primary'",
              "description": "Visual treatment of the button.",
              "documentedDefault": "'primary'",
              "allowedValues": [
                "danger",
                "primary",
                "secondary",
                "ghost"
              ],
              "relatedTypes": []
            },
            {
              "name": "size",
              "type": "\"sm\" | \"md\" | \"lg\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "Preset control height and text size.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": []
            },
            {
              "name": "loading",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Shows an activity indicator and disables pressing.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for button colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the pressable.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "textStyle",
              "type": "StyleProp<TextStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Additional style applied to the title.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "IconButton",
      "slug": "icon-button",
      "category": "Actions",
      "description": "Renders a button whose accessible name is supplied separately from its content.\nIts HTML `type` defaults to `button`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { IconButton } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <IconButton label=\"Example label\">\n      <span aria-hidden=\"true\">⌕</span>\n    </IconButton>\n  );\n}",
        "customization": {
          "web": "import { IconButton } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <IconButton label=\"Example label\" variant=\"primary\">\n      <span aria-hidden=\"true\">⌕</span>\n    </IconButton>\n  );\n}",
          "native": "import { IconButton } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <IconButton label=\"Example label\" variant=\"danger\">\n      <Text>⌕</Text>\n    </IconButton>\n  );\n}"
        },
        "native": "import { IconButton } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <IconButton label=\"Example label\">\n      <Text>⌕</Text>\n    </IconButton>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/icon-button.tsx",
          "description": "Renders a button whose accessible name is supplied separately from its content.\nIts HTML `type` defaults to `button`.",
          "examples": [
            "```tsx\n<IconButton label=\"Close\" onClick={close}>×</IconButton>\n```"
          ],
          "propsType": "IconButtonProps",
          "extends": [
            "React.ButtonHTMLAttributes<HTMLButtonElement>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name applied as the button's `aria-label`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"primary\" | \"danger\" | \"neutral\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Visual treatment of the button.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "primary",
                "danger",
                "neutral"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/icon-button.tsx",
          "description": "Renders a compact React Native button whose accessible name comes from `label`.",
          "examples": [
            "<IconButton label=\"Add item\" onPress={addItem}>＋</IconButton>"
          ],
          "propsType": "IconButtonProps",
          "extends": [
            "Omit<PressableProps, 'children' | 'style'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name announced for the button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Icon or other node shown inside the button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"danger\" | \"primary\" | \"neutral\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Foreground color treatment.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "danger",
                "primary",
                "neutral"
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for button border and icon color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the pressable.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "FileUploadInput",
      "slug": "file-upload-input",
      "category": "Forms",
      "description": "Renders an HTML file input with a button that opens the browser's file picker.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { FileUploadInput } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <FileUploadInput label=\"Example label\" onFilesSelected={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { FileUploadInput } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <FileUploadInput label=\"Example label\" onFilesSelected={() => {}} multiple={true} />\n  );\n}",
          "native": "import { FileUploadInput } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <FileUploadInput label=\"Example label\" onPress={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { FileUploadInput } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <FileUploadInput label=\"Example label\" onPress={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders an HTML file input with a button that opens the browser's file picker.",
          "examples": [
            "```tsx\n<FileUploadInput label=\"Choose images\" accept=\"image/*\" multiple onFilesSelected={uploadFiles} />\n```"
          ],
          "propsType": "FileUploadInputProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name for the file input and visible chooser button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onFilesSelected",
              "type": "(files: FileList) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called after the HTML input reports a non-null `FileList`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "accept",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "HTML file input accept filter, such as `image/*` or `.pdf`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "multiple",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Allow selecting more than one file.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "disabled",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Disable both the HTML input and its chooser button.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "helperText",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional helper text rendered below the input and button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the root element.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Renders a React Native button and selected-file labels; it does not open a file picker itself.",
          "examples": [
            "<FileUploadInput label=\"Choose documents\" onPress={openDocumentPicker} selectedFiles={fileNames} />"
          ],
          "propsType": "FileUploadInputProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible button text and accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onPress",
              "type": "() => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Invoked on press; the application must perform any platform-specific file selection.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "selectedFiles",
              "type": "string[] | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "[]",
              "description": "Selected file names displayed below the button.",
              "documentedDefault": "[]",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "helperText",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text shown below the button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "disabled",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Disables the pressable.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for button and file-name text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "FormField",
      "slug": "form-field",
      "category": "Forms",
      "description": "Renders a labeled form field and gives its control linked accessibility attributes.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { FormField, Input } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <FormField label=\"Example label\" control={<Input type=\"email\" />} />\n  );\n}",
        "customization": {
          "web": "import { FormField, Input } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <FormField label=\"Example label\" control={<Input type=\"email\" />} required={true} />\n  );\n}"
        }
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/form-field.tsx",
          "description": "Renders a labeled form field and gives its control linked accessibility attributes.",
          "examples": [
            "```tsx\n<FormField\n  label=\"Email\"\n  required\n  hint=\"Use your work address\"\n  error={emailError}\n  control={<Input type=\"email\" />}\n/>\n```"
          ],
          "propsType": "FormFieldProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label associated with the control.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "control",
              "type": "React.ReactElement<FormFieldControlProps, string | React.JSXElementConstructor<any>>",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Control to associate with this field. The field supplies its ID and accessibility attributes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "FormFieldControlProps",
                  "definition": "export interface FormFieldControlProps {\n  /** Stable ID associated with the field label. */\n  id?: string;\n  /** Whether the control is required. */\n  required?: boolean;\n  /** IDs of the field hint and/or validation message. */\n  'aria-describedby'?: string;\n  /** Indicates an invalid value when an error message is present. */\n  'aria-invalid'?: React.AriaAttributes['aria-invalid'];\n}",
                  "description": "Accessibility attributes supplied by {@link FormField} to its control.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/form-field.tsx"
                }
              ]
            },
            {
              "name": "hint",
              "type": "React.ReactNode",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text associated with the control.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "error",
              "type": "React.ReactNode",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional validation message associated with and announced by the control.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "required",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Mark the control as required.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "controlId",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional explicit control ID; otherwise a stable ID is generated.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Additional class name for the field wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "HelperText",
      "slug": "helper-text",
      "category": "Forms",
      "description": "Renders supporting text, optionally marked and announced as an error.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { HelperText } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <HelperText>\n      Example content\n    </HelperText>\n  );\n}",
        "customization": {
          "web": "import { HelperText } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <HelperText error={true}>\n      Example content\n    </HelperText>\n  );\n}",
          "native": "import { HelperText } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <HelperText theme=\"dark\">\n      <Text>Example content</Text>\n    </HelperText>\n  );\n}"
        },
        "native": "import { HelperText } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <HelperText>\n      <Text>Example content</Text>\n    </HelperText>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders supporting text, optionally marked and announced as an error.",
          "examples": [
            "```tsx\n<HelperText error={invalid}>Enter a valid email address.</HelperText>\n```"
          ],
          "propsType": "HelperTextProps",
          "extends": [
            "React.HTMLAttributes<HTMLParagraphElement>"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Style and expose this text as an error message.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Displays supporting text; error messages use a polite accessibility live region.",
          "examples": [
            "<HelperText error>Enter a valid email address.</HelperText>"
          ],
          "propsType": "HelperTextProps",
          "extends": [],
          "props": [
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text or nested content shown to the user.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Uses danger coloring and a polite alert announcement.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for normal helper text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<TextStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the React Native `Text` element.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Input",
      "slug": "input",
      "category": "Forms",
      "description": "Renders an HTML input with the library's input styling.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Input } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Input aria-label=\"Project name\" placeholder=\"Name your project\" />\n  );\n}",
        "customization": {
          "web": "import { Input } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Input error={true} aria-label=\"Project name\" placeholder=\"Name your project\" />\n  );\n}",
          "native": "import { Input } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Input theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Input } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Input />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/input.tsx",
          "description": "Renders an HTML input with the library's input styling.",
          "examples": [
            "```tsx\n<Input aria-label=\"Email\" type=\"email\" error={hasError} />\n```"
          ],
          "propsType": "InputProps",
          "extends": [
            "React.InputHTMLAttributes<HTMLInputElement>"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Apply the component's error styling; this does not set browser form-validation state.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/input.tsx",
          "description": "Renders React Native's text input with themed colors and an error accessibility hint.",
          "examples": [
            "<Input accessibilityLabel=\"Email address\" keyboardType=\"email-address\" placeholder=\"you@example.com\" />"
          ],
          "propsType": "InputProps",
          "extends": [
            "TextInputProps"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Applies danger styling and overrides the React Native accessibility hint.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for text, surface, placeholder, and border colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "inputStyle",
              "type": "StyleProp<TextStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Additional style applied after the input's base and inherited `style`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Select",
      "slug": "select",
      "category": "Forms",
      "description": "Renders an HTML select with the library's input styling.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Select } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Select aria-label=\"Choose a plan\" value=\"team\">\n      <option value=\"team\">Team</option>\n    </Select>\n  );\n}",
        "customization": {
          "web": "import { Select } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Select error={true} aria-label=\"Choose a plan\" value=\"team\">\n      <option value=\"team\">Team</option>\n    </Select>\n  );\n}",
          "native": "import { Select } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Select label=\"Example label\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Select } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Select label=\"Example label\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/select.tsx",
          "description": "Renders an HTML select with the library's input styling.",
          "examples": [
            "```tsx\n<Select aria-label=\"Plan\" value={plan} onChange={(event) => setPlan(event.target.value)}>\n  <option value=\"basic\">Basic</option>\n</Select>\n```"
          ],
          "propsType": "SelectProps",
          "extends": [
            "React.SelectHTMLAttributes<HTMLSelectElement>"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Apply the component's error styling; this does not set browser form-validation state.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/select.tsx",
          "description": "Toggles a React Native list of radio-style choices; it is not a platform picker control.",
          "examples": [
            "<Select label=\"Country\" options={countries} value={country} onValueChange={setCountry} />"
          ],
          "propsType": "SelectProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label and accessibility label for the trigger.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "options",
              "type": "SelectOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Choices shown when the trigger is expanded.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "SelectOption",
                  "definition": "export interface SelectOption {\n  /** Value reported to the controlled change callback. */\n  value: string;\n  /** Text shown for the option. */\n  label: string;\n  /** Prevents selecting this option. */\n  disabled?: boolean;\n}",
                  "description": "One option in the locally expanded select list.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/select.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Currently selected option value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the chosen option's value before the option list closes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "placeholder",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Choose an option'",
              "description": "Trigger text used when `value` does not match an option.",
              "documentedDefault": "'Choose an option'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the trigger and option list.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Slider",
      "slug": "slider",
      "category": "Forms",
      "description": "Renders a controlled range input with its label and current numeric value.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Slider } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Slider label=\"Example label\" value={4} onValueChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { Slider } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Slider label=\"Example label\" value={4} onValueChange={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { Slider } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Slider label=\"Example label\" value={4} onValueChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Slider } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Slider label=\"Example label\" value={4} onValueChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/slider.tsx",
          "description": "Renders a controlled range input with its label and current numeric value.",
          "examples": [
            "```tsx\n<Slider label=\"Volume\" min={0} max={10} value={volume} onValueChange={setVolume} />\n```"
          ],
          "propsType": "SliderProps",
          "extends": [
            "Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label and fallback accessible name for the range input.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current numeric range value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called on each HTML range input change.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueCommit",
              "type": "((value: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called when a pointer or keyboard interaction is released.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/slider.tsx",
          "description": "Wraps `@react-native-community/slider`, forwarding value changes and completion callbacks.",
          "examples": [
            "<Slider label=\"Volume\" value={volume} onValueChange={setVolume} onValueCommit={saveVolume} />"
          ],
          "propsType": "SliderProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the slider.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current slider position.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called while the slider position changes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueCommit",
              "type": "((value: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called when the slider interaction is completed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "min",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "0",
              "description": "Minimum value; must be less than `max`.",
              "documentedDefault": "0",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "max",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "100",
              "description": "Maximum value; must be greater than `min`.",
              "documentedDefault": "100",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "step",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "1",
              "description": "Slider increment.",
              "documentedDefault": "1",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the track and thumb.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the community slider.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Stepper",
      "slug": "stepper",
      "category": "Forms",
      "description": "Renders a step progress list with Back and Continue controls.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Stepper } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Stepper steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} onStepChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { Stepper } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Stepper steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} onStepChange={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { Stepper } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Stepper onStepChange={() => {}} steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Stepper } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Stepper onStepChange={() => {}} steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a step progress list with Back and Continue controls.",
          "examples": [
            "```tsx\n<Stepper steps={steps} activeStep={step} onStepChange={setStep} />\n```"
          ],
          "propsType": "StepperProps",
          "extends": [],
          "props": [
            {
              "name": "steps",
              "type": "ProgressStep[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered steps; must not be empty.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "ProgressStep",
                  "definition": "export interface ProgressStep {\n  /** Text identifying the step. */\n  label: string;\n}",
                  "description": "A named step used by {@link SteppedProgressBar} and {@link Stepper}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "activeStep",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based current step index.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onStepChange",
              "type": "(index: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the adjacent requested step when Back or Continue is activated.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Setup steps'",
              "description": "Accessible name of the stepper navigation.",
              "documentedDefault": "'Setup steps'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the navigation.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Combines a stepped progress display with React Native Back and Continue buttons.\nIts default label is `Setup steps`, with ` progress` appended for the progress list.",
          "examples": [
            "<Stepper steps={steps} activeStep={step} onStepChange={setStep} />"
          ],
          "propsType": "StepperProps",
          "extends": [
            "SteppedProgressBarProps"
          ],
          "props": [
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Setup steps'",
              "description": "Accessible label; the progress list appends ` progress`.",
              "documentedDefault": "'Setup steps'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onStepChange",
              "type": "(index: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the adjacent zero-based step index after Back or Continue is pressed.\nThe component disables those actions at the first and last steps.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "steps",
              "type": "ProgressStep[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Steps shown in order; must contain at least one step.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "ProgressStep",
                  "definition": "export interface ProgressStep {\n  /** Text identifying this step. */\n  label: string;\n}",
                  "description": "Label for a step in a stepped progress display.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "activeStep",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based current step index; must be within `steps`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used to distinguish completed/current and future steps.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the component's outer container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Textarea",
      "slug": "textarea",
      "category": "Forms",
      "description": "Renders an HTML textarea with the library's input styling.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Textarea } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Textarea aria-label=\"Notes\" placeholder=\"Write a note\" />\n  );\n}",
        "customization": {
          "web": "import { Textarea } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Textarea error={true} aria-label=\"Notes\" placeholder=\"Write a note\" />\n  );\n}",
          "native": "import { Textarea } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Textarea theme=\"light\" />\n  );\n}"
        },
        "native": "import { Textarea } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Textarea />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/textarea.tsx",
          "description": "Renders an HTML textarea with the library's input styling.",
          "examples": [
            "```tsx\n<Textarea aria-label=\"Notes\" rows={4} />\n```"
          ],
          "propsType": "TextareaProps",
          "extends": [
            "React.TextareaHTMLAttributes<HTMLTextAreaElement>"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Apply the component's error styling; this does not set browser form-validation state.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/textarea.tsx",
          "description": "Renders the themed {@link Input} in multiline, top-aligned mode with four displayed lines.",
          "examples": [
            "<Textarea accessibilityLabel=\"Message\" value={message} onChangeText={setMessage} placeholder=\"Write a message\" />"
          ],
          "propsType": "TextareaProps",
          "extends": [
            "InputProps"
          ],
          "props": [
            {
              "name": "inputStyle",
              "type": "StyleProp<TextStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Additional style applied to the multiline text input after its top-aligned minimum-height style.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Applies danger styling and overrides the React Native accessibility hint.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Palette used for text, surface, placeholder, and border colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Checkbox",
      "slug": "checkbox",
      "category": "Selection",
      "description": "Renders an HTML checkbox input with optional error styling. Its input type defaults\nto `checkbox`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Checkbox } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Checkbox checked={false} onChange={() => {}} aria-label=\"Remember this choice\" />\n  );\n}",
        "customization": {
          "web": "import { Checkbox } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Checkbox error={true} checked={false} onChange={() => {}} aria-label=\"Remember this choice\" />\n  );\n}",
          "native": "import { Checkbox } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Checkbox checked={false} onCheckedChange={() => {}} label=\"Example label\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Checkbox } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Checkbox checked={false} onCheckedChange={() => {}} label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/checkbox.tsx",
          "description": "Renders an HTML checkbox input with optional error styling. Its input type defaults\nto `checkbox`.",
          "examples": [
            "```tsx\n<Checkbox checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />\n```"
          ],
          "propsType": "CheckboxProps",
          "extends": [
            "React.InputHTMLAttributes<HTMLInputElement>"
          ],
          "props": [
            {
              "name": "error",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Apply error styling without setting browser form-validation state.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/checkbox.tsx",
          "description": "Renders a labeled, controlled checkbox using React Native press and accessibility semantics.",
          "examples": [
            "<Checkbox label=\"Remember me\" checked={remember} onCheckedChange={setRemember} />"
          ],
          "propsType": "CheckboxProps",
          "extends": [
            "Omit<PressableProps, 'children' | 'style'>"
          ],
          "props": [
            {
              "name": "checked",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the checkbox is currently selected.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onCheckedChange",
              "type": "(checked: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the user presses the row with the next checked state.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label and accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the check mark and control.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the pressable row.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "RadioGroup",
      "slug": "radio-group",
      "category": "Selection",
      "description": "Renders a fieldset of radio choices controlled by `value`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { RadioGroup } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <RadioGroup label=\"Example label\" name=\"plan\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { RadioGroup } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <RadioGroup label=\"Example label\" name=\"plan\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { RadioGroup } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <RadioGroup label=\"Example label\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { RadioGroup } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <RadioGroup label=\"Example label\" options={[{ value: 'team', label: 'Team' }, { value: 'individual', label: 'Individual' }]} value=\"team\" onValueChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/radio-group.tsx",
          "description": "Renders a fieldset of radio choices controlled by `value`.",
          "examples": [
            "```tsx\n<RadioGroup label=\"Shipping\" name=\"shipping\" options={options} value={method} onValueChange={setMethod} />\n```"
          ],
          "propsType": "RadioGroupProps",
          "extends": [
            "Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text or content rendered in the fieldset legend.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "name",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Shared HTML radio `name` for this group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "options",
              "type": "RadioOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Choices rendered in the group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "RadioOption",
                  "definition": "export interface RadioOption {\n  /** Value emitted when this option is selected. */\n  value: string;\n  /** Visible label for the option. */\n  label: React.ReactNode;\n  /** Optional secondary text rendered below the label. */\n  description?: React.ReactNode;\n  /** Prevents this option from being selected. */\n  disabled?: boolean;\n}",
                  "description": "One radio choice shown by {@link RadioGroup}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/radio-group.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Value of the currently selected choice.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the selected option's value when a radio changes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/radio-group.tsx",
          "description": "Renders React Native radio controls with checked and disabled accessibility states.",
          "examples": [
            "<RadioGroup label=\"Plan\" options={[{ value: 'basic', label: 'Basic' }]} value={plan} onValueChange={setPlan} />"
          ],
          "propsType": "RadioGroupProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "options",
              "type": "RadioOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Choices rendered in input order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "RadioOption",
                  "definition": "export interface RadioOption {\n  /** Value emitted when this choice is pressed. */\n  value: string;\n  /** Visible title and fallback accessibility label. */\n  label: string;\n  /** Optional supporting text, also included in the accessibility label. */\n  description?: string;\n  /** Prevents selecting this choice. */\n  disabled?: boolean;\n}",
                  "description": "One labeled choice in a radio group.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/radio-group.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Currently selected option value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the pressed option's value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected controls.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the group container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "SegmentedButtons",
      "slug": "segmented-buttons",
      "category": "Selection",
      "description": "Renders a controlled set of mutually labeled buttons with pressed state.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { SegmentedButtons } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SegmentedButtons options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" />\n  );\n}",
        "customization": {
          "web": "import { SegmentedButtons } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SegmentedButtons options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" className=\"custom-example\" />\n  );\n}",
          "native": "import { SegmentedButtons } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SegmentedButtons options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { SegmentedButtons } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SegmentedButtons options={[{ value: 'comfortable', label: 'Comfortable' }, { value: 'compact', label: 'Compact' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a controlled set of mutually labeled buttons with pressed state.",
          "examples": [
            "```tsx\n<SegmentedButtons label=\"View\" options={views} value={view} onValueChange={setView} />\n```"
          ],
          "propsType": "SegmentedButtonsProps",
          "extends": [],
          "props": [
            {
              "name": "options",
              "type": "SegmentedButtonOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Options displayed in the group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "SegmentedButtonOption",
                  "definition": "export interface SegmentedButtonOption {\n  /** Stable value returned when this option is selected. */\n  value: string;\n  /** Visible option text. */\n  label: string;\n  /** Prevents selecting this option. */\n  disabled?: boolean;\n}",
                  "description": "One option rendered by {@link SegmentedButtons}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Value of the currently pressed option.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the selected option's value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name of the button group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Renders a compact React Native radio group styled as adjoining segmented buttons.",
          "examples": [
            "<SegmentedButtons label=\"View\" options={[{ value: 'list', label: 'List' }]} value={view} onValueChange={setView} />"
          ],
          "propsType": "SegmentedButtonsProps",
          "extends": [],
          "props": [
            {
              "name": "options",
              "type": "SegmentedButtonOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Options rendered from left to right.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "SegmentedButtonOption",
                  "definition": "export interface SegmentedButtonOption {\n  /** Value emitted when this option is pressed. */\n  value: string;\n  /** Visible option text and accessibility label. */\n  label: string;\n  /** Prevents selecting this option. */\n  disabled?: boolean;\n}",
                  "description": "One option in a segmented button group.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Currently selected option value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the selected option's value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the radio group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected options.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the radio-group container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "SelectCard",
      "slug": "select-card",
      "category": "Selection",
      "description": "Renders selectable card buttons with radio-group semantics and controlled selection.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { SelectCard } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SelectCard options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" />\n  );\n}",
        "customization": {
          "web": "import { SelectCard } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SelectCard options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" className=\"custom-example\" />\n  );\n}",
          "native": "import { SelectCard } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SelectCard options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { SelectCard } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SelectCard options={[{ value: 'team', title: 'Team', description: 'For collaboration' }]} value=\"team\" onValueChange={() => {}} label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders selectable card buttons with radio-group semantics and controlled selection.",
          "examples": [
            "```tsx\n<SelectCard label=\"Plan\" options={plans} value={plan} onValueChange={setPlan} />\n```"
          ],
          "propsType": "SelectCardProps",
          "extends": [],
          "props": [
            {
              "name": "options",
              "type": "SelectCardOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Cards displayed in the radio group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "SelectCardOption",
                  "definition": "export interface SelectCardOption {\n  /** Stable option value. */\n  value: string;\n  /** Main visible heading for the option. */\n  title: string;\n  /** Optional supporting text, also included in the option's accessible name. */\n  description?: string;\n  /** Prevents selecting this option. */\n  disabled?: boolean;\n}",
                  "description": "One selectable card option rendered by {@link SelectCard}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Value of the currently checked card.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the selected card's value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name of the radio group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Presents each choice as a React Native radio button with a bordered card layout.",
          "examples": [
            "<SelectCard label=\"Delivery\" options={[{ value: 'standard', title: 'Standard' }]} value={method} onValueChange={setMethod} />"
          ],
          "propsType": "SelectCardProps",
          "extends": [],
          "props": [
            {
              "name": "options",
              "type": "SelectCardOption[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Options rendered in input order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "SelectCardOption",
                  "definition": "export interface SelectCardOption {\n  /** Value emitted when this card is pressed. */\n  value: string;\n  /** Main visible heading for the option. */\n  title: string;\n  /** Optional supporting text, also included in the accessibility label. */\n  description?: string;\n  /** Prevents selecting this option. */\n  disabled?: boolean;\n}",
                  "description": "One selectable card option.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Currently selected option value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the pressed option's value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the radio group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected cards.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the group container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "StarRating",
      "slug": "star-rating",
      "category": "Selection",
      "description": "Renders a static or selectable integer star rating.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { StarRating } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <StarRating value={4} />\n  );\n}",
        "customization": {
          "web": "import { StarRating } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <StarRating value={4} className=\"custom-example\" />\n  );\n}",
          "native": "import { StarRating } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <StarRating value={4} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { StarRating } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <StarRating value={4} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a static or selectable integer star rating.",
          "examples": [
            "```tsx\n<StarRating value={rating} onValueChange={setRating} />\n```"
          ],
          "propsType": "StarRatingProps",
          "extends": [],
          "props": [
            {
              "name": "value",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current integer score from zero through `max`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "((value: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "When provided, renders interactive star buttons and reports the chosen score.\nWhen omitted, renders the score as static stars.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "max",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "5",
              "description": "Number of stars in the scale; must be a positive integer.",
              "documentedDefault": "5",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Rating'",
              "description": "Accessible rating label.",
              "documentedDefault": "'Rating'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the rating group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Displays an integer star rating; when interactive, each star is a React Native radio button.",
          "examples": [
            "<StarRating value={rating} onValueChange={setRating} />"
          ],
          "propsType": "StarRatingProps",
          "extends": [],
          "props": [
            {
              "name": "value",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current integer rating from zero through `max`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "((value: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Enables rating controls and reports the selected one-based score.\nWhen omitted, stars are display-only.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "max",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "5",
              "description": "Number of stars; must be a positive integer.",
              "documentedDefault": "5",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Rating'",
              "description": "Accessible label prefix.",
              "documentedDefault": "'Rating'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for filled and empty stars.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the rating row.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Switch",
      "slug": "switch",
      "category": "Selection",
      "description": "Renders a controlled switch using a button with switch semantics.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Switch } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Switch checked={false} onCheckedChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { Switch } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Switch checked={false} onCheckedChange={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { Switch } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Switch checked={false} onCheckedChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Switch } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Switch checked={false} onCheckedChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/switch.tsx",
          "description": "Renders a controlled switch using a button with switch semantics.",
          "examples": [
            "```tsx\n<Switch checked={enabled} onCheckedChange={setEnabled} />\n```"
          ],
          "propsType": "SwitchProps",
          "extends": [
            "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>"
          ],
          "props": [
            {
              "name": "checked",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the switch is currently on.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onCheckedChange",
              "type": "(checked: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called after activation with the inverse of the current `checked` value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/switch.tsx",
          "description": "Wraps React Native's switch with a controlled checked value and themed colors.",
          "examples": [
            "<Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />"
          ],
          "propsType": "SwitchProps",
          "extends": [
            "Omit<NativeSwitchProps, 'value' | 'onValueChange' | 'trackColor' | 'thumbColor'>"
          ],
          "props": [
            {
              "name": "checked",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the switch is on.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onCheckedChange",
              "type": "(checked: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the React Native switch changes state.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the track and thumb.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Alert",
      "slug": "alert",
      "category": "Feedback",
      "description": "Renders a styled alert container; supply its contents and semantics as needed.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Alert } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Alert>\n      Example content\n    </Alert>\n  );\n}",
        "customization": {
          "web": "import { Alert } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Alert variant=\"danger\">\n      Example content\n    </Alert>\n  );\n}",
          "native": "import { Alert } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Alert variant=\"success\">\n      <Text>Example content</Text>\n    </Alert>\n  );\n}"
        },
        "native": "import { Alert } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Alert>\n      <Text>Example content</Text>\n    </Alert>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/alert.tsx",
          "description": "Renders a styled alert container; supply its contents and semantics as needed.",
          "examples": [
            "```tsx\n<Alert variant=\"warning\">Changes have not been saved.</Alert>\n```"
          ],
          "propsType": "AlertProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "variant",
              "type": "\"danger\" | \"success\" | \"warning\" | \"info\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'info'",
              "description": "Color treatment communicating the alert category.",
              "documentedDefault": "'info'",
              "allowedValues": [
                "danger",
                "success",
                "warning",
                "info"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/alert.tsx",
          "description": "Displays a themed status message; danger alerts use the React Native alert role.",
          "examples": [
            "<Alert variant=\"warning\">Check the required fields before continuing.</Alert>"
          ],
          "propsType": "AlertProps",
          "extends": [],
          "props": [
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Message content displayed in the alert.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"info\" | \"success\" | \"warning\" | \"danger\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'info'",
              "description": "Semantic color and React Native accessibility role.",
              "documentedDefault": "'info'",
              "allowedValues": [
                "info",
                "success",
                "warning",
                "danger"
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the message.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Badge",
      "slug": "badge",
      "category": "Feedback",
      "description": "Renders a short status or category label.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Badge } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Badge>\n      Example content\n    </Badge>\n  );\n}",
        "customization": {
          "web": "import { Badge } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Badge variant=\"danger\">\n      Example content\n    </Badge>\n  );\n}",
          "native": "import { Badge } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Badge variant=\"success\">\n      <Text>Example content</Text>\n    </Badge>\n  );\n}"
        },
        "native": "import { Badge } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Badge>\n      <Text>Example content</Text>\n    </Badge>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/badge.tsx",
          "description": "Renders a short status or category label.",
          "examples": [
            "```tsx\n<Badge variant=\"success\">Published</Badge>\n```"
          ],
          "propsType": "BadgeProps",
          "extends": [
            "React.HTMLAttributes<HTMLSpanElement>"
          ],
          "props": [
            {
              "name": "variant",
              "type": "\"primary\" | \"danger\" | \"neutral\" | \"success\" | \"warning\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'primary'",
              "description": "Color treatment for the badge.",
              "documentedDefault": "'primary'",
              "allowedValues": [
                "primary",
                "danger",
                "neutral",
                "success",
                "warning"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/badge.tsx",
          "description": "Renders a non-interactive badge using a themed React Native `Text` element.",
          "examples": [
            "<Badge variant=\"success\">Available</Badge>"
          ],
          "propsType": "BadgeProps",
          "extends": [
            "TextProps"
          ],
          "props": [
            {
              "name": "variant",
              "type": "\"success\" | \"warning\" | \"danger\" | \"primary\" | \"neutral\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'primary'",
              "description": "Semantic color and background treatment.",
              "documentedDefault": "'primary'",
              "allowedValues": [
                "success",
                "warning",
                "danger",
                "primary",
                "neutral"
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used to resolve the badge colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Indicator",
      "slug": "indicator",
      "category": "Feedback",
      "description": "Renders a status message with a decorative dot and status role.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Indicator } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Indicator label=\"Example label\" />\n  );\n}",
        "customization": {
          "web": "import { Indicator } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Indicator label=\"Example label\" status=\"danger\" />\n  );\n}",
          "native": "import { Indicator } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Indicator label=\"Example label\" status=\"info\" />\n  );\n}"
        },
        "native": "import { Indicator } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Indicator label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a status message with a decorative dot and status role.",
          "examples": [
            "```tsx\n<Indicator label=\"All systems operational\" status=\"success\" />\n```"
          ],
          "propsType": "IndicatorProps",
          "extends": [
            "React.HTMLAttributes<HTMLSpanElement>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Status text displayed beside the indicator dot.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "status",
              "type": "IndicatorStatus | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Visual status treatment.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "danger",
                "neutral",
                "success",
                "warning",
                "info"
              ],
              "relatedTypes": [
                {
                  "name": "IndicatorStatus",
                  "definition": "export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';",
                  "description": "Status categories supported by {@link Indicator}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Pairs a status-colored marker with text; the marker itself is hidden from accessibility.",
          "examples": [
            "<Indicator label=\"Synced\" status=\"success\" />"
          ],
          "propsType": "IndicatorProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible text and accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "status",
              "type": "IndicatorStatus | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Status color.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "info",
                "success",
                "warning",
                "danger",
                "neutral"
              ],
              "relatedTypes": [
                {
                  "name": "IndicatorStatus",
                  "definition": "export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';",
                  "description": "Semantic color states supported by {@link Indicator} and {@link Tag}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used to resolve the status color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the indicator row.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Progress",
      "slug": "progress",
      "category": "Feedback",
      "description": "Renders progress over the supplied range, clamping displayed values to its bounds.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Progress } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Progress label=\"Example label\" />\n  );\n}",
        "customization": {
          "web": "import { Progress } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Progress label=\"Example label\" className=\"custom-example\" />\n  );\n}",
          "native": "import { Progress } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Progress label=\"Example label\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Progress } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Progress label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/progress.tsx",
          "description": "Renders progress over the supplied range, clamping displayed values to its bounds.",
          "examples": [
            "```tsx\n<Progress label=\"Upload\" value={uploaded} max={total} />\n```"
          ],
          "propsType": "ProgressProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "value",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Current progress value; omit to render an indeterminate indicator.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "min",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "0",
              "description": "Lower bound used to calculate the percentage.",
              "documentedDefault": "0",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "max",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "100",
              "description": "Upper bound used to calculate the percentage; must be greater than `min`.",
              "documentedDefault": "100",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name for the progress indicator.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/progress.tsx",
          "description": "Displays clamped progress in a React Native view and exposes its range through accessibility values.",
          "examples": [
            "<Progress label=\"Upload\" value={uploaded} max={total} />"
          ],
          "propsType": "ProgressProps",
          "extends": [],
          "props": [
            {
              "name": "value",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Current progress value; omitted values render an empty bar without an accessibility `now`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "min",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "0",
              "description": "Lower bound for clamping and the accessibility value.",
              "documentedDefault": "0",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "max",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "100",
              "description": "Upper bound for clamping; must be greater than `min`.",
              "documentedDefault": "100",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label describing the progress task.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the track and filled portion.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer progress track.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Skeleton",
      "slug": "skeleton",
      "category": "Feedback",
      "description": "Renders a decorative loading placeholder hidden from assistive technology.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Skeleton } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Skeleton />\n  );\n}",
        "customization": {
          "web": "import { Skeleton } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Skeleton circle={true} />\n  );\n}",
          "native": "import { Skeleton } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Skeleton theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Skeleton } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Skeleton />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/skeleton.tsx",
          "description": "Renders a decorative loading placeholder hidden from assistive technology.",
          "examples": [
            "```tsx\n<Skeleton circle style={{ width: 40, height: 40 }} />\n```"
          ],
          "propsType": "SkeletonProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "circle",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Render a circular placeholder instead of the default shape.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/skeleton.tsx",
          "description": "Renders a static loading placeholder hidden from platform accessibility services.",
          "examples": [
            "<Skeleton />\n<Skeleton circle />"
          ],
          "propsType": "SkeletonProps",
          "extends": [],
          "props": [
            {
              "name": "circle",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Renders a 40-by-40 circular placeholder instead of the full-width bar.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the placeholder surface.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the placeholder view.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Spinner",
      "slug": "spinner",
      "category": "Feedback",
      "description": "Renders a loading indicator with a status role and accessible name.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Spinner } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Spinner />\n  );\n}",
        "customization": {
          "web": "import { Spinner } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Spinner size=\"sm\" />\n  );\n}",
          "native": "import { Spinner } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Spinner size=\"sm\" />\n  );\n}"
        },
        "native": "import { Spinner } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Spinner />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/spinner.tsx",
          "description": "Renders a loading indicator with a status role and accessible name.",
          "examples": [
            "```tsx\n<Spinner label=\"Saving changes\" size=\"sm\" />\n```"
          ],
          "propsType": "SpinnerProps",
          "extends": [
            "React.HTMLAttributes<HTMLSpanElement>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Loading'",
              "description": "Accessible status name.",
              "documentedDefault": "'Loading'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "size",
              "type": "\"sm\" | \"md\" | \"lg\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "Preset spinner size.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/spinner.tsx",
          "description": "Displays React Native's activity indicator with a progressbar accessibility role.",
          "examples": [
            "<Spinner label=\"Loading account\" />"
          ],
          "propsType": "SpinnerProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Loading'",
              "description": "Accessible label announced by platform accessibility services.",
              "documentedDefault": "'Loading'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "size",
              "type": "\"sm\" | \"md\" | \"lg\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "`sm` maps to the small indicator; `md` and `lg` map to the large indicator.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the indicator color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the React Native activity indicator.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "SteppedProgressBar",
      "slug": "stepped-progress-bar",
      "category": "Feedback",
      "description": "Renders an ordered list with completed, current, and upcoming step states.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { SteppedProgressBar } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SteppedProgressBar steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} />\n  );\n}",
        "customization": {
          "web": "import { SteppedProgressBar } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SteppedProgressBar steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} className=\"custom-example\" />\n  );\n}",
          "native": "import { SteppedProgressBar } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SteppedProgressBar steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { SteppedProgressBar } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <SteppedProgressBar steps={[{ label: 'Profile' }, { label: 'Review' }]} activeStep={0} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders an ordered list with completed, current, and upcoming step states.",
          "examples": [
            "```tsx\n<SteppedProgressBar steps={steps} activeStep={1} />\n```"
          ],
          "propsType": "SteppedProgressBarProps",
          "extends": [],
          "props": [
            {
              "name": "steps",
              "type": "ProgressStep[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered steps; must not be empty.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "ProgressStep",
                  "definition": "export interface ProgressStep {\n  /** Text identifying the step. */\n  label: string;\n}",
                  "description": "A named step used by {@link SteppedProgressBar} and {@link Stepper}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "activeStep",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based current step index.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Progress'",
              "description": "Accessible name of the ordered progress list.",
              "documentedDefault": "'Progress'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the list.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Shows completed/current segments and step labels without navigation controls.\nIts accessible label defaults to `Progress`.",
          "examples": [
            "<SteppedProgressBar steps={[{ label: 'Details' }, { label: 'Review' }]} activeStep={0} />"
          ],
          "propsType": "SteppedProgressBarProps",
          "extends": [],
          "props": [
            {
              "name": "steps",
              "type": "ProgressStep[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Steps shown in order; must contain at least one step.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "ProgressStep",
                  "definition": "export interface ProgressStep {\n  /** Text identifying this step. */\n  label: string;\n}",
                  "description": "Label for a step in a stepped progress display.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "activeStep",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based current step index; must be within `steps`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Progress'",
              "description": "Accessible label for the progress list.",
              "documentedDefault": "'Progress'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used to distinguish completed/current and future steps.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the component's outer container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Toast",
      "slug": "toast",
      "category": "Feedback",
      "description": "Renders a live notification and an optional dismiss control.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Toast } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Toast title=\"Example title\" />\n  );\n}",
        "customization": {
          "web": "import { Toast } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Toast title=\"Example title\" variant=\"danger\" />\n  );\n}",
          "native": "import { Toast } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Toast title=\"Example title\" variant=\"success\" />\n  );\n}"
        },
        "native": "import { Toast } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Toast title=\"Example title\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/toast.tsx",
          "description": "Renders a live notification and an optional dismiss control.",
          "examples": [
            "```tsx\n<Toast title=\"Saved\" description=\"Your changes are up to date.\" onDismiss={dismiss} />\n```"
          ],
          "propsType": "ToastProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Short notification heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "React.ReactNode",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional explanatory content shown below the heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"danger\" | \"success\" | \"warning\" | \"info\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'info'",
              "description": "Notification category, which also determines its live-region urgency.",
              "documentedDefault": "'info'",
              "allowedValues": [
                "danger",
                "success",
                "warning",
                "info"
              ],
              "relatedTypes": []
            },
            {
              "name": "onDismiss",
              "type": "(() => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "When supplied, renders a dismiss button that invokes this callback.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/toast.tsx",
          "description": "Renders a status message; danger uses an alert role and assertive live region.",
          "examples": [
            "<Toast title=\"Saved\" description=\"Your changes are up to date.\" variant=\"success\" />"
          ],
          "propsType": "ToastProps",
          "extends": [],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Short notification heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting message.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"info\" | \"success\" | \"warning\" | \"danger\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'info'",
              "description": "Semantic color treatment and platform announcement behavior.",
              "documentedDefault": "'info'",
              "allowedValues": [
                "info",
                "success",
                "warning",
                "danger"
              ],
              "relatedTypes": []
            },
            {
              "name": "onDismiss",
              "type": "(() => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional action shown as a dismiss button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for text, border, and surface.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the notification container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Accordion",
      "slug": "accordion",
      "category": "Layout",
      "description": "Renders a disclosure control and its associated region.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Accordion } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Accordion title=\"Example title\">\n      Example content\n    </Accordion>\n  );\n}",
        "customization": {
          "web": "import { Accordion } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Accordion title=\"Example title\" open={false}>\n      Example content\n    </Accordion>\n  );\n}",
          "native": "import { Accordion } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Accordion title=\"Example title\" theme=\"dark\">\n      <Text>Example content</Text>\n    </Accordion>\n  );\n}"
        },
        "native": "import { Accordion } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Accordion title=\"Example title\">\n      <Text>Example content</Text>\n    </Accordion>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/accordion.tsx",
          "description": "Renders a disclosure control and its associated region.",
          "examples": [
            "```tsx\n<Accordion title=\"Details\" defaultOpen={false}>Additional information.</Accordion>\n```"
          ],
          "propsType": "AccordionProps",
          "extends": [
            "Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>"
          ],
          "props": [
            {
              "name": "title",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content displayed in the accordion trigger.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "open",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Controls expanded state when provided.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "defaultOpen",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Initial expanded state when `open` is not provided.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "((open: boolean) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called whenever the trigger requests a new expanded state.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/accordion.tsx",
          "description": "Renders an accessible, pressable disclosure row with optional controlled state.",
          "examples": [
            "<Accordion title=\"Shipping\" defaultOpen>Delivery takes 3–5 days.</Accordion>"
          ],
          "propsType": "AccordionProps",
          "extends": [
            "Omit<PressableProps, 'children' | 'style'>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text shown in the pressable row.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "open",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Controls expansion when provided; otherwise the row maintains its own state.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "defaultOpen",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Initial expansion state used only when `open` is omitted.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "((open: boolean) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called after activation with the next expansion state.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for row text and divider.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content rendered below the title while expanded.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer row container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Avatar",
      "slug": "avatar",
      "category": "Layout",
      "description": "Displays a named image, falling back to up to two initials when no image is available.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Avatar } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Avatar name=\"Alex Morgan\" />\n  );\n}",
        "customization": {
          "web": "import { Avatar } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Avatar name=\"Alex Morgan\" size=\"sm\" />\n  );\n}",
          "native": "import { Avatar } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Avatar name=\"Alex Morgan\" size=\"sm\" />\n  );\n}"
        },
        "native": "import { Avatar } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Avatar name=\"Alex Morgan\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/avatar.tsx",
          "description": "Displays a named image, falling back to up to two initials when no image is available.",
          "examples": [
            "```tsx\n<Avatar name=\"Ada Lovelace\" src=\"/ada.png\" />\n```"
          ],
          "propsType": "AvatarProps",
          "extends": [
            "Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>"
          ],
          "props": [
            {
              "name": "name",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Name announced for the avatar and used to derive fallback initials.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "src",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Image URL; when loading fails, initials are shown instead.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "size",
              "type": "\"sm\" | \"md\" | \"lg\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "Preset avatar dimensions.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/avatar.tsx",
          "description": "Shows a circular avatar image, falling back to the name's initials on failure.",
          "examples": [
            "<Avatar name=\"Ada Lovelace\" uri=\"https://example.com/ada.png\" />"
          ],
          "propsType": "AvatarProps",
          "extends": [
            "Omit<ImageProps, 'source' | 'accessibilityLabel' | 'style'>"
          ],
          "props": [
            {
              "name": "name",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Person or entity name, also used as the image accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "uri",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Remote image URI; initials are shown when omitted or when loading fails.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "size",
              "type": "\"sm\" | \"md\" | \"lg\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'md'",
              "description": "Preset circular diameter: 32, 40, or 56 logical pixels.",
              "documentedDefault": "'md'",
              "allowedValues": [
                "sm",
                "md",
                "lg"
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the fallback background and initials.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the circular outer container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Card",
      "slug": "card",
      "category": "Layout",
      "description": "Renders a content container with optional elevated styling.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Card } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Card>\n      Example content\n    </Card>\n  );\n}",
        "customization": {
          "web": "import { Card } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Card elevated={false}>\n      Example content\n    </Card>\n  );\n}",
          "native": "import { Card } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Card theme=\"dark\">\n      <Text>Example content</Text>\n    </Card>\n  );\n}"
        },
        "native": "import { Card } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Card>\n      <Text>Example content</Text>\n    </Card>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/card.tsx",
          "description": "Renders a content container with optional elevated styling.",
          "examples": [
            "```tsx\n<Card><h2>Account</h2><p>Profile settings</p></Card>\n```"
          ],
          "propsType": "CardProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "elevated",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "true",
              "description": "Add the elevated card treatment.",
              "documentedDefault": "true",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/card.tsx",
          "description": "Provides a padded React Native view with a themed surface and optional elevation.",
          "examples": [
            "<Card><Text>Account details</Text></Card>"
          ],
          "propsType": "CardProps",
          "extends": [
            "ViewProps"
          ],
          "props": [
            {
              "name": "elevated",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "true",
              "description": "Adds platform elevation when true.",
              "documentedDefault": "true",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the border and surface.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Divider",
      "slug": "divider",
      "category": "Layout",
      "description": "Renders a horizontal or vertical visual divider.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Divider } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Divider />\n  );\n}",
        "customization": {
          "web": "import { Divider } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Divider orientation=\"vertical\" />\n  );\n}",
          "native": "import { Divider } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Divider orientation=\"vertical\" />\n  );\n}"
        },
        "native": "import { Divider } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Divider />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a horizontal or vertical visual divider.",
          "examples": [
            "```tsx\n<Divider orientation=\"horizontal\" />\n```"
          ],
          "propsType": "DividerProps",
          "extends": [
            "React.HTMLAttributes<HTMLHRElement>"
          ],
          "props": [
            {
              "name": "orientation",
              "type": "\"horizontal\" | \"vertical\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'horizontal'",
              "description": "Visual orientation and, when non-decorative, separator orientation.",
              "documentedDefault": "'horizontal'",
              "allowedValues": [
                "horizontal",
                "vertical"
              ],
              "relatedTypes": []
            },
            {
              "name": "decorative",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Use presentation semantics instead of exposing a separator.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Renders a themed line and exposes it with the separator accessibility role unless decorative.",
          "examples": [
            "<Divider orientation=\"horizontal\" />"
          ],
          "propsType": "DividerProps",
          "extends": [],
          "props": [
            {
              "name": "orientation",
              "type": "\"horizontal\" | \"vertical\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'horizontal'",
              "description": "Divider axis; horizontal dividers span the available width, vertical dividers are 24 points tall.",
              "documentedDefault": "'horizontal'",
              "allowedValues": [
                "horizontal",
                "vertical"
              ],
              "relatedTypes": []
            },
            {
              "name": "decorative",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Uses the `none` accessibility role instead of exposing a separator.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the separator color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the divider view.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Tag",
      "slug": "tag",
      "category": "Layout",
      "description": "Renders a compact label with an optional accessible remove button.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Tag } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tag>\n      Example content\n    </Tag>\n  );\n}",
        "customization": {
          "web": "import { Tag } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tag variant=\"primary\">\n      Example content\n    </Tag>\n  );\n}",
          "native": "import { Tag } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Tag variant=\"info\">\n      <Text>Example content</Text>\n    </Tag>\n  );\n}"
        },
        "native": "import { Tag } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Tag>\n      <Text>Example content</Text>\n    </Tag>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a compact label with an optional accessible remove button.",
          "examples": [
            "```tsx\n<Tag onRemove={removeTag}>Design</Tag>\n```"
          ],
          "propsType": "TagProps",
          "extends": [
            "React.HTMLAttributes<HTMLSpanElement>"
          ],
          "props": [
            {
              "name": "onRemove",
              "type": "(() => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "When supplied, adds a removal button that invokes this callback.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "removeLabel",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Remove tag'",
              "description": "Accessible name of the removal button.",
              "documentedDefault": "'Remove tag'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "\"primary\" | \"danger\" | \"neutral\" | \"success\" | \"warning\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Visual treatment of the tag.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "primary",
                "danger",
                "neutral",
                "success",
                "warning"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Displays a compact status tag with an optional React Native remove button.",
          "examples": [
            "<Tag variant=\"info\" onRemove={removeFilter}>Unreviewed</Tag>"
          ],
          "propsType": "TagProps",
          "extends": [],
          "props": [
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Tag content.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onRemove",
              "type": "(() => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional action invoked by the remove button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "removeLabel",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Remove tag'",
              "description": "Accessible label for the remove button.",
              "documentedDefault": "'Remove tag'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "variant",
              "type": "IndicatorStatus | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Semantic color and surface treatment.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "info",
                "success",
                "warning",
                "danger",
                "neutral"
              ],
              "relatedTypes": [
                {
                  "name": "IndicatorStatus",
                  "definition": "export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';",
                  "description": "Semantic color states supported by {@link Indicator} and {@link Tag}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for tag colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer tag container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Typography",
      "slug": "typography",
      "category": "Layout",
      "description": "Renders content using a typography style and a semantic element.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Typography } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Typography>\n      Example content\n    </Typography>\n  );\n}",
        "customization": {
          "web": "import { Typography } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Typography variant=\"display\">\n      Example content\n    </Typography>\n  );\n}",
          "native": "import { Typography } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Typography variant=\"display\">\n      <Text>Example content</Text>\n    </Typography>\n  );\n}"
        },
        "native": "import { Typography } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Typography>\n      <Text>Example content</Text>\n    </Typography>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders content using a typography style and a semantic element.",
          "examples": [
            "```tsx\n<Typography variant=\"heading-2\">Account settings</Typography>\n```"
          ],
          "propsType": "TypographyProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "variant",
              "type": "TypographyVariant | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'body'",
              "description": "Visual text style preset; also selects a default heading or paragraph element unless `as` overrides it.",
              "documentedDefault": "'body'",
              "allowedValues": [
                "display",
                "heading-1",
                "heading-2",
                "heading-3",
                "body",
                "body-small",
                "caption"
              ],
              "relatedTypes": [
                {
                  "name": "TypographyVariant",
                  "definition": "export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';",
                  "description": "Preset visual variants supported by {@link Typography}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "as",
              "type": "TypographyElement | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Override the element selected by the variant's default element mapping.",
              "documentedDefault": null,
              "allowedValues": [
                "h1",
                "h2",
                "h3",
                "h4",
                "p",
                "span"
              ],
              "relatedTypes": [
                {
                  "name": "TypographyElement",
                  "definition": "export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';",
                  "description": "Allowed semantic elements rendered by {@link Typography}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Applies a named type scale; heading variants default to the header accessibility role.",
          "examples": [
            "<Typography variant=\"heading-2\">Account</Typography>"
          ],
          "propsType": "TypographyProps",
          "extends": [
            "TextProps"
          ],
          "props": [
            {
              "name": "variant",
              "type": "TypographyVariant | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'body'",
              "description": "Font-size and weight preset.",
              "documentedDefault": "'body'",
              "allowedValues": [
                "display",
                "heading-1",
                "heading-2",
                "heading-3",
                "body",
                "body-small",
                "caption"
              ],
              "relatedTypes": [
                {
                  "name": "TypographyVariant",
                  "definition": "export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';",
                  "description": "Text style presets supported by {@link Typography}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for text color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Breadcrumbs",
      "slug": "breadcrumbs",
      "category": "Navigation",
      "description": "Renders an ordered breadcrumb trail; the final item is current unless overridden.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Breadcrumbs } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current page' }]} />\n  );\n}",
        "customization": {
          "web": "import { Breadcrumbs } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current page' }]} className=\"custom-example\" />\n  );\n}",
          "native": "import { Breadcrumbs } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Breadcrumbs items={[{ label: 'Home' }, { label: 'Current page' }]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Breadcrumbs } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Breadcrumbs items={[{ label: 'Home' }, { label: 'Current page' }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/breadcrumbs.tsx",
          "description": "Renders an ordered breadcrumb trail; the final item is current unless overridden.",
          "examples": [
            "```tsx\n<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />\n```"
          ],
          "propsType": "BreadcrumbsProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "items",
              "type": "BreadcrumbItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Breadcrumb entries in trail order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BreadcrumbItem",
                  "definition": "export interface BreadcrumbItem {\n  /** Visible breadcrumb label. */\n  label: React.ReactNode;\n  /** Destination for a non-current breadcrumb. */\n  href?: string;\n  /** Mark this entry as the current page; if omitted, the final item is current. */\n  current?: boolean;\n}",
                  "description": "One entry in a {@link Breadcrumbs} trail.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/breadcrumbs.tsx"
                }
              ]
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Breadcrumb'",
              "description": "Accessible name of the navigation landmark.",
              "documentedDefault": "'Breadcrumb'",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/breadcrumbs.tsx",
          "description": "Displays a React Native breadcrumb list; non-current items are actionable only when they have an `onPress` callback.",
          "examples": [
            "<Breadcrumbs items={[{ label: 'Home', onPress: goHome }, { label: 'Library' }]} />"
          ],
          "propsType": "BreadcrumbsProps",
          "extends": [],
          "props": [
            {
              "name": "items",
              "type": "BreadcrumbItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Breadcrumbs in display order; the final item is marked as current.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BreadcrumbItem",
                  "definition": "export interface BreadcrumbItem {\n  /** Text shown for this location. */\n  label: string;\n  /** Optional press action; ignored for the final (current) item. */\n  onPress?: () => void;\n}",
                  "description": "One label in a breadcrumb trail.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/breadcrumbs.tsx"
                }
              ]
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Breadcrumb'",
              "description": "Accessible label for the list.",
              "documentedDefault": "'Breadcrumb'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for current, linked, and separator text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the list container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Carousel",
      "slug": "carousel",
      "category": "Navigation",
      "description": "Renders one slide with configurable navigation and position indicators.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Carousel } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Carousel slides={[<span>Overview</span>, <span>Details</span>]} />\n  );\n}",
        "customization": {
          "web": "import { Carousel } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Carousel slides={[<span>Overview</span>, <span>Details</span>]} navigation=\"arrows\" />\n  );\n}",
          "native": "import { Carousel, Typography } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Carousel slides={[<Typography key=\"overview\">Overview</Typography>, <Typography key=\"details\">Details</Typography>]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Carousel, Typography } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Carousel slides={[<Typography key=\"overview\">Overview</Typography>, <Typography key=\"details\">Details</Typography>]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders one slide with configurable navigation and position indicators.",
          "examples": [
            "```tsx\n<Carousel slides={[<p key=\"1\">One</p>, <p key=\"2\">Two</p>]} />\n```",
            "```tsx\n<Carousel\n  slides={slides}\n  navigation=\"arrows\"\n  navigationPlacement=\"overlay\"\n  pagination=\"progress\"\n  loop\n/>\n```",
            "```tsx\n<Carousel\n  slides={[<p key=\"first\">First</p>, <p key=\"second\">Second</p>]}\n  renderNavigation={({ previous, next, canGoPrevious, canGoNext }) => (\n    <div>\n      <button type=\"button\" aria-label=\"Previous slide\" disabled={!canGoPrevious} onClick={previous}>Back</button>\n      <button type=\"button\" aria-label=\"Next slide\" disabled={!canGoNext} onClick={next}>Next</button>\n    </div>\n  )}\n  renderPagination={({ index, slideCount, goTo }) => (\n    <div role=\"group\" aria-label=\"Choose slide\">\n      {Array.from({ length: slideCount }, (_, slide) => (\n        <button key={slide} type=\"button\" aria-label={`Go to slide ${slide + 1}`} aria-current={index === slide ? 'true' : undefined} onClick={() => goTo(slide)}>\n          {slide + 1}\n        </button>\n      ))}\n    </div>\n  )}\n/>\n```"
          ],
          "propsType": "CarouselProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "slides",
              "type": "React.ReactNode[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Slide content in navigation order; must contain at least one entry.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "index",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Controlled current slide index, starting at zero.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "defaultIndex",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "0",
              "description": "Initial slide index when `index` is not provided.",
              "documentedDefault": "0",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Carousel'",
              "description": "Accessible name of the carousel region.",
              "documentedDefault": "'Carousel'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onIndexChange",
              "type": "((index: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called with the requested zero-based slide index.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "navigation",
              "type": "CarouselNavigation | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'text'",
              "description": "Built-in previous/next control presentation. `none` hides the controls.\n`renderNavigation` can replace the built-in controls unless this is `none`.",
              "documentedDefault": "'text'",
              "allowedValues": [
                "text",
                "arrows",
                "none"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselNavigation",
                  "definition": "export type CarouselNavigation = 'text' | 'arrows' | 'none';",
                  "description": "Built-in navigation presentation for {@link Carousel}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "pagination",
              "type": "CarouselPagination | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'dots'",
              "description": "Built-in slide position indicator. `none` hides the indicator.\n`renderPagination` can replace the built-in indicator unless this is `none`.",
              "documentedDefault": "'dots'",
              "allowedValues": [
                "none",
                "dots",
                "progress",
                "fraction"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselPagination",
                  "definition": "export type CarouselPagination = 'dots' | 'progress' | 'fraction' | 'none';",
                  "description": "Built-in position indicator presentation for {@link Carousel}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "navigationPlacement",
              "type": "CarouselNavigationPlacement | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'below'",
              "description": "Position of navigation controls. Built-in overlay controls reserve space at the slide edges;\ncustom overlay controls should account for their own width.",
              "documentedDefault": "'below'",
              "allowedValues": [
                "below",
                "overlay"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselNavigationPlacement",
                  "definition": "export type CarouselNavigationPlacement = 'below' | 'overlay';",
                  "description": "Placement for built-in or custom Carousel navigation controls.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "loop",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Wrap previous/next navigation from the first and last slides.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "renderNavigation",
              "type": "((controls: CarouselControls) => React.ReactNode) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Replaces the built-in previous/next controls when `navigation` is not `none`.\nCustom controls should expose accessible names and use the provided navigation actions.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "CarouselControls",
                  "definition": "export interface CarouselControls {\n  /** Current zero-based slide index. */\n  index: number;\n  /** Number of slides in the carousel. */\n  slideCount: number;\n  /** Whether `previous` can move to another slide. */\n  canGoPrevious: boolean;\n  /** Whether `next` can move to another slide. */\n  canGoNext: boolean;\n  /** Move to the previous slide when available; wraps when `loop` is enabled. */\n  previous: () => void;\n  /** Move to the next slide when available; wraps when `loop` is enabled. */\n  next: () => void;\n  /**\n   * Select a valid zero-based slide index.\n   * @param index The slide index to select.\n   * @throws {RangeError} If the index is outside the slide range.\n   */\n  goTo: (index: number) => void;\n}",
                  "description": "Navigation actions and state passed to Carousel control render callbacks.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "renderPagination",
              "type": "((controls: CarouselControls) => React.ReactNode) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Replaces the built-in position indicator when `pagination` is not `none`.\nCustom indicators should expose the current slide and an accessible way to select slides.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "CarouselControls",
                  "definition": "export interface CarouselControls {\n  /** Current zero-based slide index. */\n  index: number;\n  /** Number of slides in the carousel. */\n  slideCount: number;\n  /** Whether `previous` can move to another slide. */\n  canGoPrevious: boolean;\n  /** Whether `next` can move to another slide. */\n  canGoNext: boolean;\n  /** Move to the previous slide when available; wraps when `loop` is enabled. */\n  previous: () => void;\n  /** Move to the next slide when available; wraps when `loop` is enabled. */\n  next: () => void;\n  /**\n   * Select a valid zero-based slide index.\n   * @param index The slide index to select.\n   * @throws {RangeError} If the index is outside the slide range.\n   */\n  goTo: (index: number) => void;\n}",
                  "description": "Navigation actions and state passed to Carousel control render callbacks.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/catalog-extensions.tsx"
                }
              ]
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Shows one slide with configurable React Native navigation and position indicators.",
          "examples": [
            "<Carousel slides={[<Text key=\"one\">First</Text>, <Text key=\"two\">Second</Text>]} />",
            "<Carousel slides={slides} navigation=\"arrows\" pagination=\"progress\" loop />",
            "```tsx\nimport { Carousel } from '@qzlcorp/react-native';\nimport { Pressable, Text, View } from 'react-native';\n\n<Carousel\n  slides={[<Text key=\"first\">First</Text>, <Text key=\"second\">Second</Text>]}\n  renderNavigation={({ previous, next, canGoPrevious, canGoNext }) => (\n    <View style={{ flexDirection: 'row', gap: 8 }}>\n      <Pressable accessibilityRole=\"button\" accessibilityLabel=\"Previous slide\" disabled={!canGoPrevious} onPress={previous}>\n        <Text>Back</Text>\n      </Pressable>\n      <Pressable accessibilityRole=\"button\" accessibilityLabel=\"Next slide\" disabled={!canGoNext} onPress={next}>\n        <Text>Next</Text>\n      </Pressable>\n    </View>\n  )}\n  renderPagination={({ index, slideCount, goTo }) => (\n    <View style={{ flexDirection: 'row', gap: 8 }}>\n      {Array.from({ length: slideCount }, (_, slide) => (\n        <Pressable key={slide} accessibilityRole=\"button\" accessibilityLabel={`Go to slide ${slide + 1}`} accessibilityState={{ selected: index === slide }} onPress={() => goTo(slide)}>\n          <Text>{slide + 1}</Text>\n        </Pressable>\n      ))}\n    </View>\n  )}\n/>\n```"
          ],
          "propsType": "CarouselProps",
          "extends": [],
          "props": [
            {
              "name": "slides",
              "type": "React.ReactNode[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Non-empty slide contents in display order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "index",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Controlled zero-based slide index; controls local state when supplied.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "defaultIndex",
              "type": "number | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "0",
              "description": "Initial zero-based slide index when `index` is omitted.",
              "documentedDefault": "0",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Carousel'",
              "description": "Accessible label for the carousel container.",
              "documentedDefault": "'Carousel'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onIndexChange",
              "type": "((index: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called with the requested zero-based slide index after navigation.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "navigation",
              "type": "CarouselNavigation | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'text'",
              "description": "Built-in previous/next control presentation. `none` hides the controls.\n`renderNavigation` can replace the built-in controls unless this is `none`.",
              "documentedDefault": "'text'",
              "allowedValues": [
                "text",
                "arrows",
                "none"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselNavigation",
                  "definition": "export type CarouselNavigation = 'text' | 'arrows' | 'none';",
                  "description": "Built-in navigation presentation for {@link Carousel}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "pagination",
              "type": "CarouselPagination | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'dots'",
              "description": "Built-in slide position indicator. `none` hides the indicator.\n`renderPagination` can replace the built-in indicator unless this is `none`.",
              "documentedDefault": "'dots'",
              "allowedValues": [
                "none",
                "dots",
                "progress",
                "fraction"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselPagination",
                  "definition": "export type CarouselPagination = 'dots' | 'progress' | 'fraction' | 'none';",
                  "description": "Built-in position indicator presentation for {@link Carousel}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "navigationPlacement",
              "type": "CarouselNavigationPlacement | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'below'",
              "description": "Position of navigation controls. Built-in overlay controls reserve space at the slide edges;\ncustom overlay controls should account for their own width.",
              "documentedDefault": "'below'",
              "allowedValues": [
                "below",
                "overlay"
              ],
              "relatedTypes": [
                {
                  "name": "CarouselNavigationPlacement",
                  "definition": "export type CarouselNavigationPlacement = 'below' | 'overlay';",
                  "description": "Placement for built-in or custom Carousel navigation controls.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "loop",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Wrap previous/next navigation from the first and last slides.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "renderNavigation",
              "type": "((controls: CarouselControls) => React.ReactNode) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Replaces the built-in previous/next controls when `navigation` is not `none`.\nCustom controls should expose accessible names and use the provided navigation actions.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "CarouselControls",
                  "definition": "export interface CarouselControls {\n  /** Current zero-based slide index. */\n  index: number;\n  /** Number of slides in the carousel. */\n  slideCount: number;\n  /** Whether `previous` can move to another slide. */\n  canGoPrevious: boolean;\n  /** Whether `next` can move to another slide. */\n  canGoNext: boolean;\n  /** Move to the previous slide when available; wraps when `loop` is enabled. */\n  previous: () => void;\n  /** Move to the next slide when available; wraps when `loop` is enabled. */\n  next: () => void;\n  /**\n   * Select a valid zero-based slide index.\n   * @param index The slide index to select.\n   * @throws {RangeError} If the index is outside the slide range.\n   */\n  goTo: (index: number) => void;\n}",
                  "description": "Navigation actions and state passed to Carousel control render callbacks.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "renderPagination",
              "type": "((controls: CarouselControls) => React.ReactNode) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Replaces the built-in position indicator when `pagination` is not `none`.\nCustom indicators should expose the current slide and an accessible way to select slides.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "CarouselControls",
                  "definition": "export interface CarouselControls {\n  /** Current zero-based slide index. */\n  index: number;\n  /** Number of slides in the carousel. */\n  slideCount: number;\n  /** Whether `previous` can move to another slide. */\n  canGoPrevious: boolean;\n  /** Whether `next` can move to another slide. */\n  canGoNext: boolean;\n  /** Move to the previous slide when available; wraps when `loop` is enabled. */\n  previous: () => void;\n  /** Move to the next slide when available; wraps when `loop` is enabled. */\n  next: () => void;\n  /**\n   * Select a valid zero-based slide index.\n   * @param index The slide index to select.\n   * @throws {RangeError} If the index is outside the slide range.\n   */\n  goTo: (index: number) => void;\n}",
                  "description": "Navigation actions and state passed to Carousel control render callbacks.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx"
                }
              ]
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for navigation controls and pips.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer carousel container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "DropdownMenu",
      "slug": "dropdown-menu",
      "category": "Navigation",
      "description": "Renders an HTML disclosure menu; selecting an enabled item invokes its callback and closes it.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { DropdownMenu } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DropdownMenu label=\"Example label\" items={[{ label: 'Edit', onSelect: () => {} }, { label: 'Duplicate', onSelect: () => {} }]} />\n  );\n}",
        "customization": {
          "web": "import { DropdownMenu } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DropdownMenu label=\"Example label\" items={[{ label: 'Edit', onSelect: () => {} }, { label: 'Duplicate', onSelect: () => {} }]} className=\"custom-example\" />\n  );\n}",
          "native": "import { DropdownMenu } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DropdownMenu label=\"Example label\" items={[{ label: 'Edit', onSelect: () => {} }, { label: 'Duplicate', onSelect: () => {} }]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { DropdownMenu } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DropdownMenu label=\"Example label\" items={[{ label: 'Edit', onSelect: () => {} }, { label: 'Duplicate', onSelect: () => {} }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/dropdown-menu.tsx",
          "description": "Renders an HTML disclosure menu; selecting an enabled item invokes its callback and closes it.",
          "examples": [
            "```tsx\n<DropdownMenu label=\"Actions\" items={[{ label: 'Refresh', onSelect: refresh }]} />\n```"
          ],
          "propsType": "DropdownMenuProps",
          "extends": [
            "Omit<React.HTMLAttributes<HTMLDetailsElement>, 'title'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible summary that opens and closes the menu.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "items",
              "type": "DropdownMenuItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Actions displayed while the details element is open.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DropdownMenuItem",
                  "definition": "export interface DropdownMenuItem {\n  /** Visible action label. */\n  label: React.ReactNode;\n  /** Called when the enabled menu action is selected; the containing details element is then closed. */\n  onSelect: () => void;\n  /** Disables the action button. */\n  disabled?: boolean;\n}",
                  "description": "One action rendered in a {@link DropdownMenu}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/dropdown-menu.tsx"
                }
              ]
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/dropdown-menu.tsx",
          "description": "Toggles a React Native list of actions; selecting an enabled item closes the list before calling it.",
          "examples": [
            "<DropdownMenu label=\"More\" items={[{ label: 'Refresh', onSelect: refresh }]} />"
          ],
          "propsType": "DropdownMenuProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text shown on the trigger and used as its React Native button accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "items",
              "type": "DropdownMenuItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Menu items displayed when the trigger is pressed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DropdownMenuItem",
                  "definition": "export interface DropdownMenuItem {\n  /** Text shown in the menu item. */\n  label: string;\n  /**\n   * Action invoked after this item is selected; the menu closes first.\n   */\n  onSelect: () => void;\n  /** Prevents selecting this item. */\n  disabled?: boolean;\n}",
                  "description": "One action in a dropdown menu.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/dropdown-menu.tsx"
                }
              ]
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for trigger and menu surfaces.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "NavigationMenu",
      "slug": "navigation-menu",
      "category": "Navigation",
      "description": "Renders a labeled navigation landmark containing a list of links.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { NavigationMenu } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <NavigationMenu items={[{ label: 'Overview', href: '/' }, { label: 'Components', href: '/components' }]} label=\"Example label\" />\n  );\n}",
        "customization": {
          "web": "import { NavigationMenu } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <NavigationMenu items={[{ label: 'Overview', href: '/' }, { label: 'Components', href: '/components' }]} label=\"Example label\" className=\"custom-example\" />\n  );\n}",
          "native": "import { NavigationMenu } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <NavigationMenu items={[{ label: 'Overview', onPress: () => {}, current: true }, { label: 'Components', onPress: () => {} }]} label=\"Example label\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { NavigationMenu } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <NavigationMenu items={[{ label: 'Overview', onPress: () => {}, current: true }, { label: 'Components', onPress: () => {} }]} label=\"Example label\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/navigation-menu.tsx",
          "description": "Renders a labeled navigation landmark containing a list of links.",
          "examples": [
            "```tsx\n<NavigationMenu label=\"Account\" items={[{ label: 'Profile', href: '/profile', current: true }]} />\n```"
          ],
          "propsType": "NavigationMenuProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "items",
              "type": "NavigationMenuItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Navigation links in display order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "NavigationMenuItem",
                  "definition": "export interface NavigationMenuItem {\n  /** Link text or other visible label. */\n  label: React.ReactNode;\n  /** Link destination. */\n  href: string;\n  /** Marks this link as the current page for assistive technology. */\n  current?: boolean;\n}",
                  "description": "One destination rendered in a {@link NavigationMenu}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/navigation-menu.tsx"
                }
              ]
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible name for the navigation landmark.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/navigation-menu.tsx",
          "description": "Renders navigation choices as React Native pressable rows; this component does not perform routing.",
          "examples": [
            "<NavigationMenu label=\"Settings\" items={[{ label: 'Profile', current: true, onPress: showProfile }]} />"
          ],
          "propsType": "NavigationMenuProps",
          "extends": [],
          "props": [
            {
              "name": "items",
              "type": "NavigationMenuItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Entries rendered in order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "NavigationMenuItem",
                  "definition": "export interface NavigationMenuItem {\n  /** Visible title and button text. */\n  label: string;\n  /** Action invoked when the entry is pressed. */\n  onPress: () => void;\n  /** Marks this entry as selected in accessibility state and styling. */\n  current?: boolean;\n}",
                  "description": "One selectable entry in a navigation menu.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/navigation-menu.tsx"
                }
              ]
            },
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the list.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected entries.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the list container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Pagination",
      "slug": "pagination",
      "category": "Navigation",
      "description": "Renders previous/next controls and up to five consecutive page buttons.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Pagination } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Pagination page={1} pageCount={3} onPageChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { Pagination } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Pagination page={1} pageCount={3} onPageChange={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { Pagination } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Pagination page={1} pageCount={3} onPageChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Pagination } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Pagination page={1} pageCount={3} onPageChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/pagination.tsx",
          "description": "Renders previous/next controls and up to five consecutive page buttons.",
          "examples": [
            "```tsx\n<Pagination page={page} pageCount={pageCount} onPageChange={setPage} />\n```"
          ],
          "propsType": "PaginationProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "page",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current page, numbered from 1.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "pageCount",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Total number of pages; must be a positive integer.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onPageChange",
              "type": "(page: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the requested page after a page control is activated.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Pagination'",
              "description": "Accessible name for the pagination navigation landmark.",
              "documentedDefault": "'Pagination'",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/pagination.tsx",
          "description": "Renders previous/next controls and up to five nearby React Native buttons with selected and disabled accessibility states.",
          "examples": [
            "<Pagination page={page} pageCount={12} onPageChange={setPage} />"
          ],
          "propsType": "PaginationProps",
          "extends": [],
          "props": [
            {
              "name": "page",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current one-based page number. Must be within `1..pageCount`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "pageCount",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Total number of pages; must be a positive integer.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onPageChange",
              "type": "(page: number) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the requested page number when an enabled page control is pressed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Pagination'",
              "description": "Accessible label announced by platform accessibility services.",
              "documentedDefault": "'Pagination'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for page controls.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the control list.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Pips",
      "slug": "pips",
      "category": "Navigation",
      "description": "Renders one button per item and optionally reports selected indicator changes.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Pips } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Pips count={3} index={0} />\n  );\n}",
        "customization": {
          "web": "import { Pips } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Pips count={3} index={0} className=\"custom-example\" />\n  );\n}",
          "native": "import { Pips } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Pips count={3} index={0} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Pips } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Pips count={3} index={0} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders one button per item and optionally reports selected indicator changes.",
          "examples": [
            "```tsx\n<Pips count={slides.length} index={active} onIndexChange={setActive} label=\"Choose slide\" />\n```"
          ],
          "propsType": "PipsProps",
          "extends": [],
          "props": [
            {
              "name": "count",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Number of indicators to render; must be a positive integer.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "index",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based index marked as current; must be within `count`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onIndexChange",
              "type": "((index: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called with the zero-based selected index. If omitted, the indicators are disabled.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Choose item'",
              "description": "Accessible group name and prefix for each indicator's accessible name.",
              "documentedDefault": "'Choose item'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the indicator group.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Renders React Native button pips, or disabled visual pips when no change callback is supplied.",
          "examples": [
            "<Pips count={4} index={selectedIndex} onIndexChange={setSelectedIndex} />"
          ],
          "propsType": "PipsProps",
          "extends": [],
          "props": [
            {
              "name": "count",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Number of pips; must be a positive integer.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "index",
              "type": "number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Zero-based index of the selected pip; must be less than `count`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onIndexChange",
              "type": "((index: number) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Enables the pips and reports the selected zero-based index when pressed.\nWhen omitted, pips are disabled.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'Choose item'",
              "description": "Accessible label prefix for the pip list and each pip.",
              "documentedDefault": "'Choose item'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected pips.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the pip list.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Tabs",
      "slug": "tabs",
      "category": "Navigation",
      "description": "Renders an accessible, controlled tab list with arrow, Home, and End navigation.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Tabs } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'details', label: 'Details' }]} value=\"team\" onValueChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { Tabs } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'details', label: 'Details' }]} value=\"details\" onValueChange={() => {}} />\n  );\n}",
          "native": "import { Tabs } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'details', label: 'Details' }]} value=\"team\" onValueChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { Tabs } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'details', label: 'Details' }]} value=\"team\" onValueChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/tabs.tsx",
          "description": "Renders an accessible, controlled tab list with arrow, Home, and End navigation.",
          "examples": [
            "```tsx\n<Tabs items={tabs} value={activeTab} onValueChange={setActiveTab} panelId=\"settings-panel\" />\n```"
          ],
          "propsType": "TabsProps",
          "extends": [],
          "props": [
            {
              "name": "items",
              "type": "TabItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Tabs to render, in display and keyboard-navigation order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "TabItem",
                  "definition": "export interface TabItem {\n  /** Value identifying this tab in controlled state. */\n  value: string;\n  /** Visible tab label; text content supplies the accessible name unless `ariaLabel` is set. */\n  label: React.ReactNode;\n  /** Accessible name for labels that do not contain readable text, such as icon-only labels. */\n  ariaLabel?: string;\n}",
                  "description": "Label and identifier for one tab button.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/tabs.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Value of the selected tab.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when a tab is activated by click or tab-list keyboard navigation.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "panelId",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "ID of the associated tab panel, assigned to each tab's `aria-controls`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/tabs.tsx",
          "description": "Renders React Native pressable tabs and exposes the selected state to accessibility services.",
          "examples": [
            "<Tabs items={[{ value: 'details', label: 'Details' }]} value={tab} onValueChange={setTab} />"
          ],
          "propsType": "TabsProps",
          "extends": [],
          "props": [
            {
              "name": "items",
              "type": "TabItem[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Tabs rendered in input order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "TabItem",
                  "definition": "export interface TabItem {\n  /** Value emitted when the tab is pressed. */\n  value: string;\n  /** Visible text and tab content. */\n  label: string;\n}",
                  "description": "One tab label and value.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/tabs.tsx"
                }
              ]
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Value of the selected tab.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called with the value of the pressed tab.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for selected and unselected tabs.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the tab-list container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "BottomSheet",
      "slug": "bottom-sheet",
      "category": "Overlays",
      "description": "Renders the shared modal dialog as a bottom-positioned sheet.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { BottomSheet } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <BottomSheet open={false} onOpenChange={() => {}} title=\"Example title\">\n      Example content\n    </BottomSheet>\n  );\n}",
        "customization": {
          "web": "import { BottomSheet } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <BottomSheet open={false} onOpenChange={() => {}} title=\"Example title\" className=\"custom-example\">\n      Example content\n    </BottomSheet>\n  );\n}",
          "native": "import { BottomSheet } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <BottomSheet open={false} onOpenChange={() => {}} title=\"Example title\" theme=\"light\">\n      <Text>Example content</Text>\n    </BottomSheet>\n  );\n}"
        },
        "native": "import { BottomSheet } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <BottomSheet open={false} onOpenChange={() => {}} title=\"Example title\">\n      <Text>Example content</Text>\n    </BottomSheet>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders the shared modal dialog as a bottom-positioned sheet.",
          "examples": [
            "```tsx\n<BottomSheet open={open} onOpenChange={setOpen} title=\"Filters\"><p>Filter options</p></BottomSheet>\n```"
          ],
          "propsType": "SheetProps",
          "extends": [],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the modal sheet should be open.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the underlying dialog requests a state change.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Sheet heading, used as the dialog's accessible name.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional text associated as the dialog description.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content rendered inside the sheet.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name added to the sheet's built-in classes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Presents a slide-animated React Native modal panel attached to the bottom edge.\nThe hardware/back close request and backdrop press call `onOpenChange(false)`.",
          "examples": [
            "<BottomSheet open={open} onOpenChange={setOpen} title=\"Filters\"><Text>Filter options</Text></BottomSheet>"
          ],
          "propsType": "SheetProps",
          "extends": [],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Controls React Native modal visibility.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the React Native modal requests closure, the close button is pressed, or the backdrop is pressed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Heading displayed in the panel.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text displayed below the heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Sheet body content.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Palette used for the panel and text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "contentStyle",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the modal panel.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Dialog",
      "slug": "dialog",
      "category": "Overlays",
      "description": "Renders a controlled modal dialog with a heading, optional description, and close control.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Dialog } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Dialog open={false} onOpenChange={() => {}} title=\"Example title\">\n      Example content\n    </Dialog>\n  );\n}",
        "customization": {
          "web": "import { Dialog } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Dialog open={false} onOpenChange={() => {}} title=\"Example title\" className=\"custom-example\">\n      Example content\n    </Dialog>\n  );\n}",
          "native": "import { Dialog } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Dialog open={false} onOpenChange={() => {}} title=\"Example title\" theme=\"dark\">\n      <Text>Example content</Text>\n    </Dialog>\n  );\n}"
        },
        "native": "import { Dialog } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Dialog open={false} onOpenChange={() => {}} title=\"Example title\">\n      <Text>Example content</Text>\n    </Dialog>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/dialog.tsx",
          "description": "Renders a controlled modal dialog with a heading, optional description, and close control.",
          "examples": [
            "```tsx\n<Dialog open={open} onOpenChange={setOpen} title=\"Confirm\" description=\"Continue?\">\n  <p>This action cannot be undone.</p>\n</Dialog>\n```"
          ],
          "propsType": "DialogProps",
          "extends": [
            "Omit<React.HTMLAttributes<HTMLDialogElement>, 'title'>"
          ],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the modal dialog should be open.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the dialog requests a state change, including close button, Escape, backdrop,\ndialog close, and cancel interactions.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Dialog heading, used as its accessible name.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional dialog description associated with the dialog.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onClose",
              "type": "React.ReactEventHandler<HTMLDialogElement> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "HTML dialog close event handler, called after the component requests a closed state.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onCancel",
              "type": "React.ReactEventHandler<HTMLDialogElement> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "HTML dialog cancel event handler, called after cancellation is prevented and close is requested.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/dialog.tsx",
          "description": "Presents content in a React Native modal, defaulting to a transparent fade transition, and reports\nclose requests through `onOpenChange` (including platform close requests such as\nAndroid hardware back).",
          "examples": [
            "<Dialog open={open} onOpenChange={setOpen} title=\"Delete item\">\n  <Text>This action cannot be undone.</Text>\n</Dialog>"
          ],
          "propsType": "DialogProps",
          "extends": [
            "Omit<ModalProps, 'visible' | 'onRequestClose' | 'children'>"
          ],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Controls whether the React Native modal is visible.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Requests a visibility change, including platform close requests and the close button.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Heading displayed in the modal.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text displayed below the heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Dialog body rendered inside the modal.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for modal surface and text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "contentStyle",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the dialog content panel.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Popover",
      "slug": "popover",
      "category": "Overlays",
      "description": "Renders a button-controlled popover that closes on outside pointer press or Escape.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Popover } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Popover trigger=\"More information\">\n      Example content\n    </Popover>\n  );\n}",
        "customization": {
          "web": "import { Popover } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Popover trigger=\"More information\" className=\"custom-example\">\n      Example content\n    </Popover>\n  );\n}",
          "native": "import { Popover } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Popover trigger=\"More information\" theme=\"dark\">\n      <Text>Example content</Text>\n    </Popover>\n  );\n}"
        },
        "native": "import { Popover } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Popover trigger=\"More information\">\n      <Text>Example content</Text>\n    </Popover>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders a button-controlled popover that closes on outside pointer press or Escape.",
          "examples": [
            "```tsx\n<Popover trigger=\"Help\" label=\"Help\"><p>Find setup instructions here.</p></Popover>\n```"
          ],
          "propsType": "PopoverProps",
          "extends": [],
          "props": [
            {
              "name": "trigger",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content of the button that opens or closes the popover.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content displayed while the popover is open.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'More information'",
              "description": "Accessible name of the displayed dialog.",
              "documentedDefault": "'More information'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name applied to the root element.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Toggles an inline labeled summary panel from a React Native button; it is not a floating modal.",
          "examples": [
            "<Popover trigger=\"Details\"><Text>Additional information.</Text></Popover>"
          ],
          "propsType": "PopoverProps",
          "extends": [],
          "props": [
            {
              "name": "trigger",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text shown on the pressable trigger and used as its accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content displayed while the disclosure is open.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'More information'",
              "description": "Accessible label for the open summary panel.",
              "documentedDefault": "'More information'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the trigger and panel.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "SideSheet",
      "slug": "side-sheet",
      "category": "Overlays",
      "description": "Renders the shared modal dialog as a side-positioned sheet.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { SideSheet } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SideSheet open={false} onOpenChange={() => {}} title=\"Example title\">\n      Example content\n    </SideSheet>\n  );\n}",
        "customization": {
          "web": "import { SideSheet } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <SideSheet open={false} onOpenChange={() => {}} title=\"Example title\" className=\"custom-example\">\n      Example content\n    </SideSheet>\n  );\n}",
          "native": "import { SideSheet } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <SideSheet open={false} onOpenChange={() => {}} title=\"Example title\" theme=\"light\">\n      <Text>Example content</Text>\n    </SideSheet>\n  );\n}"
        },
        "native": "import { SideSheet } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <SideSheet open={false} onOpenChange={() => {}} title=\"Example title\">\n      <Text>Example content</Text>\n    </SideSheet>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/catalog-extensions.tsx",
          "description": "Renders the shared modal dialog as a side-positioned sheet.",
          "examples": [
            "```tsx\n<SideSheet open={open} onOpenChange={setOpen} title=\"Details\"><p>Item details</p></SideSheet>\n```"
          ],
          "propsType": "SheetProps",
          "extends": [],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Whether the modal sheet should be open.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the underlying dialog requests a state change.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Sheet heading, used as the dialog's accessible name.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional text associated as the dialog description.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content rendered inside the sheet.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "className",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional class name added to the sheet's built-in classes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/catalog-extensions.tsx",
          "description": "Presents a slide-animated React Native modal panel attached to the right edge.\nThe hardware/back close request and backdrop press call `onOpenChange(false)`.",
          "examples": [
            "<SideSheet open={open} onOpenChange={setOpen} title=\"Details\"><Text>Item details</Text></SideSheet>"
          ],
          "propsType": "SheetProps",
          "extends": [],
          "props": [
            {
              "name": "open",
              "type": "boolean",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Controls React Native modal visibility.",
              "documentedDefault": null,
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "onOpenChange",
              "type": "(open: boolean) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called when the React Native modal requests closure, the close button is pressed, or the backdrop is pressed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Heading displayed in the panel.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text displayed below the heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Sheet body content.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Palette used for the panel and text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "contentStyle",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the modal panel.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "Tooltip",
      "slug": "tooltip",
      "category": "Overlays",
      "description": "Associates a child element with descriptive tooltip content via `aria-describedby`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { Tooltip, Button } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tooltip content=\"Example\">\n      <Button>Focus or hover</Button>\n    </Tooltip>\n  );\n}",
        "customization": {
          "web": "import { Tooltip, Button } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <Tooltip content=\"Helpful details for this action.\">\n      <Button>Focus or hover</Button>\n    </Tooltip>\n  );\n}",
          "native": "import { Tooltip } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Tooltip content=\"Example\" theme=\"dark\">\n      <Text>Focus for help</Text>\n    </Tooltip>\n  );\n}"
        },
        "native": "import { Tooltip } from '@qzlcorp/react-native';\nimport { Text } from 'react-native';\n\nexport function Example() {\n  return (\n    <Tooltip content=\"Example\">\n      <Text>Focus for help</Text>\n    </Tooltip>\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/tooltip.tsx",
          "description": "Associates a child element with descriptive tooltip content via `aria-describedby`.",
          "examples": [
            "```tsx\n<Tooltip content=\"Opens in a new window\"><button>Help</button></Tooltip>\n```"
          ],
          "propsType": "TooltipProps",
          "extends": [],
          "props": [
            {
              "name": "content",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text rendered in the tooltip content.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactElement<{ 'aria-describedby'?: string; }, string | React.JSXElementConstructor<any>>",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Single trigger element; existing `aria-describedby` ids are preserved.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/tooltip.tsx",
          "description": "Toggles a text help message from a React Native pressable control; it does not use a hover popup.",
          "examples": [
            "<Tooltip content=\"Use at least eight characters.\"><Text>Password</Text></Tooltip>"
          ],
          "propsType": "TooltipProps",
          "extends": [],
          "props": [
            {
              "name": "content",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Text exposed as the trigger's accessibility hint and shown when revealed.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "children",
              "type": "React.ReactNode",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Content displayed beside the help trigger.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the help affordance and message.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the outer container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "AreaChart",
      "slug": "area-chart",
      "category": "Data display",
      "description": "Renders area series over shared labels. Use `stacked` for cumulative, non-negative values.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { AreaChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <AreaChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} />\n  );\n}",
        "customization": {
          "web": "import { AreaChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <AreaChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} stacked={true} />\n  );\n}",
          "native": "import { AreaChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <AreaChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { AreaChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <AreaChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/area-chart.tsx",
          "description": "Renders area series over shared labels. Use `stacked` for cumulative, non-negative values.",
          "examples": [
            "```tsx\n<AreaChart\n  title=\"Cumulative weekly visits\"\n  labels={['Mon', 'Tue', 'Wed']}\n  series={[{ label: 'Visits', values: [120, 156, 142] }]}\n/>\n```"
          ],
          "propsType": "AreaChartProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Figure caption displayed above the chart.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "labels",
              "type": "string[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered category or time labels shared by every series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "series",
              "type": "AreaChartSeries[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "One or more area series. Each series must contain one value per label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "AreaChartSeries",
                  "definition": "export interface AreaChartSeries {\n  /** Text identifying this area in the legend. */\n  label: string;\n  /** Finite numeric values, one for each chart label. */\n  values: number[];\n  /** Optional CSS color for the area and its outline. */\n  color?: string;\n}",
                  "description": "One named area whose values align with the chart's labels.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/area-chart.tsx"
                }
              ]
            },
            {
              "name": "stacked",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Stack non-negative series on top of one another.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats values in the accessible data summary and axis.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/area-chart.tsx",
          "description": "Renders area series in React Native. Set `stacked` for cumulative, non-negative values.",
          "examples": [
            "<AreaChart title=\"Cumulative visits\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [120, 156, 142] }]} />"
          ],
          "propsType": "AreaChartProps",
          "extends": [],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Chart heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "labels",
              "type": "string[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered category or time labels shared by every series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "series",
              "type": "AreaChartSeries[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "One or more area series. Each series must contain one value per label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "AreaChartSeries",
                  "definition": "export interface AreaChartSeries {\n  /** Text identifying this area in the legend. */\n  label: string;\n  /** Finite numeric values, one for each chart label. */\n  values: number[];\n  /** Optional area fill and outline color. */\n  color?: string;\n}",
                  "description": "One named area whose values align with the chart's labels.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/area-chart.tsx"
                }
              ]
            },
            {
              "name": "stacked",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Stack non-negative series on top of one another.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats values in the accessible data summary and axis.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for chart text, grid lines, and default series colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the chart container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "BarChart",
      "slug": "bar-chart",
      "category": "Data display",
      "description": "Renders horizontal or vertical bars, with grouped and stacked multi-series layouts.\nThe accessible data labels remain available alongside the visual bars.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { BarChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <BarChart data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} title=\"Weekly activity\" />\n  );\n}",
        "customization": {
          "web": "import { BarChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <BarChart data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} title=\"Weekly activity\" orientation=\"vertical\" />\n  );\n}",
          "native": "import { BarChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <BarChart title=\"Weekly activity\" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} orientation=\"vertical\" />\n  );\n}"
        },
        "native": "import { BarChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <BarChart title=\"Weekly activity\" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/bar-chart.tsx",
          "description": "Renders horizontal or vertical bars, with grouped and stacked multi-series layouts.\nThe accessible data labels remain available alongside the visual bars.",
          "examples": [
            "```tsx\n<BarChart title=\"Monthly signups\" data={[{ label: 'Jan', value: 24 }]} orientation=\"vertical\" />\n```",
            "```tsx\n<BarChart\n  title=\"Quarterly signups\"\n  data={[{ label: 'Q1', values: { organic: 24, referral: 12 } }]}\n  series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]}\n  mode=\"stacked\"\n/>\n```"
          ],
          "propsType": "BarChartProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "data",
              "type": "(BarChartDatum | BarChartMultiSeriesDatum)[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Category values. Use `value` for one series or `values` with `series` for multiple series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BarChartDatum",
                  "definition": "export interface BarChartDatum {\n  /** Category label shown beside the bar. */\n  label: string;\n  /** Finite numeric value determining bar size and direction. */\n  value: number;\n  /** Optional CSS color applied to this datum's bar. */\n  color?: string;\n}",
                  "description": "One labeled numeric value rendered as a bar by {@link BarChart}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/bar-chart.tsx"
                },
                {
                  "name": "BarChartMultiSeriesDatum",
                  "definition": "export interface BarChartMultiSeriesDatum {\n  /** Category label shown beside the grouped or stacked bars. */\n  label: string;\n  /** Finite numeric values keyed by each declared series key. */\n  values: Record<string, number>;\n}",
                  "description": "A category containing values keyed by the corresponding {@link BarChartSeries.key}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/bar-chart.tsx"
                }
              ]
            },
            {
              "name": "series",
              "type": "BarChartSeries[] | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Series definitions for grouped or stacked data. Each datum must contain a value for every key.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BarChartSeries",
                  "definition": "export interface BarChartSeries {\n  /** Stable key used to read values from each multi-series datum. */\n  key: string;\n  /** Text identifying this series in the legend and data summary. */\n  label: string;\n  /** Optional CSS color for this series. */\n  color?: string;\n}",
                  "description": "A labeled series used to render grouped or stacked bars.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/bar-chart.tsx"
                }
              ]
            },
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Figure caption displayed above the chart.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "orientation",
              "type": "\"horizontal\" | \"vertical\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'horizontal'",
              "description": "Bar direction.",
              "documentedDefault": "'horizontal'",
              "allowedValues": [
                "horizontal",
                "vertical"
              ],
              "relatedTypes": []
            },
            {
              "name": "mode",
              "type": "\"grouped\" | \"stacked\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'grouped'",
              "description": "How multiple series are arranged. Stacked values must be non-negative.",
              "documentedDefault": "'grouped'",
              "allowedValues": [
                "grouped",
                "stacked"
              ],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats each numeric value for display alongside its bar.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/bar-chart.tsx",
          "description": "Renders bars in React Native views, with horizontal or vertical, grouped or stacked layouts.\nThe category labels and values remain visible as text.",
          "examples": [
            "<BarChart title=\"Weekly signups\" data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 18 }]} />",
            "<BarChart title=\"Quarterly signups\" data={[{ label: 'Q1', values: { organic: 24, referral: 12 } }]} series={[{ key: 'organic', label: 'Organic' }, { key: 'referral', label: 'Referral' }]} mode=\"stacked\" />"
          ],
          "propsType": "BarChartProps",
          "extends": [],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Chart heading, also exposed as the container accessibility label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "data",
              "type": "(BarChartDatum | BarChartMultiSeriesDatum)[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Category values. Use `value` for one series or `values` with `series` for multiple series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BarChartDatum",
                  "definition": "export interface BarChartDatum {\n  /** Text identifying this datum. */\n  label: string;\n  /** Finite numeric value; negative values extend from the zero baseline. */\n  value: number;\n  /** Optional bar fill color, overriding the selected theme's primary color. */\n  color?: string;\n}",
                  "description": "One labeled numeric value rendered as a bar by {@link BarChart}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/bar-chart.tsx"
                },
                {
                  "name": "BarChartMultiSeriesDatum",
                  "definition": "export interface BarChartMultiSeriesDatum {\n  /** Text identifying this category. */\n  label: string;\n  /** Finite numeric values keyed by each declared series key. */\n  values: Record<string, number>;\n}",
                  "description": "A category containing values keyed by the corresponding {@link BarChartSeries.key}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/bar-chart.tsx"
                }
              ]
            },
            {
              "name": "series",
              "type": "BarChartSeries[] | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Series definitions for grouped or stacked data. Each datum must contain a value for every key.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "BarChartSeries",
                  "definition": "export interface BarChartSeries {\n  /** Stable key used to read values from each multi-series datum. */\n  key: string;\n  /** Text identifying this series in the legend and data summary. */\n  label: string;\n  /** Optional bar fill color. */\n  color?: string;\n}",
                  "description": "A labeled series used to render grouped or stacked bars.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/bar-chart.tsx"
                }
              ]
            },
            {
              "name": "orientation",
              "type": "\"horizontal\" | \"vertical\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'horizontal'",
              "description": "Bar direction.",
              "documentedDefault": "'horizontal'",
              "allowedValues": [
                "horizontal",
                "vertical"
              ],
              "relatedTypes": []
            },
            {
              "name": "mode",
              "type": "\"grouped\" | \"stacked\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'grouped'",
              "description": "How multiple series are arranged. Stacked values must be non-negative.",
              "documentedDefault": "'grouped'",
              "allowedValues": [
                "grouped",
                "stacked"
              ],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats each numeric value for display.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for chart text, tracks, and default bars.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the chart container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "DataTable",
      "slug": "data-table",
      "category": "Data display",
      "description": "Renders a table with optional client-side sorting for columns that define `sortValue`.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { DataTable } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DataTable columns={[{ key: 'name', header: 'Name', render: (row: { name: string }) => row.name, sortValue: (row: { name: string }) => row.name }]} rows={[{ name: 'Design system' }, { name: 'Component docs' }]} getRowKey={row => row.name} caption=\"Example records\" />\n  );\n}",
        "customization": {
          "web": "import { DataTable } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DataTable columns={[{ key: 'name', header: 'Name', render: (row: { name: string }) => row.name, sortValue: (row: { name: string }) => row.name }]} rows={[{ name: 'Design system' }, { name: 'Component docs' }]} getRowKey={row => row.name} caption=\"Example records\" className=\"custom-example\" />\n  );\n}",
          "native": "import { DataTable } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DataTable columns={[{ key: 'name', header: 'Name', render: (row: { name: string }) => row.name, sortValue: (row: { name: string }) => row.name }]} rows={[{ name: 'Design system' }, { name: 'Component docs' }]} getRowKey={row => row.name} caption=\"Example records\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { DataTable } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DataTable columns={[{ key: 'name', header: 'Name', render: (row: { name: string }) => row.name, sortValue: (row: { name: string }) => row.name }]} rows={[{ name: 'Design system' }, { name: 'Component docs' }]} getRowKey={row => row.name} caption=\"Example records\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/data-table.tsx",
          "description": "Renders a table with optional client-side sorting for columns that define `sortValue`.",
          "examples": [
            "```tsx\n<DataTable caption=\"People\" columns={columns} rows={people} getRowKey={(person) => person.id} />\n```"
          ],
          "propsType": "DataTableProps<Row>",
          "extends": [
            "Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'>"
          ],
          "props": [
            {
              "name": "columns",
              "type": "DataTableColumn<Row>[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Column definitions in display order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DataTableColumn",
                  "definition": "export interface DataTableColumn<Row> {\n  /** Stable identifier used for rendering and sort state. */\n  key: string;\n  /** Header content displayed for this column. */\n  header: React.ReactNode;\n  /**\n   * Produces a cell's content.\n   * @param row Data record for the current table row.\n   * @param index Position of this row in the rendered (possibly sorted) rows.\n   * @returns Content rendered in the cell.\n   */\n  render: (row: Row, index: number) => React.ReactNode;\n  /**\n   * Produces the sortable value for a row. Columns without this function are not interactive.\n   * @param row Data record whose sort key is requested.\n   * @returns String or number compared when sorting.\n   */\n  sortValue?: (row: Row) => string | number;\n}",
                  "description": "Column definition used by the generic {@link DataTable}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/data-table.tsx"
                }
              ]
            },
            {
              "name": "rows",
              "type": "Row[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Data records to render.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "getRowKey",
              "type": "(row: Row, index: number) => React.Key",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Produces the React key for each record.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "caption",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible table caption describing the data.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "emptyMessage",
              "type": "React.ReactNode",
              "optional": true,
              "required": false,
              "defaultValue": "'No results found.'",
              "description": "Cell content shown when `rows` is empty.",
              "documentedDefault": "'No results found.'",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/data-table.tsx",
          "description": "Renders a horizontally scrollable table with stable local sorting for sortable columns.",
          "examples": [
            "<DataTable\n  caption=\"People\"\n  columns={[{ key: 'name', header: 'Name', render: (row) => row.name, sortValue: (row) => row.name }]}\n  rows={[{ name: 'Ada' }]}\n  getRowKey={(row) => row.name}\n/>"
          ],
          "propsType": "DataTableProps<Row>",
          "extends": [],
          "props": [
            {
              "name": "columns",
              "type": "DataTableColumn<Row>[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Column definitions in display order.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DataTableColumn",
                  "definition": "export interface DataTableColumn<Row> {\n  /** Stable identifier used for React keys and sort state. */\n  key: string;\n  /** Text shown in the column header. */\n  header: string;\n  /**\n   * Renders a cell for a row in the current display order.\n   * @param row Data item displayed in the cell.\n   * @param index Zero-based index of the row in the displayed sequence.\n   */\n  render: (row: Row, index: number) => React.ReactNode;\n  /**\n   * Returns a comparable value for sorting; omitting it makes the header non-sortable.\n   * @param row Data item whose sort value is requested.\n   */\n  sortValue?: (row: Row) => string | number;\n}",
                  "description": "Describes a table column and the functions used to render or sort its cells.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/data-table.tsx"
                }
              ]
            },
            {
              "name": "rows",
              "type": "Row[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Row data in the original order; sorting does not mutate this array.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "getRowKey",
              "type": "(row: Row, index: number) => string | number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Supplies a stable key for each row.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "caption",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Accessible label for the horizontal scroll container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "emptyMessage",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'No results found.'",
              "description": "Text shown when there are no rows.",
              "documentedDefault": "'No results found.'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for table text, borders, and header surface.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the horizontal scroll view.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "DonutChart",
      "slug": "donut-chart",
      "category": "Data display",
      "description": "Shows proportional category values as a donut, with a labeled total and text legend.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { DonutChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DonutChart title=\"Example title\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} />\n  );\n}",
        "customization": {
          "web": "import { DonutChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <DonutChart title=\"Example title\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} className=\"custom-example\" />\n  );\n}",
          "native": "import { DonutChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DonutChart title=\"Example title\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { DonutChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <DonutChart title=\"Example title\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/donut-chart.tsx",
          "description": "Shows proportional category values as a donut, with a labeled total and text legend.",
          "examples": [
            "```tsx\n<DonutChart title=\"Visitors by device\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} centerLabel=\"Visitors\" />\n```"
          ],
          "propsType": "DonutChartProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Figure caption displayed above the chart.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "data",
              "type": "DonutChartDatum[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Values to render as proportional slices.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DonutChartDatum",
                  "definition": "export interface DonutChartDatum {\n  /** Category label shown in the legend. */\n  label: string;\n  /** Finite, non-negative value contributing to the total. */\n  value: number;\n  /** Optional CSS color for this slice. */\n  color?: string;\n}",
                  "description": "One non-negative slice in a {@link DonutChart}.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/donut-chart.tsx"
                }
              ]
            },
            {
              "name": "centerLabel",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional label shown inside the ring above its total.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats slice values and the center total.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/donut-chart.tsx",
          "description": "Shows proportional category values as a React Native SVG donut with a text legend.",
          "examples": [
            "<DonutChart title=\"Visitors by device\" data={[{ label: 'Desktop', value: 64 }, { label: 'Mobile', value: 36 }]} centerLabel=\"Visitors\" />"
          ],
          "propsType": "DonutChartProps",
          "extends": [],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Chart heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "data",
              "type": "DonutChartDatum[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Values to render as proportional slices.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "DonutChartDatum",
                  "definition": "export interface DonutChartDatum {\n  /** Category label shown in the legend. */\n  label: string;\n  /** Finite, non-negative value contributing to the total. */\n  value: number;\n  /** Optional slice color. */\n  color?: string;\n}",
                  "description": "One non-negative slice in a {@link DonutChart}.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/donut-chart.tsx"
                }
              ]
            },
            {
              "name": "centerLabel",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional label shown inside the ring above its total.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats slice values and the center total.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for chart text and default slice colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the chart container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "LineChart",
      "slug": "line-chart",
      "category": "Data display",
      "description": "Renders one or more time series with shared category labels and a readable data summary.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { LineChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <LineChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} />\n  );\n}",
        "customization": {
          "web": "import { LineChart } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <LineChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} className=\"custom-example\" />\n  );\n}",
          "native": "import { LineChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <LineChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { LineChart } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <LineChart title=\"Example title\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [12, 18, 15] }]} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/line-chart.tsx",
          "description": "Renders one or more time series with shared category labels and a readable data summary.",
          "examples": [
            "```tsx\n<LineChart\n  title=\"Weekly visits\"\n  labels={['Mon', 'Tue', 'Wed']}\n  series={[{ label: 'Visits', values: [120, 156, 142] }]}\n/>\n```"
          ],
          "propsType": "LineChartProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Figure caption displayed above the chart.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "labels",
              "type": "string[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered category or time labels shared by every series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "series",
              "type": "LineChartSeries[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "One or more line series. Each series must contain one value per label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "LineChartSeries",
                  "definition": "export interface LineChartSeries {\n  /** Text identifying this line in the legend. */\n  label: string;\n  /** Finite numeric values, one for each chart label. */\n  values: number[];\n  /** Optional CSS color for the line and points. */\n  color?: string;\n}",
                  "description": "One named line whose values align with the chart's labels.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/line-chart.tsx"
                }
              ]
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats values in the accessible data summary and axis.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/line-chart.tsx",
          "description": "Renders one or more time series with React Native SVG and a readable text data summary.",
          "examples": [
            "<LineChart title=\"Weekly visits\" labels={['Mon', 'Tue', 'Wed']} series={[{ label: 'Visits', values: [120, 156, 142] }]} />"
          ],
          "propsType": "LineChartProps",
          "extends": [],
          "props": [
            {
              "name": "title",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Chart heading.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "labels",
              "type": "string[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Ordered category or time labels shared by every series.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "series",
              "type": "LineChartSeries[]",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "One or more line series. Each series must contain one value per label.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": [
                {
                  "name": "LineChartSeries",
                  "definition": "export interface LineChartSeries {\n  /** Text identifying this line in the legend. */\n  label: string;\n  /** Finite numeric values, one for each chart label. */\n  values: number[];\n  /** Optional line and point color. */\n  color?: string;\n}",
                  "description": "One named line whose values align with the chart's labels.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/line-chart.tsx"
                }
              ]
            },
            {
              "name": "formatValue",
              "type": "((value: number) => string) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "String",
              "description": "Formats values in the accessible data summary and axis.",
              "documentedDefault": "String",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for chart text, grid lines, and default series colors.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the chart container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "MetricCard",
      "slug": "metric-card",
      "category": "Data display",
      "description": "Presents a key metric with optional change, comparison period, and supporting context.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { MetricCard } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <MetricCard label=\"Example label\" value=\"$24.8k\" />\n  );\n}",
        "customization": {
          "web": "import { MetricCard } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <MetricCard label=\"Example label\" value=\"$24.8k\" trend=\"positive\" />\n  );\n}",
          "native": "import { MetricCard } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <MetricCard label=\"Example label\" value=\"$24.8k\" theme=\"dark\" />\n  );\n}"
        },
        "native": "import { MetricCard } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <MetricCard label=\"Example label\" value=\"$24.8k\" />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/metric-card.tsx",
          "description": "Presents a key metric with optional change, comparison period, and supporting context.",
          "examples": [
            "```tsx\n<MetricCard label=\"Monthly visits\" value=\"24,815\" change=\"+8.2%\" trend=\"positive\" comparison=\"vs. previous 30 days\" />\n```"
          ],
          "propsType": "MetricCardProps",
          "extends": [
            "React.HTMLAttributes<HTMLElement>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Short name for the metric.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "string | number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Preformatted value or number displayed as the primary figure.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "change",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional change text, such as `+8.2%`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "trend",
              "type": "MetricTrend | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Direction of the change; the text remains available independently of color.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "positive",
                "negative",
                "neutral"
              ],
              "relatedTypes": [
                {
                  "name": "MetricTrend",
                  "definition": "export type MetricTrend = 'positive' | 'negative' | 'neutral';",
                  "description": "Direction used to style and describe a metric's change.",
                  "examples": [],
                  "sourcePath": "packages/react/src/components/metric-card.tsx"
                }
              ]
            },
            {
              "name": "comparison",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Context for the change, such as `vs. previous 30 days`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text below the value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/metric-card.tsx",
          "description": "Presents a key metric with optional change, comparison period, and supporting context.",
          "examples": [
            "<MetricCard label=\"Monthly visits\" value=\"24,815\" change=\"+8.2%\" trend=\"positive\" comparison=\"vs. previous 30 days\" />"
          ],
          "propsType": "MetricCardProps",
          "extends": [],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Short name for the metric.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "string | number",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Preformatted value or number displayed as the primary figure.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "change",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional change text, such as `+8.2%`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "trend",
              "type": "MetricTrend | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'neutral'",
              "description": "Direction of the change; the text remains available independently of color.",
              "documentedDefault": "'neutral'",
              "allowedValues": [
                "neutral",
                "positive",
                "negative"
              ],
              "relatedTypes": [
                {
                  "name": "MetricTrend",
                  "definition": "export type MetricTrend = 'positive' | 'negative' | 'neutral';",
                  "description": "Direction used to style and describe a metric's change.",
                  "examples": [],
                  "sourcePath": "packages/react-native/src/components/metric-card.tsx"
                }
              ]
            },
            {
              "name": "comparison",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Context for the change, such as `vs. previous 30 days`.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "description",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Optional supporting text below the value.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the card text and status color.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the card container.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "MarkdownEditor",
      "slug": "markdown-editor",
      "category": "Advanced",
      "description": "Renders a controlled markdown textarea with spell checking enabled and, optionally, a parsed preview.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { MarkdownEditor } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <MarkdownEditor label=\"Example label\" value=\"team\" onValueChange={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { MarkdownEditor } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <MarkdownEditor label=\"Example label\" value=\"team\" onValueChange={() => {}} preview={true} />\n  );\n}",
          "native": "import { MarkdownEditor } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <MarkdownEditor label=\"Example label\" value=\"team\" onValueChange={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { MarkdownEditor } from '@qzlcorp/react-native';\n\nexport function Example() {\n  return (\n    <MarkdownEditor label=\"Example label\" value=\"team\" onValueChange={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/markdown-editor.tsx",
          "description": "Renders a controlled markdown textarea with spell checking enabled and, optionally, a parsed preview.",
          "examples": [
            "```tsx\n<MarkdownEditor label=\"Description\" value={text} onValueChange={setText} preview />\n```"
          ],
          "propsType": "MarkdownEditorProps",
          "extends": [
            "Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label associated with the editing textarea.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current markdown source text.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called whenever the textarea's source text changes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "preview",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Show a rendered preview of the parsed source beneath the editor.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "native": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native",
          "sourcePath": "packages/react-native/src/components/markdown-editor.tsx",
          "description": "Provides a controlled multiline React Native editor and an optional parsed-text preview.",
          "examples": [
            "<MarkdownEditor label=\"Notes\" value={notes} onValueChange={setNotes} preview />"
          ],
          "propsType": "MarkdownEditorProps",
          "extends": [
            "Omit<TextInputProps, 'value' | 'onChangeText' | 'multiline'>"
          ],
          "props": [
            {
              "name": "label",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Visible label and accessibility label for the text input.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "value",
              "type": "string",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Current Markdown source string.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onValueChange",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called whenever the React Native text input changes.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "preview",
              "type": "boolean | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "false",
              "description": "Shows a lightweight React Native text rendering of parsed Markdown blocks.",
              "documentedDefault": "false",
              "allowedValues": [
                false,
                true
              ],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the input and preview.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the wrapper containing the label, input, and optional preview.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "inputStyle",
              "type": "StyleProp<TextStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Additional style applied to the React Native text input.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        }
      }
    },
    {
      "name": "QrScanner",
      "slug": "qr-scanner",
      "category": "Advanced",
      "description": "Renders an opt-in camera scanner using the browser BarcodeDetector API for QR codes.\nCamera access begins only after the user activates the start control.",
      "status": "beta",
      "preview": true,
      "examples": {
        "web": "import { QrScanner } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <QrScanner onScan={() => {}} />\n  );\n}",
        "customization": {
          "web": "import { QrScanner } from '@qzlcorp/react';\nimport '@qzlcorp/react/styles.css';\n\nexport function Example() {\n  return (\n    <QrScanner onScan={() => {}} className=\"custom-example\" />\n  );\n}",
          "native": "import { QrScanner } from '@qzlcorp/react-native/expo/qr-scanner';\n\nexport function Example() {\n  return (\n    <QrScanner onScan={() => {}} theme=\"dark\" />\n  );\n}"
        },
        "native": "import { QrScanner } from '@qzlcorp/react-native/expo/qr-scanner';\n\nexport function Example() {\n  return (\n    <QrScanner onScan={() => {}} />\n  );\n}"
      },
      "platforms": {
        "web": {
          "platform": "web",
          "packageName": "@qzlcorp/react",
          "importPath": "@qzlcorp/react",
          "sourcePath": "packages/react/src/components/qr-scanner.tsx",
          "description": "Renders an opt-in camera scanner using the browser BarcodeDetector API for QR codes.\nCamera access begins only after the user activates the start control.",
          "examples": [
            "```tsx\n<QrScanner onScan={(value) => setScannedValue(value)} onScanError={reportError} />\n```"
          ],
          "propsType": "QrScannerProps",
          "extends": [
            "React.HTMLAttributes<HTMLDivElement>"
          ],
          "props": [
            {
              "name": "onScan",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called once a QR code value is detected.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "onScanError",
              "type": "((error: Error) => void) | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Called when camera setup or QR detection fails.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'QR code scanner'",
              "description": "Accessible name used for the camera preview.",
              "documentedDefault": "'QR code scanner'",
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0"
        },
        "nativeOptional": {
          "platform": "native",
          "packageName": "@qzlcorp/react-native",
          "importPath": "@qzlcorp/react-native/expo/qr-scanner",
          "sourcePath": "packages/react-native/src/expo/qr-scanner.tsx",
          "description": "Starts Expo Camera only after the user presses the scan button, requesting permission when needed.\nThe React Native camera preview is restricted to QR codes; decoded content is passed to the app without opening it.",
          "examples": [
            "<QrScanner onScan={(value) => setScannedCode(value)} />"
          ],
          "propsType": "QrScannerProps",
          "extends": [],
          "props": [
            {
              "name": "onScan",
              "type": "(value: string) => void",
              "optional": false,
              "required": true,
              "defaultValue": null,
              "description": "Called once a QR barcode is read; the scanner is stopped before invocation.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "label",
              "type": "string | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'QR code scanner'",
              "description": "Accessible label for the camera preview.",
              "documentedDefault": "'QR code scanner'",
              "allowedValues": [],
              "relatedTypes": []
            },
            {
              "name": "theme",
              "type": "\"light\" | \"dark\" | undefined",
              "optional": true,
              "required": false,
              "defaultValue": "'light'",
              "description": "Palette used for the scanner controls and status text.",
              "documentedDefault": "'light'",
              "allowedValues": [
                "light",
                "dark"
              ],
              "relatedTypes": []
            },
            {
              "name": "style",
              "type": "StyleProp<ViewStyle> | undefined",
              "optional": true,
              "required": false,
              "defaultValue": null,
              "description": "Style applied to the scanner wrapper.",
              "documentedDefault": null,
              "allowedValues": [],
              "relatedTypes": []
            }
          ],
          "version": "0.2.0-beta.0",
          "dependencies": [
            "expo-camera"
          ]
        }
      }
    }
  ]
};
