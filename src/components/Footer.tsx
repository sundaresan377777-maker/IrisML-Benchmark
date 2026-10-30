import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-mono">
                ML
              </span>
              <span>Multi-Class Benchmark Classification Pipeline</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 max-w-lg">
              Empirical evaluation comparing Logistic Regression and Decision Tree Classifier inductive biases using Scikit-Learn and Fisher&apos;s Iris benchmark.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#dataset" className="hover:text-blue-400 transition-colors">Dataset</a>
            <a href="#models" className="hover:text-blue-400 transition-colors">Models</a>
            <a href="#evaluation" className="hover:text-blue-400 transition-colors">Evaluation</a>
            <a href="#workflow" className="hover:text-blue-400 transition-colors">Workflow</a>
            <a href="#playground" className="hover:text-blue-400 transition-colors">Playground</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-slate-500">
              Machine Learning Internship Submission · Built with React, Vite & Tailwind CSS.
            </p>
            <p className="text-slate-600">
              Evaluated on Scikit-Learn 1.4+ · Fisher&apos;s Iris Dataset (1936).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
