import React from 'react';
import { mergeClasses, parseMarkdown } from '@qzl/core';
import type { MarkdownBlock } from '@qzl/core';

/** Props for the controlled {@link MarkdownEditor}. */
export interface MarkdownEditorProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
  /** Visible label associated with the editing textarea. */
  label: string;
  /** Current markdown source text. */
  value: string;
  /**
   * Called whenever the textarea's source text changes.
   * @param value Updated markdown source.
   */
  onValueChange: (value: string) => void;
  /**
   * Show a rendered preview of the parsed source beneath the editor.
   * @default false
   */
  preview?: boolean;
}

function MarkdownPreview({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="qzl-markdown-editor__preview">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Heading = `h${block.level}` as 'h1' | 'h2' | 'h3';
          return <Heading key={index}>{block.text}</Heading>;
        }
        if (block.type === 'list') return <ul key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>;
        if (block.type === 'quote') return <blockquote key={index}>{block.text}</blockquote>;
        if (block.type === 'code') return <pre key={index}><code>{block.text}</code></pre>;
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}

/**
 * Renders a controlled markdown textarea with spell checking enabled and, optionally, a parsed preview.
 *
 * @example
 * ```tsx
 * <MarkdownEditor label="Description" value={text} onValueChange={setText} preview />
 * ```
 */
export function MarkdownEditor({ label, value, onValueChange, preview = false, className, ...props }: MarkdownEditorProps) {
  const blocks = parseMarkdown(value);

  return (
    <div className={mergeClasses('qzl-markdown-editor', className)}>
      <label>
        <span>{label}</span>
        <textarea
          {...props}
          className="qzl-markdown-editor__input"
          value={value}
          onChange={(event) => onValueChange(event.currentTarget.value)}
          spellCheck
        />
      </label>
      {preview && <section aria-label="Markdown preview"><MarkdownPreview blocks={blocks} /></section>}
    </div>
  );
}
