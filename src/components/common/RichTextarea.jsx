import React, { useRef, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link as LinkIcon, 
  Eye, 
  Edit3, 
  CheckSquare,
  Sparkles,
  Eraser,
  Table as TableIcon,
  Image as ImageIcon
} from 'lucide-react';
import { FormattedText } from './FormattedText';

export const RichTextarea = ({
  value = '',
  onChange,
  placeholder = 'Write content here...',
  rows = 4,
  label,
  className = '',
  required = false
}) => {
  const textareaRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);

  // Apply wrapper format (e.g. **bold**, *italic*, `code`)
  const applyFormat = (prefix, suffix = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';
    const hasSelection = start !== end;
    const selectedText = hasSelection ? currentVal.substring(start, end) : defaultText;

    const before = currentVal.substring(0, start);
    const after = currentVal.substring(end);

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newVal = `${before}${replacement}${after}`;

    textarea.value = newVal;

    if (onChange) {
      onChange({ target: { value: newVal } });
    }

    // Set selection inside or over the formatted word
    const newSelStart = start + prefix.length;
    const newSelEnd = newSelStart + selectedText.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelStart, newSelEnd);
    }, 0);
  };

  // Line-based format (Headings, Bullet list, Checklist, Quote)
  const applyLineFormat = (prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';

    let newVal = '';
    let newSelStart = start;
    let newSelEnd = end;

    if (start !== end) {
      const selected = currentVal.substring(start, end);
      const lines = selected.split('\n');
      const formatted = lines.map(line => `${prefix} ${line.replace(/^[-*•\d.]+\s*/, '')}`).join('\n');
      newVal = currentVal.substring(0, start) + formatted + currentVal.substring(end);
      newSelStart = start;
      newSelEnd = start + formatted.length;
    } else {
      // Find start of current line
      const lineStart = currentVal.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = currentVal.indexOf('\n', start);
      const actualEnd = lineEnd === -1 ? currentVal.length : lineEnd;
      const lineContent = currentVal.substring(lineStart, actualEnd);

      const cleanLine = lineContent.replace(/^[-*•\d.]+\s*/, '');
      const formattedLine = `${prefix} ${cleanLine}`;

      newVal = currentVal.substring(0, lineStart) + formattedLine + currentVal.substring(actualEnd);
      newSelStart = lineStart + formattedLine.length;
      newSelEnd = newSelStart;
    }

    textarea.value = newVal;
    if (onChange) onChange({ target: { value: newVal } });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelStart, newSelEnd);
    }, 0);
  };

  // Numbered list format (1. 2. 3.)
  const applyNumberedList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';

    let newVal = '';
    let newSelStart = start;
    let newSelEnd = end;

    if (start !== end) {
      const selected = currentVal.substring(start, end);
      const lines = selected.split('\n');
      const formatted = lines.map((line, i) => `${i + 1}. ${line.replace(/^[-*•\d.]+\s*/, '')}`).join('\n');
      newVal = currentVal.substring(0, start) + formatted + currentVal.substring(end);
      newSelStart = start;
      newSelEnd = start + formatted.length;
    } else {
      const lineStart = currentVal.lastIndexOf('\n', start - 1) + 1;
      const lineEnd = currentVal.indexOf('\n', start);
      const actualEnd = lineEnd === -1 ? currentVal.length : lineEnd;
      const lineContent = currentVal.substring(lineStart, actualEnd);

      const cleanLine = lineContent.replace(/^[-*•\d.]+\s*/, '');
      const formattedLine = `1. ${cleanLine}`;

      newVal = currentVal.substring(0, lineStart) + formattedLine + currentVal.substring(actualEnd);
      newSelStart = lineStart + formattedLine.length;
      newSelEnd = newSelStart;
    }

    textarea.value = newVal;
    if (onChange) onChange({ target: { value: newVal } });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelStart, newSelEnd);
    }, 0);
  };

  // Code block format (``` ... ```)
  const applyCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';
    const selected = currentVal.substring(start, end) || '// write code or notes here';

    const insert = `\n\`\`\`\n${selected}\n\`\`\`\n`;
    const newVal = currentVal.substring(0, start) + insert + currentVal.substring(end);

    textarea.value = newVal;
    if (onChange) onChange({ target: { value: newVal } });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 5, start + 5 + selected.length);
    }, 0);
  };

  // Link format
  const applyLink = () => {
    const url = window.prompt('Enter link destination URL (https://...):', 'https://');
    if (!url) return;
    applyFormat('[', `](${url})`, 'Link Text');
  };

  // Table format
  const applyTable = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';

    const tableTemplate = 
