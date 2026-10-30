import { useState } from 'react';
import { ArrowRight, Copy, Check, Database, Filter, Gauge, Cpu, BarChart2, Zap } from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  shortLabel: string;
  icon: typeof Database;
  description: string;
  input: string;
  output: string;
  details: string[];
  pythonCode: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Dataset Acquisition',
    shortLabel: 'Dataset',
    icon: Database,
    description: 'Load the canonical 150-sample Iris dataset using scikit-learn datasets module into structured numpy arrays and pandas DataFrame.',
    input: 'Scikit-Learn built-in repository (load_iris)',
    output: 'Feature matrix X (150, 4) & Target array y (150,)',
    details: [
      'Checks for zero null/missing values across all rows',
      'Confirms 3-class balance: 50 Setosa, 50 Versicolor, 50 Virginica',
      'Extracts continuous features: Sepal Length/Width, Petal Length/Width',
    ],
    pythonCode: `from sklearn.datasets import load_iris
import pandas as pd

# Load dataset
iris = load_iris(as_frame=True)
df = iris.frame
X = df.drop(columns=['target'])
y = df['target']
print(f"Dataset shape: {X.shape}, Classes: {iris.target_names.tolist()}")`,
  },
  {
    id: 2,
    title: 'Data Preprocessing & Split',
    shortLabel: 'Preprocessing',
    icon: Filter,
    description: 'Split dataset into training (80%) and holdout test (20%) subsets with stratification to preserve exact class frequencies.',
    input: 'Full dataset X, y (150 samples)',
    output: 'X_train (120, 4), X_test (30, 4), y_train (120,), y_test (30,)',
    details: [
      'Preserves 40 train and 10 test samples per class using stratify=y',
      'Fixes random_state=42 for deterministic, reproducible results',
      'Keeps the test set untouched until final evaluation',
    ],
    pythonCode: `from sklearn.model_selection import train_test_split

# 80/20 Stratified train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.20,
    random_state=42,
    stratify=y
)
print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")`,
  },
  {
    id: 3,
    title: 'Feature Scaling (StandardScaler)',
    shortLabel: 'Feature Scaling',
    icon: Gauge,
    description: 'Transform features to zero mean (mu=0) and unit variance (sigma=1) to optimize gradient descent in Logistic Regression.',
    input: 'Unscaled X_train, X_test in centimeters',
    output: 'Z-score standardized matrices X_train_scaled, X_test_scaled',
    details: [
      'Fits scaler strictly on X_train to prevent test data leakage',
      'Transforms X_test using training statistics (mu_train, sigma_train)',
      'Ensures L2 regularization penalty treats all features equitably',
    ],
    pythonCode: `from sklearn.preprocessing import StandardScaler

# Initialize and fit scaler on training data only
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Verify zero mean and unit variance
print("Mean:", X_train_scaled.mean(axis=0).round(4))
print("Std:", X_train_scaled.std(axis=0).round(4))`,
  },
  {
    id: 4,
    title: 'Model Training & Validation',
    shortLabel: 'Model Training',
    icon: Cpu,
    description: 'Fit both Logistic Regression and Decision Tree models and estimate generalization stability via 5-Fold Stratified Cross-Validation.',
    input: 'X_train_scaled, y_train',
    output: 'Trained model estimators & cross-validation score distributions',
    details: [
      'LogisticRegression with L-BFGS solver, multinomial loss, max_iter=200',
      'DecisionTreeClassifier with max_depth=3 to prevent over-branching',
      'Computes 5-fold cross-validation accuracy on training partition',
    ],
    pythonCode: `from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

# 1. Logistic Regression
lr_model = LogisticRegression(solver='lbfgs', max_iter=200, random_state=42)
lr_model.fit(X_train_scaled, y_train)

# 2. Decision Tree Classifier
dt_model = DecisionTreeClassifier(max_depth=3, criterion='gini', random_state=42)
dt_model.fit(X_train, y_train)  # Trees are scale-invariant

# 5-Fold Stratified CV
lr_cv = cross_val_score(lr_model, X_train_scaled, y_train, cv=5)
dt_cv = cross_val_score(dt_model, X_train, y_train, cv=5)
print(f"LR CV Mean: {lr_cv.mean():.4f} | DT CV Mean: {dt_cv.mean():.4f}")`,
  },
  {
    id: 5,
    title: 'Performance Evaluation',
    shortLabel: 'Evaluation',
    icon: BarChart2,
    description: 'Evaluate test set predictions against ground truth labels using comprehensive multi-class metrics and confusion matrices.',
    input: 'X_test_scaled, X_test, y_test ground truth',
    output: 'Accuracy, Precision, Recall, F1-Score, Confusion Matrix',
    details: [
      'Evaluates macro-averaged precision, recall, and harmonic F1',
      'Calculates 3x3 confusion matrix to isolate inter-class confusion',
      'Performs per-class support validation (10 samples per taxon)',
    ],
    pythonCode: `from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Generate predictions
y_pred_lr = lr_model.predict(X_test_scaled)
y_pred_dt = dt_model.predict(X_test)

# Metrics
print("=== Logistic Regression Report ===")
print(classification_report(y_test, y_pred_lr, target_names=iris.target_names))
print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred_lr))

print("=== Decision Tree Report ===")
print(classification_report(y_test, y_pred_dt, target_names=iris.target_names))
print("Confusion Matrix:\\n", confusion_matrix(y_test, y_pred_dt))`,
  },
  {
    id: 6,
    title: 'Model Prediction & Inference',
    shortLabel: 'Prediction',
    icon: Zap,
    description: 'Deploy trained pipeline for unseen botanical sample classification, outputting predicted taxon and posterior confidence scores.',
    input: 'New measurement vector [sl, sw, pl, pw]',
    output: 'Predicted species label + Softmax class probability distribution',
    details: [
      'Standardizes incoming measurement vector via cached scaler',
      'Calls predict_proba() to extract calibrated confidence levels',
      'Provides human-readable taxonomic classification verdict',
    ],
    pythonCode: `# Inference on unseen floral specimen
sample = [[5.8, 2.7, 4.1, 1.0]]  # [sl, sw, pl, pw]

# Scale sample for Logistic Regression
sample_scaled = scaler.transform(sample)
pred_class_id = lr_model.predict(sample_scaled)[0]
pred_probs = lr_model.predict_proba(sample_scaled)[0]

print(f"Predicted Species: {iris.target_names[pred_class_id]}")
for name, prob in zip(iris.target_names, pred_probs):
    print(f"  {name}: {prob * 100:.2f}%")`,
  },
];

