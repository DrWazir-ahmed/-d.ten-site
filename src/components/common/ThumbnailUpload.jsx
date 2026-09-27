import React, { useState, useRef, useCallback } from 'react';
import { Upload, Link, X, ImageIcon, Check, RotateCcw } from 'lucide-react';

/**
 * ThumbnailUpload — reusable thumbnail picker for Admin forms.
 *
 * Props:
 *   value        {string}   current thumbnail URL (remote URL or base64 data:)
 *   onChange     {fn}       called with new URL/base64 string
 *   label        {string}   field label text
 *   placeholder  {string}   placeholder for URL input
 *   aspectRatio  {string}   CSS aspect-ratio for the preview (default "16/9")
 *   maxSizeMB    {number}   max upload size in MB (default 2)
 *   accentColor  {string}   Tailwind colour prefix for active states (default 'brand')
 */
export const ThumbnailUpload = ({
  value = '',
  onChange,
  label = 'Thumbnail Image',
  placeholder = 'https://example.com/image.jpg',
  aspectRatio = '16/9',
  maxSizeMB = 2,
  accentColor = 'brand',
}) => {
  const [mode, setMode] = useState(value?.startsWith('data:') ? 'upload' : 'url');
  const [urlInput, setUrlInput] = useState(value?.startsWith('data:') ? '' : (value || ''));
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Process a File object → base64 data URL
  const processFile = useCallback((file) => {
    setError('');
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP, GIF, SVG).');
      return;
    }

    // Validate size
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > maxSizeMB) {
      setError(`Image too large. Max size is ${maxSizeMB} MB (current: ${sizeMB.toFixed(1)} MB).`);
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      onChange(dataUrl);
      setUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }, [maxSizeMB, onChange]);

  // Drag handlers
  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // File input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset input so same file can be re-selected
    e.target.value = '';
  };

  // URL input confirm
  const handleUrlApply = () => {
    setError('');
    const trimmed = urlInput.trim();
    if (!trimmed) { onChange(''); return; }
    // Basic URL validation
    try {
      new URL(trimmed);
      onChange(trimmed);
    } catch {
      setError('Invalid URL format. Must start with http:// or https://');
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setError('');
  };

  const hasImage = Boolean(value);

  return (
    <div className="space-y-2 text-xs sm:text-sm">
      {/* Label */}
      <label className="font-semibold text-slate-700 dark:text-slate-300 block">
        {label}
      </label>

      {/* Mode toggle */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition ${
            mode === 'upload'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Upload className="w-3 h-3" />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition ${
            mode === 'url'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Link className="w-3 h-3" />
          Image URL
        </button>
      </div>

      {/* Upload mode */}
      {mode === 'upload' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl cursor-pointer transition select-none ${
            dragging
              ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
          style={{ minHeight: '90px' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-1 py-4">
              <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-400 text-xs">Processing…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 py-4 px-4 text-center pointer-events-none">
              <Upload className="w-5 h-5 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Drag & drop or <span className="text-brand-600 dark:text-brand-400 font-bold">browse</span>
              </p>
              <p className="text-slate-400 text-[10px]">
                JPG, PNG, WebP, GIF · max {maxSizeMB} MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL mode */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlApply())}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="button"
            onClick={handleUrlApply}
            className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            Apply
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs font-semibold flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* Preview */}
      {hasImage && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group">
          <div style={{ aspectRatio }}>
            <img
              src={value}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
              onError={() => setError('Image failed to load. Check URL or try a different image.')}
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition"
            >
              <RotateCcw className="w-3 h-3" /> Remove
            </button>
          </div>
          {/* Size badge */}
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md flex items-center gap-1">
            <Check className="w-2.5 h-2.5" /> Set
          </div>
        </div>
      )}

      {/* Empty placeholder */}
      {!hasImage && (
        <div
          className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/30"
          style={{ aspectRatio, minHeight: '60px' }}
        >
          <div className="flex flex-col items-center gap-1 text-center py-3">
            <ImageIcon className="w-6 h-6 opacity-40" />
            <span className="text-[11px] opacity-60">No image set</span>
          </div>
        </div>
      )}
    </div>
  );
};