`\n| Column 1 | Column 2 | Column 3 |
| :--- | :--- | :--- |
| Row 1 Data | Description | Active |
| Row 2 Data | Details | Completed |\n`;

    const newVal = currentVal.substring(0, start) + tableTemplate + currentVal.substring(end);

    textarea.value = newVal;
    if (onChange) onChange({ target: { value: newVal } });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tableTemplate.length, start + tableTemplate.length);
    }, 0);
  };

  // Photo / Image format
  const applyImage = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const url = window.prompt('Enter Image URL (e.g., https://... or /image.png):', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop');
    if (!url || !url.trim()) return;

    const alt = window.prompt('Enter image description or caption:', 'Educational Diagram') || 'Image';

    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const currentVal = textarea.value || '';

    const imageTemplate = `\n![${alt.trim()}](${url.trim()})\n`;
    const newVal = currentVal.substring(0, start) + imageTemplate + currentVal.substring(end);

    textarea.value = newVal;
    if (onChange) onChange({ target: { value: newVal } });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + imageTemplate.length, start + imageTemplate.length);
    }, 0);
  };

  // Keyboard shortcut handler
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      applyFormat('**', '**', 'bold text');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      applyFormat('*', '*', 'italic text');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      applyLink();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      applyFormat('  ', '', '');
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-normal">Markdown Supported (Ctrl+B, Ctrl+I, Ctrl+K)</span>
        </div>
      )}

      {/* Editor Container */}
      <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition">
        
        {/* Standard Text Formatting Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-1 p-1.5 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 select-none">
          
          <div className="flex flex-wrap items-center gap-0.5">
            {/* Bold */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat('**', '**', 'bold text')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition font-bold"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Italic */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat('*', '*', 'italic text')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition italic"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

            {/* Heading 2 */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyLineFormat('##')}
              className="px-1.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-black text-slate-800 dark:text-slate-200 transition"
              title="Heading 2 (## Section)"
            >
              H2
            </button>

            {/* Heading 3 */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyLineFormat('###')}
              className="px-1.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
              title="Heading 3 (### Subheading)"
            >
              H3
            </button>

            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

            {/* Bullet List */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyLineFormat('-')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Bullet List (- item)"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            {/* Numbered List */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applyNumberedList}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Numbered List (1. item)"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            {/* Checklist */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyLineFormat('- [ ]')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Checklist Task (- [ ] item)"
            >
              <CheckSquare className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

            {/* Blockquote */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyLineFormat('>')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Quote (> note)"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            {/* Code Snippet */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => applyFormat('`', '`', 'code')}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition font-mono text-xs"
              title="Inline Code (`code`)"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            {/* Code Block */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applyCodeBlock}
              className="px-1.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-200 transition"
              title="Multi-line Code Block (```)"
            >
              {'{ }'}
            </button>

            {/* Hyperlink */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applyLink}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Insert Link (Ctrl+K)"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>

            {/* Table */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applyTable}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Insert Table"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>

            {/* Photo / Image */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applyImage}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
              title="Insert Photo / Image"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Action: Live Rendered Preview Toggle */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsPreview(!isPreview)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              isPreview 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
            title="Toggle Live Rendered Preview"
          >
            {isPreview ? <Edit3 className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span>{isPreview ? 'Back to Edit' : 'Live Preview'}</span>
          </button>
        </div>

        {/* Input Area or Live Formatted Preview */}
        {isPreview ? (
          <div className="p-4 min-h-[110px] max-h-72 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40">
            {value && value.trim() ? (
              <FormattedText content={value} />
            ) : (
              <span className="text-xs text-slate-400 italic">No content to preview yet.</span>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={rows}
            required={required}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-3.5 text-xs sm:text-sm text-slate-900 dark:text-white bg-transparent border-0 focus:outline-none resize-y leading-relaxed font-sans"
          />
        )}
      </div>
    </div>
  );
};
