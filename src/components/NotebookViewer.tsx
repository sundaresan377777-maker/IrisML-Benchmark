import { useState } from 'react';
import { Copy, Check, Code, Terminal, Download } from 'lucide-react';

const FULL_PYTHON_PIPELINE_CODE = `"""
Multi-Class Benchmark Classification Pipeline Using Scikit-Learn
Dataset: Fisher's Iris (1936)
Author: Machine Learning Intern
Description: End-to-end benchmark comparing Logistic Regression vs Decision Tree Classifier
"""

import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report

def run_benchmark():
    # 1. Dataset Loading
    iris = load_iris(as_frame=True)
    X = iris.data
    y = iris.target
    feature_names = iris.feature_names
    target_names = iris.target_names

    print(f"Loaded Iris dataset with {X.shape[0]} samples across {len(target_names)} classes.")

    # 2. Stratified Train-Test Split (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )
    print(f"Train samples: {len(X_train)} | Holdout test samples: {len(X_test)}")

    # 3. Feature Normalization (StandardScaler)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)  # Prevent data leakage

    # 4. Model 1: Multinomial Logistic Regression
    lr = LogisticRegression(
        solver='lbfgs',
        max_iter=200,
        multi_class='multinomial',
        random_state=42
    )
    lr.fit(X_train_scaled, y_train)

    # 5. Model 2: Constrained Decision Tree Classifier
    dt = DecisionTreeClassifier(
        criterion='gini',
        max_depth=3,
        random_state=42
    )
    dt.fit(X_train, y_train)

    # 6. Stratified 5-Fold Cross Validation
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    lr_cv = cross_val_score(lr, X_train_scaled, y_train, cv=cv, scoring='accuracy')
    dt_cv = cross_val_score(dt, X_train, y_train, cv=cv, scoring='accuracy')

    # 7. Model Evaluation on Holdout Test Partition
    y_pred_lr = lr.predict(X_test_scaled)
    y_pred_dt = dt.predict(X_test)

    # Metrics computation
    models = {
        "Logistic Regression": (y_pred_lr, lr_cv),
        "Decision Tree Classifier": (y_pred_dt, dt_cv),
    }

    print("\\n" + "="*50)
    print("BENCHMARK EVALUATION RESULTS")
    print("="*50)

    for name, (preds, cv_scores) in models.items():
        acc = accuracy_score(y_test, preds)
        prec = precision_score(y_test, preds, average='macro')
        rec = recall_score(y_test, preds, average='macro')
        f1 = f1_score(y_test, preds, average='macro')
        cm = confusion_matrix(y_test, preds)

        print(f"\\n--- {name} ---")
        print(f"Accuracy:       {acc * 100:.2f}%")
        print(f"Macro Precision:{prec * 100:.2f}%")
        print(f"Macro Recall:   {rec * 100:.2f}%")
        print(f"Macro F1-Score: {f1 * 100:.2f}%")
        print(f"5-Fold CV Mean: {cv_scores.mean() * 100:.2f}% (+/- {cv_scores.std() * 100:.2f}%)")
        print("\\nConfusion Matrix:\\n", cm)
        print("\\nClassification Report:\\n", classification_report(y_test, preds, target_names=target_names))

if __name__ == '__main__':
    run_benchmark()
`;

export default function NotebookViewer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_PYTHON_PIPELINE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([FULL_PYTHON_PIPELINE_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scikit_learn_iris_benchmark.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="notebook-code" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
              07. Python Scikit-Learn Source
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              Reproducible Benchmark Pipeline Script
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Complete standalone Python implementation reproducing all metrics, cross-validation distributions, and confusion matrices displayed in this dashboard.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-blue-400" />
              <span>Download .py</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Python Pipeline</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Container */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                scikit_learn_iris_benchmark.py
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Terminal className="h-3.5 w-3.5" />
              <span>Python 3.10+ · Scikit-Learn 1.4+</span>
            </div>
          </div>

          <pre className="p-5 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed max-h-[500px]">
            <code>{FULL_PYTHON_PIPELINE_CODE}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