export default function WorkflowSection() {
  const [activeStepId, setActiveStepId] = useState(1);
  const [copied, setCopied] = useState(false);

  const activeStep = WORKFLOW_STEPS.find((s) => s.id === activeStepId) || WORKFLOW_STEPS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeStep.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="workflow" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            05. Architecture Pipeline
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
            Scikit-Learn End-to-End Workflow
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            A modular 6-stage machine learning pipeline following rigorous methodology: data isolation, scaler fitting, hyperparameter convergence, and cross-validated evaluation.
          </p>
        </div>

        {/* Visual Pipeline Progression Ribbon */}
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === activeStepId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'border-blue-500 bg-blue-950/40 shadow-sm shadow-blue-900/30 ring-1 ring-blue-500/50'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={isActive ? 'text-blue-400 font-bold' : 'text-slate-500'}>
                      0{step.id}
                    </span>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>
                  <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.shortLabel}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 truncate hidden sm:inline">
                    Step {step.id} of 6
                  </span>
                </button>
              );
            })}
          </div>

          {/* Connected Flow Indicator */}
          <div className="hidden lg:flex items-center justify-between mt-3 px-3 text-slate-600 text-xs font-mono">
            <span>Raw Data</span>
            <ArrowRight className="h-3 w-3" />
            <span>Partitioned</span>
            <ArrowRight className="h-3 w-3" />
            <span>Standardized</span>
            <ArrowRight className="h-3 w-3" />
            <span>Fitted</span>
            <ArrowRight className="h-3 w-3" />
            <span>Scored</span>
            <ArrowRight className="h-3 w-3" />
            <span>Inference</span>
          </div>
        </div>

        {/* Active Step Deep-Dive Panel */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Step info and details (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950 border border-blue-800/80 text-blue-400 text-xs font-mono font-bold">
                  0{activeStep.id}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeStep.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">Phase {activeStep.id} of 6</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Input / Output Tags */}
              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-500 uppercase text-[10px] block">Input Stream</span>
                  <span className="text-slate-200 mt-0.5 block">{activeStep.input}</span>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-500 uppercase text-[10px] block">Output Artifact</span>
                  <span className="text-blue-300 mt-0.5 block">{activeStep.output}</span>
                </div>
              </div>

              {/* Implementation checklist */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Technical Checklist
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                  {activeStep.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-400 font-mono">✓</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Python Scikit-Learn code block (7 cols) */}
            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>pipeline_step_{activeStep.id}.py</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  title="Copy Python Code"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
                <code>{activeStep.pythonCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
