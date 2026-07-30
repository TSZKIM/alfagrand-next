"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

interface SearchEntry {
  model: string;
  series: string;
  seriesSlug: string;
  category: string;
  powerHP?: string;
  powerKW?: string;
  maxHead?: string;
  maxFlow?: string;
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [allData, setAllData] = useState<SearchEntry[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load search index
  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data) => setAllData(data))
      .catch(() => {});
  }, []);

  // Keyboard shortcut + custom event
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openHandler = () => setOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("open-search", openHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-search", openHandler);
    };
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIdx(0);
    }
  }, [open]);

  // Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allData
      .filter(
        (e) =>
          e.model.toLowerCase().includes(q) ||
          e.series.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.powerHP && e.powerHP.includes(q)) ||
          (e.powerKW && e.powerKW.includes(q))
      )
      .slice(0, 20);
    setResults(filtered);
    setSelectedIdx(0);
  }, [query, allData]);

  // Keyboard navigation in results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIdx]) {
        const entry = results[selectedIdx];
        window.location.href = entry.series
          ? `/products/${entry.seriesSlug}`
          : `/products/${entry.seriesSlug}`;
        setOpen(false);
      }
    },
    [results, selectedIdx]
  );

  if (!open) return null;

  const getHref = (entry: SearchEntry) => {
    return entry.series
      ? `/products/${entry.seriesSlug}`
      : `/products/${entry.seriesSlug}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-bg-card border border-border-emphasis rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border-subtle">
          <Search size={18} className="text-text-tertiary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search models, series, categories... (e.g. "PM16A")'
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-text-tertiary/60"
          />
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-text-tertiary bg-bg-elevated border border-border-subtle rounded px-1.5 py-0.5">
            <span>ESC</span>
          </kbd>
          <button
            onClick={() => setOpen(false)}
            className="text-text-tertiary hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
          {!query.trim() && (
            <div className="px-5 py-10 text-center text-text-tertiary text-sm">
              <Zap size={28} className="mx-auto mb-3 text-border-emphasis" />
              <p>Search across {allData.length} water pump models</p>
              <p className="text-xs mt-1">Tip: try model number, series name, or category</p>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="px-5 py-10 text-center text-text-tertiary text-sm">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {results.map((entry, i) => (
            <Link
              key={`${entry.seriesSlug}-${entry.model}`}
              href={getHref(entry)}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 px-5 py-3.5 border-b border-border-subtle/50 transition-colors ${
                i === selectedIdx
                  ? "bg-accent-cyan/10 border-l-2 border-l-accent-cyan"
                  : "hover:bg-bg-elevated/50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold truncate">
                    {entry.model}
                  </span>
                  <span className="text-[10px] text-text-tertiary bg-bg-elevated border border-border-subtle rounded px-1.5 py-0.5 shrink-0">
                    {entry.category}
                  </span>
                </div>
                {entry.series && (
                  <p className="text-xs text-text-tertiary mt-0.5 truncate">{entry.series}</p>
                )}
                <div className="flex gap-3 mt-1 text-[10px] text-text-tertiary/70">
                  {entry.maxHead && <span>Head: {entry.maxHead}m</span>}
                  {entry.maxFlow && <span>Flow: {entry.maxFlow}</span>}
                  {entry.powerHP && <span>{entry.powerHP}HP</span>}
                </div>
              </div>
              <ArrowRight size={14} className="text-text-tertiary shrink-0" />
            </Link>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-border-subtle flex items-center gap-4 text-[10px] text-text-tertiary/60">
          <span>
            <kbd className="bg-bg-elevated border border-border-subtle rounded px-1 py-0.5">↑↓</kbd> Navigate
          </span>
          <span>
            <kbd className="bg-bg-elevated border border-border-subtle rounded px-1 py-0.5">↵</kbd> Open
          </span>
          <span>
            <kbd className="bg-bg-elevated border border-border-subtle rounded px-1 py-0.5">Esc</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
