import { useState, useMemo } from 'react';
import { Sliders, Cpu, GitBranch, Sparkles, RefreshCw, Check } from 'lucide-react';
import { predictWithLogisticRegression, predictWithDecisionTree } from '../data/irisData';

interface SamplePreset {
  name: string;
  species: string;
  sl: number;
  sw: number;
  pl: number;
  pw: number;
  rationale: string;
}

const PRESETS: SamplePreset[] = [
  {
    name: 'Canonical Setosa',
    species: 'Iris Setosa',
    sl: 5.0,
    sw: 3.5,
    pl: 1.4,
    pw: 0.2,
    rationale: 'Demonstrates 100% linear separability with short petal length (< 2.45 cm).',
  },
  {
    name: 'Typical Versicolor',
    species: 'Iris Versicolor',
    sl: 5.9,
    sw: 2.8,
    pl: 4.2,
    pw: 1.3,
    rationale: 'Intermediate petal features comfortably residing in the Versicolor cluster.',
  },
  {
    name: 'Decision Boundary Edge',
    species: 'Versi / Virg Boundary',
    sl: 6.0,
    sw: 2.7,
    pl: 4.8,
    pw: 1.6,
    rationale: 'Ambiguous region near petal width 1.6-1.75 cm testing model inductive bias.',
  },
  {
    name: 'Robust Virginica',
    species: 'Iris Virginica',
    sl: 6.7,
    sw: 3.1,
    pl: 5.8,
    pw: 2.2,
    rationale: 'Substantial petal and sepal dimensions with overwhelming Virginica likelihood.',
  },
];

export default function InferencePlayground() {
  const [sepalLength, setSepalLength] = useState<number>(5.8);
  const [sepalWidth, setSepalWidth] = useState<number>(3.0);
  const [petalLength, setPetalLength] = useState<number>(4.2);
  const [petalWidth, setPetalWidth] = useState<number>(1.3);

  // Compute live mathematical inference
  const lrResult = useMemo(() => {
    return predictWithLogisticRegression(sepalLength, sepalWidth, petalLength, petalWidth);
  }, [sepalLength, sepalWidth, petalLength, petalWidth]);

  const dtResult = useMemo(() => {
    return predictWithDecisionTree(sepalLength, sepalWidth, petalLength, petalWidth);
  }, [sepalLength, sepalWidth, petalLength, petalWidth]);

  const applyPreset = (preset: SamplePreset) => {
    setSepalLength(preset.sl);
    setSepalWidth(preset.sw);
    setPetalLength(preset.pl);
    setPetalWidth(preset.pw);
  };

  const getSpeciesBadge = (species: string) => {
    if (species === 'setosa') return 'text-blue-400 bg-blue-950/60 border-blue-800/80';
    if (species === 'versicolor') return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80';
    return 'text-purple-400 bg-purple-950/60 border-purple-800/80';
  };

  return (
    <section id="playground" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            06. Interactive Classifier
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
            Real-Time Scikit-Learn Inference Engine
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Test arbitrary morphological measurements. This client-side engine executes the exact trained coefficients, feature standardization scales, and decision tree node criteria fitted by Scikit-Learn.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
            Test Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Sparkles className="h-3 w-3 text-blue-400" />
              <span>{p.name}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setSepalLength(5.8);
              setSepalWidth(3.0);
              setPetalLength(3.8);
              setPetalWidth(1.2);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors ml-auto"
            title="Reset to dataset average"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Averages</span>
          </button>
        </div>

        {/* Main 2-Column Split: Controls vs Results */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Sliders (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Input Feature Parameters</h3>
              </div>
              <span className="text-xs font-mono text-slate-500">4 Dimensions (cm)</span>
            </div>

            {/* Slider 1: Sepal Length */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans font-medium">Sepal Length</span>
                <span className="text-blue-400 font-bold tabular-nums">{sepalLength.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="4.3"
                max="7.9"
                step="0.1"
                value={sepalLength}
                onChange={(e) => setSepalLength(parseFloat(e.target.value))}
                className="w-full accent-blue-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>4.3 cm</span>
                <span>Avg: 5.8 cm</span>
                <span>7.9 cm</span>
              </div>
            </div>

            {/* Slider 2: Sepal Width */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans font-medium">Sepal Width</span>
                <span className="text-blue-400 font-bold tabular-nums">{sepalWidth.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.4"
                step="0.1"
                value={sepalWidth}
                onChange={(e) => setSepalWidth(parseFloat(e.target.value))}
                className="w-full accent-blue-600 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>2.0 cm</span>
                <span>Avg: 3.1 cm</span>
                <span>4.4 cm</span>
              </div>
            </div>

            {/* Slider 3: Petal Length */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans font-medium">Petal Length (Key Discriminant)</span>
                <span className="text-cyan-400 font-bold tabular-nums">{petalLength.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.9"
                step="0.1"
                value={petalLength}
                onChange={(e) => setPetalLength(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>1.0 cm</span>
                <span>Avg: 3.8 cm</span>
                <span>6.9 cm</span>
              </div>
            </div>

            {/* Slider 4: Petal Width */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-slate-300 font-sans font-medium">Petal Width</span>
                <span className="text-cyan-400 font-bold tabular-nums">{petalWidth.toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={petalWidth}
                onChange={(e) => setPetalWidth(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0.1 cm</span>
                <span>Avg: 1.2 cm</span>
                <span>2.5 cm</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              ⚡ Real-time calculation running locally in your browser.
            </div>
          </div>

          {/* Right Column: Comparative Prediction Output (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Output 1: Logistic Regression Result */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <h4 className="text-sm font-semibold text-white">Logistic Regression Verdict</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">Softmax Confidence</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400">Predicted Taxon:</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-sm font-bold capitalize ${getSpeciesBadge(lrResult.predictedClass)}`}>
                      <Check className="h-4 w-4" />
                      Iris {lrResult.predictedClass}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Primary Prob:{' '}
                  <strong className="text-white tabular-nums text-sm">
                    {lrResult.probabilities[lrResult.predictedClass]}%
                  </strong>
                </div>
              </div>

              {/* Probability Breakdown Bar */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Posterior Probability Distribution
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-center">
                    <div className="text-slate-400 text-[11px]">Setosa</div>
                    <div className="text-blue-400 font-bold tabular-nums mt-0.5">
                      {lrResult.probabilities.setosa}%
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-center">
                    <div className="text-slate-400 text-[11px]">Versicolor</div>
                    <div className="text-cyan-400 font-bold tabular-nums mt-0.5">
                      {lrResult.probabilities.versicolor}%
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-center">
                    <div className="text-slate-400 text-[11px]">Virginica</div>
                    <div className="text-purple-400 font-bold tabular-nums mt-0.5">
                      {lrResult.probabilities.virginica}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output 2: Decision Tree Classifier Result */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <GitBranch className="h-4 w-4 text-cyan-400" />
                  <h4 className="text-sm font-semibold text-white">Decision Tree Classifier Verdict</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">Tree Traversal</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-400">Predicted Taxon:</span>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-sm font-bold capitalize ${getSpeciesBadge(dtResult.predictedClass)}`}>
                      <Check className="h-4 w-4" />
                      Iris {dtResult.predictedClass}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Leaf Pureness:{' '}
                  <strong className="text-white tabular-nums text-sm">
                    {dtResult.probabilities[dtResult.predictedClass]}%
                  </strong>
                </div>
              </div>

              {/* Traversal Decision Path */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Decision Tree Split Branch Path
                </span>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs font-mono text-slate-300 space-y-1">
                  {dtResult.pathTaken.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-cyan-400">↳</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
