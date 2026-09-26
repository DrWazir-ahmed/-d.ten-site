import React from 'react';

/**
 * A lightweight, safe Markdown and Rich Text renderer
 * Parses headings, bold, italic, lists, quotes, inline code, code blocks, links, tables, and images.
 */
export const FormattedText = ({ content = '', className = '' }) => {
  if (!content) return null;

  // Sanitize slide numbers across all lessons automatically (e.g. "### Slide 1: Title" -> "### Title")
  const sanitizedContent = content
    .replace(/(#{1,4}\s*)Slide\s*\d+\s*[:.-]\s*/gi, '$1')
    .replace(/^Slide\s*\d+\s*[:.-]\s*/gim, '');

  // Split into lines/blocks
  const lines = sanitizedContent.split('\n');
  const elements = [];
  let currentList = null; // { type: 'ul' | 'ol', items: [] }
  let inCodeBlock = false;
  let codeBlockLines = [];

  const flushList = (key) => {
    if (!currentList) return null;
    const isOrdered = currentList.type === 'ol';
    const listElement = isOrdered ? (
      <ol key={key} className="list-decimal list-inside space-y-1.5 pl-2 my-2 text-slate-700 dark:text-slate-300">
        {currentList.items.map((it, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(it)}
          </li>
        ))}
      </ol>
    ) : (
      <ul key={key} className="list-disc list-inside space-y-1.5 pl-2 my-2 text-slate-700 dark:text-slate-300">
        {currentList.items.map((it, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(it)}
          </li>
        ))}
      </ul>
    );
    currentList = null;
    return listElement;
  };

  // Helper to parse inline markdown (images, links, bold, italic, code)
  const renderInline = (text) => {
    if (!text) return '';

    // Regex to match: ![alt](url), [title](url), `code`, **bold**, *italic*
    const tokens = [];
    let remaining = text;
    let keyIdx = 0;

    const inlineRegex = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__|___([^_]+)___)/;

    while (remaining) {
      const match = remaining.match(inlineRegex);
      if (!match) {
        tokens.push(remaining);
        break;
      }

      const matchIndex = match.index;
      if (matchIndex > 0) {
        tokens.push(remaining.substring(0, matchIndex));
      }

      const fullMatch = match[0];

      if (fullMatch.startsWith('![')) {
        // Image ![alt](url)
        const alt = match[2];
        const url = match[3];
        tokens.push(
          <span key={keyIdx++} className="inline-block my-2 max-w-full">
            <img
              src={url}
              alt={alt}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 max-h-96 w-auto object-cover shadow-sm inline-block"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80";
              }}
            />
            {alt && (
              <span className="block text-[11px] text-slate-400 mt-1 italic text-center">
                {alt}
              </span>
            )}
          </span>
        );
      } else if (fullMatch.startsWith('[') && fullMatch.includes('](')) {
        // Link [title](url)
        const title = match[4];
        const url = match[5];
        tokens.push(
          <a
            key={keyIdx++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
          >
            {title}
          </a>
        );
      } else if (fullMatch.startsWith('`')) {
        // Inline code
        const codeText = match[6];
        tokens.push(
          <code
            key={keyIdx++}
            className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-mono text-[0.9em]"
          >
            {codeText}
          </code>
        );
      } else if (fullMatch.startsWith('**') || (fullMatch.startsWith('__') && !fullMatch.startsWith('___'))) {
        // Bold
        const boldText = match[7] || match[9];
        tokens.push(
          <strong key={keyIdx++} className="font-bold text-slate-900 dark:text-white">
            {boldText}
          </strong>
        );
      } else if (fullMatch.startsWith('*') || fullMatch.startsWith('_')) {
        // Italic
        const italicText = match[8] || match[10];
        tokens.push(
          <em key={keyIdx++} className="italic text-slate-800 dark:text-slate-200">
            {italicText}
          </em>
        );
      }

      remaining = remaining.substring(matchIndex + fullMatch.length);
    }

    return tokens;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trimEnd();

    // Check code blocks ```
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <pre
            key={`code-${i}`}
            className="p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto my-3 border border-slate-800 leading-relaxed shadow-inner"
          >
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        // Flush any active list before starting code
        const flushed = flushList(`list-before-code-${i}`);
        if (flushed) elements.push(flushed);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Check for Markdown Table (| Header 1 | Header 2 |)
    if (line.startsWith('|') && line.endsWith('|')) {
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && nextLine.startsWith('|') && nextLine.includes('---')) {
        const flushed = flushList(`list-table-${i}`);
        if (flushed) elements.push(flushed);

        const headerCells = line
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        // Gather all following table row lines
        const rowLines = [];
        let j = i + 2;
        while (j < lines.length) {
          const rowLine = lines[j].trim();
          if (rowLine.startsWith('|') && rowLine.endsWith('|')) {
            const cells = rowLine
              .split('|')
              .slice(1, -1)
              .map((c) => c.trim());
            rowLines.push(cells);
            j++;
          } else {
            break;
          }
        }

        i = j - 1; // Advance loop to end of table

        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-white font-bold">
                <tr>
                  {headerCells.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-2.5 font-bold uppercase tracking-wider text-[11px]">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                {rowLines.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Check for Horizontal Rule (--- or ***)
    if (line === '---' || line === '***' || line === '___') {
      const flushed = flushList(`list-hr-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <hr key={`hr-${i}`} className="my-5 border-t border-slate-200 dark:border-slate-800/80" />
      );
      continue;
    }

    // Check for Headings
    if (line.startsWith('# ')) {
      const flushed = flushList(`list-h1-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <h2 key={i} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-5 mb-2 tracking-tight">
          {renderInline(line.substring(2))}
        </h2>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      const flushed = flushList(`list-h2-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
          {renderInline(line.substring(3))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      const flushed = flushList(`list-h3-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <h4 key={i} className="text-sm sm:text-base font-bold text-brand-600 dark:text-brand-400 mt-3 mb-1">
          {renderInline(line.substring(4))}
        </h4>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      const flushed = flushList(`list-h4-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <h5 key={i} className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2.5 mb-1">
          {renderInline(line.substring(5))}
        </h5>
      );
      continue;
    }

    // Blockquote >
    if (line.startsWith('> ') || line === '>') {
      const flushed = flushList(`list-quote-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(
        <blockquote
          key={i}
          className="p-3 my-2 border-l-4 border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 text-slate-700 dark:text-slate-300 italic rounded-r-xl leading-relaxed text-xs sm:text-sm"
        >
          {renderInline(line.substring(2))}
        </blockquote>
      );
      continue;
    }

    // Checklist Item - [ ] or - [x]
    if (line.startsWith('- [ ] ') || line.startsWith('- [x] ') || line.startsWith('- [X] ')) {
      const flushed = flushList(`list-chk-${i}`);
      if (flushed) elements.push(flushed);
      const isChecked = line.startsWith('- [x] ') || line.startsWith('- [X] ');
      const checkText = line.substring(6);
      elements.push(
        <div key={i} className="flex items-center gap-2.5 my-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            readOnly
            checked={isChecked}
            className="w-4 h-4 rounded text-brand-600 border-slate-300 dark:border-slate-700 focus:ring-0 cursor-default"
          />
          <span className={isChecked ? 'line-through text-slate-400' : ''}>
            {renderInline(checkText)}
          </span>
        </div>
      );
      continue;
    }

    // Bullet List - or *
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = line.substring(2);
      if (!currentList || currentList.type !== 'ul') {
        const flushed = flushList(`list-flush-${i}`);
        if (flushed) elements.push(flushed);
        currentList = { type: 'ul', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Numbered List 1. 2. 3.
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      const itemText = numMatch[2];
      if (!currentList || currentList.type !== 'ol') {
        const flushed = flushList(`list-flush-ol-${i}`);
        if (flushed) elements.push(flushed);
        currentList = { type: 'ol', items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      continue;
    }

    // Empty line: flush list and add spacing
    if (!line.trim()) {
      const flushed = flushList(`list-empty-${i}`);
      if (flushed) elements.push(flushed);
      elements.push(<div key={`sp-${i}`} className="h-2" />);
      continue;
    }

    // Standard paragraph line
    const flushed = flushList(`list-p-${i}`);
    if (flushed) elements.push(flushed);
    elements.push(
      <p key={i} className="leading-relaxed text-xs sm:text-sm text-slate-700 dark:text-slate-300 my-1">
        {renderInline(line)}
      </p>
    );
  }

  // Flush remaining list if any
  const finalFlushed = flushList('list-end');
  if (finalFlushed) elements.push(finalFlushed);

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
