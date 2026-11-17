/** Supported application theme modes. */
export type ThemeMode = 'light' | 'dark';

/** Values exposed by the shared theme context. */
export interface ThemeContextValue {
  /** Current theme mode. */
  mode: ThemeMode;
  /** Switches the current theme mode. */
  toggleMode: () => void;
}

/** A block produced by {@link parseMarkdown}. */
export type MarkdownBlock =
  | {
      /** A Markdown heading with a supported level. */
      type: 'heading';
      /** Heading depth, limited to levels one through three. */
      level: 1 | 2 | 3;
      /** Heading content without the Markdown prefix. */
      text: string;
    }
  | {
      /** A plain text paragraph. */
      type: 'paragraph';
      /** Paragraph content with source line breaks preserved. */
      text: string;
    }
  | {
      /** A list containing unordered Markdown items. */
      type: 'list';
      /** List item content without the bullet marker. */
      items: string[];
    }
  | {
      /** A block quote. */
      type: 'quote';
      /** Quote content with source line breaks preserved. */
      text: string;
    }
  | {
      /** A fenced code block. */
      type: 'code';
      /** Language identifier from the opening fence, or an empty string. */
      language: string;
      /** Code content without the fences. */
      text: string;
    };

/**
 * Constrains a number to an inclusive range.
 * @param value - Number to constrain.
 * @param min - Inclusive lower bound.
 * @param max - Inclusive upper bound.
 * @returns The value clamped between `min` and `max`.
 * @example
 * ```ts
 * clamp(12, 0, 10); // 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Parses the supported Markdown subset into typed content blocks.
 *
 * Supports headings one through three, paragraphs, unordered lists, block quotes, and fenced code blocks.
 * @param source - Markdown source text.
 * @returns The parsed blocks in source order.
 * @example
 * ```ts
 * parseMarkdown('# Hello\n\nA paragraph');
 * ```
 */
export function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index])) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: 'code', language: fence[1], text: codeLines.join('\n') });
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length as 1 | 2 | 3, text: heading[2] });
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push({ type: 'list', items });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push({ type: 'quote', text: quoteLines.join('\n') });
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (
      index < lines.length
      && lines[index].trim()
      && !/^```/.test(lines[index])
      && !/^#{1,3}\s+/.test(lines[index])
      && !/^\s*[-*]\s+/.test(lines[index])
      && !/^>\s?/.test(lines[index])
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: 'paragraph', text: paragraphLines.join('\n') });
  }

  return blocks;
}

/**
 * Joins truthy class names with a single space.
 * @param classes - Class names and conditional values to combine.
 * @returns A space-separated class name string.
 * @example
 * ```ts
 * mergeClasses('button', isActive && 'button-active');
 * ```
 */
export function mergeClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Resolves the preferred theme mode from saved preference and system settings.
 *
 * During server rendering, returns `light`; in a browser, a valid saved preference takes precedence over the system preference.
 * @returns The preferred theme mode.
 * @default light during server rendering or when no preference is available.
 * @example
 * ```ts
 * const mode = getThemeModePreference();
 * ```
 */
export function getThemeModePreference(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('qzl-theme-mode');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
