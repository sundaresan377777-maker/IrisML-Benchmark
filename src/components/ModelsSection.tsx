import { useState } from 'react';
import { Cpu, GitBranch, Check, Zap, HelpCircle } from 'lucide-react';

export default function ModelsSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'hyperparameters' | 'math'>('overview');

  return (
    <section id="models" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Sub-navigation */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
              03. Model Architectures
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              Benchmark Classifiers Under Evaluation
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Analyzing two contrasting approaches: a convex parametric linear optimizer versus a greedy non-parametric recursive partition tree.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Architectural Overview
            </button>
            <button
              onClick={() => setActiveTab('hyperparameters')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'hyperparameters'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Scikit-Learn Parameters
            </button>
            <button
              onClick={() => setActiveTab('math')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'math'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mathematical Formulation
            </button>
          </div>
        </div>

        {/* 2 Attractive Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card 1: Logistic Regression */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm hover:border-blue-900/60 transition-all">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-950 border border-blue-800/80 text-blue-400">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Logistic Regression</h3>
                    <p className="text-xs font-mono text-slate-400">sklearn.linear_model.LogisticRegression</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-blue-400 border border-blue-800/60 bg-blue-950/60 px-2 py-0.5 rounded">
                  Linear / Convex
                </span>
              </div>

              {/* Dynamic Content by Tab */}
              {activeTab === 'overview' && (
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  <p className="leading-relaxed">
                    Logistic Regression is a foundational generalized linear model adapted for multi-class classification using the <strong className="text-white">Multinomial Cross-Entropy</strong> formulation. It computes a linear weighted sum of features for each class and maps them into a normalized probability distribution via the Softmax function.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-start gap-2 text-xs">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Convex Objective:</strong> Guarantees convergence to a global optimum without getting trapped in local minima.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Probabilistic Outputs:</strong> Supplies well-calibrated class posterior probabilities $P(Y=k|X)$.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Zap className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Requirement:</strong> Sensitive to feature magnitude; requires feature normalization (e.g. StandardScaler).</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hyperparameters' && (
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-blue-400">solver=&apos;lbfgs&apos;</span>
                    <p className="font-sans text-slate-400 mt-1">Limited-memory Broyden–Fletcher–Goldfarb–Shanno quasi-Newton algorithm for smooth unconstrained convex optimization.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-blue-400">max_iter=200</span>
                    <p className="font-sans text-slate-400 mt-1">Maximum number of optimization iterations to guarantee complete numerical convergence.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-blue-400">C=1.0 (L2 Penalty)</span>
                    <p className="font-sans text-slate-400 mt-1">Inverse of regularization strength; prevents feature weights from inflating on collinear measurements.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-blue-400">multi_class=&apos;multinomial&apos;</span>
                    <p className="font-sans text-slate-400 mt-1">Fits true multinomial loss rather than training three independent One-vs-Rest binary models.</p>
                  </div>
                </div>
              )}

              {activeTab === 'math' && (
                <div className="mt-6 space-y-3 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono">
                    <div className="text-slate-400 text-[11px] uppercase">Softmax Hypothesis</div>
                    <div className="mt-1 text-blue-300 text-sm">
                      P(Y = k | x) = exp(w_k^T x + b_k) / sum_j(exp(w_j^T x + b_j))
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono">
                    <div className="text-slate-400 text-[11px] uppercase">Cross-Entropy Loss with L2 Regularization</div>
                    <div className="mt-1 text-slate-200">
                      J(w) = - 1/N sum_i log P(y_i | x_i) + (1 / 2C) * sum_k ||w_k||^2
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Spec Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Decision Surface: <strong>Hyperplanes</strong></span>
              <span>Inference: <strong>O(p) Matrix Mult</strong></span>
            </div>
          </div>

          {/* Card 2: Decision Tree Classifier */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm hover:border-cyan-900/60 transition-all">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Decision Tree Classifier</h3>
                    <p className="text-xs font-mono text-slate-400">sklearn.tree.DecisionTreeClassifier</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 border border-cyan-800/60 bg-cyan-950/60 px-2 py-0.5 rounded">
                  Non-Parametric / Rule-Based
                </span>
              </div>

              {/* Dynamic Content by Tab */}
              {activeTab === 'overview' && (
                <div className="mt-6 space-y-4 text-sm text-slate-300">
                  <p className="leading-relaxed">
                    The Decision Tree Classifier constructs a tree model of decisions and their possible consequences by recursively evaluating orthogonal single-feature splits. At each node, it picks the feature and threshold that produces the greatest reduction in <strong className="text-white">Gini Impurity</strong>.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-start gap-2 text-xs">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>High Interpretability:</strong> Decisions can be traced directly as clear if-then rules matching human reasoning.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Scale Invariant:</strong> Unaffected by monotonic feature scaling or varying unit magnitudes.</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Zap className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Constraint:</strong> Prone to overfitting on small boundary samples; requires depth regularization (<span className="font-mono">max_depth=3</span>).</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hyperparameters' && (
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-cyan-400">criterion=&apos;gini&apos;</span>
                    <p className="font-sans text-slate-400 mt-1">Measures the probability of a randomly chosen element being incorrectly labeled if randomly assigned.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-cyan-400">max_depth=3</span>
                    <p className="font-sans text-slate-400 mt-1">Limits tree depth to three levels to balance high training accuracy with generalization power.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-cyan-400">min_samples_split=2</span>
                    <p className="font-sans text-slate-400 mt-1">Minimum number of samples required to initiate an internal node split.</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                    <span className="text-cyan-400">random_state=42</span>
                    <p className="font-sans text-slate-400 mt-1">Guarantees deterministic feature selection when split criteria achieve identical impurity gains.</p>
                  </div>
                </div>
              )}

              {activeTab === 'math' && (
                <div className="mt-6 space-y-3 text-xs">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono">
                    <div className="text-slate-400 text-[11px] uppercase">Gini Impurity Metric</div>
                    <div className="mt-1 text-cyan-300 text-sm">
                      I_G(t) = 1 - ∑ (p_k)²  [for k = 1, 2, 3]
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono">
                    <div className="text-slate-400 text-[11px] uppercase">Node Split Criterion (Information Gain)</div>
                    <div className="mt-1 text-slate-200">
                      ΔI_G = I_G(parent) - [ (N_L/N) · I_G(left) + (N_R/N) · I_G(right) ]
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Spec Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Decision Surface: <strong>Axis-Aligned Boxes</strong></span>
              <span>Inference: <strong>O(depth) Traversals</strong></span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Summary Comparison Strip */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            <HelpCircle className="h-4 w-4 text-blue-400" />
            <span>Key Inductive Bias Comparison</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3">
              <span className="text-slate-400">Feature Scaling Sensitivity:</span>
              <p className="mt-1 text-slate-200">
                <strong className="text-blue-400">Logistic:</strong> High (StandardScaler required).<br />
                <strong className="text-cyan-400">Tree:</strong> None (rank-order invariant).
              </p>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3">
              <span className="text-slate-400">Decision Boundary Shape:</span>
              <p className="mt-1 text-slate-200">
                <strong className="text-blue-400">Logistic:</strong> Smooth linear separating hyperplanes.<br />
                <strong className="text-cyan-400">Tree:</strong> Step-wise orthogonal hyperrectangles.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-slate-950 p-3">
              <span className="text-slate-400">Overfitting Vulnerability:</span>
              <p className="mt-1 text-slate-200">
                <strong className="text-blue-400">Logistic:</strong> Low (constrained by L2 penalty).<br />
                <strong className="text-cyan-400">Tree:</strong> Moderate to high if depth unconstrained.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
