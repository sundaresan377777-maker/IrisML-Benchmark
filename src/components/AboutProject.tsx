import { Target, CheckCircle2, Sliders, BarChart3 } from 'lucide-react';

export default function AboutProject() {
  return (
    <section id="about" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            01. Project Overview & Methodology
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
            Comparing Algorithmic Inductive Biases on Multi-Class Taxonomy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            This internship project investigates how two foundational classification paradigms perform on Fisher&apos;s Iris dataset: a parametric linear classifier (Logistic Regression) versus a non-parametric recursive splitting model (Decision Tree Classifier).
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Left Column: Core Objective & Taxonomic Challenge */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5 text-blue-400">
                <Target className="h-5 w-5" />
                <h3 className="text-base font-semibold text-white">Project Objective & Problem Formulation</h3>
              </div>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                The primary objective is to reliably map four continuous morphometric measurements (<span className="text-blue-300 font-mono text-xs">sepal length</span>, <span className="text-blue-300 font-mono text-xs">sepal width</span>, <span className="text-blue-300 font-mono text-xs">petal length</span>, and <span className="text-blue-300 font-mono text-xs">petal width</span>) into one of three distinct botanical taxa:
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-bold text-blue-400">
                    1
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-100">Iris Setosa</span>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Linearly separable from the others. Characterized by distinctly small petals (<span className="font-mono text-blue-300">petal length &lt; 2.5 cm</span>) and wider sepals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-600/20 text-xs font-bold text-cyan-400">
                    2
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-100">Iris Versicolor</span>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Intermediate petal dimensions. Exhibits slight feature overlap in the decision boundary with Virginica, providing a rigorous test for decision surface flexibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-400">
                    3
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-100">Iris Virginica</span>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Displays the largest petals and sepals. Demands multi-dimensional thresholding or weighted hyperplane separation to minimize misclassification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Internship Scope:</span> Implemented in Python 3.11 with Scikit-Learn; exportable metrics and reproducible pipeline code.
            </div>
          </div>

          {/* Right Column: Comparative Rationale & Pipeline Highlights */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-2.5 text-blue-400">
                <Sliders className="h-5 w-5" />
                <h3 className="text-base font-semibold text-white">Why Compare These Two Algorithms?</h3>
              </div>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                In machine learning benchmarking, selecting algorithms with contrasting inductive biases highlights trade-offs between interpretability, linearity, and boundary sharpness:
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-blue-300">Logistic Regression</h4>
                    <span className="text-xs font-mono text-slate-400">Parametric / Linear</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Estimates class probabilities using linear combinations of standardized features followed by a Softmax activation. Constrained to hyperplanes, it is robust against high variance and produces smooth, continuous confidence scores.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-cyan-300">Decision Tree Classifier</h4>
                    <span className="text-xs font-mono text-slate-400">Non-Parametric / Orthogonal</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Partitions the 4-dimensional feature space into axis-aligned hyperrectangles using greedy Gini impurity reduction. While fully white-box and scale-invariant, it requires depth constraints to prevent overfitting minor boundary anomalies.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero Data Leakage (StandardScaler)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <BarChart3 className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Macro & Weighted F1 Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
