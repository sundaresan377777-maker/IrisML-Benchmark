import { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-mono font-bold text-white shadow-sm">
            ML
          </span>
          <span>IrisML Benchmark</span>
        </a>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            About
          </a>
          <a href="#dataset" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            Dataset
          </a>
          <a href="#models" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            Models
          </a>
          <a href="#evaluation" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            Evaluation
          </a>
          <a href="#workflow" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            Workflow
          </a>
          <a href="#playground" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            Playground
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#playground"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Play className="h-3 w-3 fill-current" />
            <span>Live Classifier</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-300">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              About Project
            </a>
            <a
              href="#dataset"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Dataset Features
            </a>
            <a
              href="#models"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Machine Learning Models
            </a>
            <a
              href="#evaluation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Performance Evaluation
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Project Workflow
            </a>
            <a
              href="#playground"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-blue-400"
            >
              Live Playground
            </a>
            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-800">
              <a
                href="#playground"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Open Live Classifier</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
