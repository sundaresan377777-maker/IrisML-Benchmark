import { ArrowRight, Database, Cpu, Layers } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onPlaygroundClick: () => void;
}

export default function Hero({ onExploreClick, onPlaygroundClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 pt-16 pb-20 sm:pt-20 sm:pb-24">
      {/* Background technical grid accent */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Headline & Context */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            Machine Learning Internship Project · Empirical Study
          </div>
          
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-5xl text-balance">
            Multi-Class Benchmark Classification Pipeline Using Scikit-Learn
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed text-pretty">
            An end-to-end supervised machine learning benchmark evaluating linear decision boundaries against recursive tree partitioning. Implemented with Python and Scikit-Learn to classify three distinct botanical species on Fisher&apos;s Iris benchmark.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-md shadow-blue-900/30 whitespace-nowrap"
            >
              <span>Explore Benchmark Results</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onPlaygroundClick}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <span>Interactive Model Playground</span>
            </button>
          </div>

          {/* Unboxed Metadata with Typographic Separator */}
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Scikit-Learn 1.4+</span>
            <span aria-hidden="true">·</span>
            <span>Stratified 80/20 Holdout</span>
            <span aria-hidden="true">·</span>
            <span>StandardScaler Normalization</span>
            <span aria-hidden="true">·</span>
            <span>5-Fold Cross Validation</span>
          </div>
        </div>

        {/* 3 Summary Cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Dataset */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Fisher&apos;s Iris Dataset</h3>
                <p className="text-xs text-slate-400">150 Samples · 4 Continuous Features</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Standardized botanical benchmark collected by Edgar Anderson and analyzed by Ronald Fisher. Measures sepal and petal dimensions across three species.
            </p>
          </div>

          {/* Card 2: Algorithms */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">2 Benchmark Classifiers</h3>
                <p className="text-xs text-slate-400">Logistic Regression vs Decision Tree</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Compares a generalized linear model with L2 regularization against an orthogonal recursive partitioning tree constrained by Gini impurity and depth.
            </p>
          </div>

          {/* Card 3: Classification */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 border border-blue-800/60 text-blue-400">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Multi-Class Supervised</h3>
                <p className="text-xs text-slate-400">Setosa · Versicolor · Virginica</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Evaluates multi-class segregation where one class is linearly separable, while the remaining two exhibit non-linear feature overlap near the boundary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
