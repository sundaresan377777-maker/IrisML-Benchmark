import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, BarChart2, Filter } from 'lucide-react';
import { IRIS_DATASET, SPECIES_DETAILS, FEATURE_INFO, IrisSample } from '../data/irisData';

export default function DatasetSection() {
  const [selectedSpecies, setSelectedSpecies] = useState<'all' | 'setosa' | 'versicolor' | 'virginica'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStats, setShowStats] = useState(false);
  const pageSize = 10;

  // Filtered dataset
  const filteredData = useMemo(() => {
    return IRIS_DATASET.filter((sample: IrisSample) => {
      const matchesSpecies = selectedSpecies === 'all' || sample.species === selectedSpecies;
      const matchesSearch =
        searchQuery.trim() === '' ||
        sample.id.toString().includes(searchQuery) ||
        sample.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sample.sepalLength.toString().includes(searchQuery) ||
        sample.petalLength.toString().includes(searchQuery);
      return matchesSpecies && matchesSearch;
    });
  }, [selectedSpecies, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const handleSpeciesChange = (species: 'all' | 'setosa' | 'versicolor' | 'virginica') => {
    setSelectedSpecies(species);
    setCurrentPage(1);
  };

  return (
    <section id="dataset" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
            02. Benchmark Dataset
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
            Fisher&apos;s Iris (1936) Morphometric Distribution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Comprising 150 botanical specimens divided equally into 50 observations per taxon. Each observation records four continuous physical measurements in centimeters.
          </p>
        </div>

        {/* Feature Cards Grid (4 Features) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_INFO.map((feat) => (
            <div
              key={feat.key}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-white">{feat.label}</h3>
                <span className="text-xs font-mono text-slate-400">{feat.unit}</span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-blue-400 tabular-nums">
                  {feat.mean.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400">avg</span>
                <span className="text-xs font-mono text-slate-500 tabular-nums">
                  ± {feat.std.toFixed(2)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Min: {feat.min.toFixed(1)}</span>
                <span>Max: {feat.max.toFixed(1)}</span>
              </div>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Iris Species Showcase */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SPECIES_DETAILS.map((sp) => (
            <div
              key={sp.key}
              className="rounded-xl border border-slate-800 bg-slate-950/90 p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: sp.color }}
                aria-hidden="true"
              />
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">{sp.name}</h3>
                <span className="text-xs font-mono text-slate-400">{sp.sampleCount} specimens</span>
              </div>
              <p className="mt-1 text-xs italic text-slate-400 font-mono">{sp.scientificName}</p>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">{sp.description}</p>
              
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Sepal:</span>{' '}
                  <span className="text-slate-200 tabular-nums">{sp.avgSepalLength} × {sp.avgSepalWidth}</span>
                </div>
                <div>
                  <span className="text-slate-500">Petal:</span>{' '}
                  <span className="text-slate-200 tabular-nums">{sp.avgPetalLength} × {sp.avgPetalWidth}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-400 font-medium">
                {sp.separability}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Sample Dataset Table */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
          {/* Controls bar */}
          <div className="flex flex-col gap-4 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">Sample Dataset Table</span>
              <span className="text-xs text-slate-400 font-mono">({filteredData.length} records)</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                {(['all', 'setosa', 'versicolor', 'virginica'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSpeciesChange(key)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap ${
                      selectedSpecies === key
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search value..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-900 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none w-36 sm:w-44"
                />
              </div>

              {/* Toggle Stats */}
              <button
                onClick={() => setShowStats(!showStats)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  showStats
                    ? 'border-blue-600 bg-blue-950/40 text-blue-300'
                    : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <BarChart2 className="h-3.5 w-3.5" />
                <span>{showStats ? 'Hide Stats' : 'Summary Stats'}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Stats Box */}
          {showStats && (
            <div className="border-b border-slate-800 bg-slate-900/60 p-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Feature Descriptive Statistics (Standard Scikit-Learn Normalization Basis)
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {FEATURE_INFO.map((f) => (
                  <div key={f.key} className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs font-mono">
                    <span className="font-semibold text-slate-200">{f.label}</span>
                    <div className="mt-1 text-slate-400">Mean: <span className="text-blue-400 tabular-nums">{f.mean}</span></div>
                    <div className="text-slate-400">Std Dev: <span className="text-slate-200 tabular-nums">{f.std}</span></div>
                    <div className="text-slate-400">Range: <span className="text-slate-200 tabular-nums">{f.min} - {f.max}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3">Sample ID</th>
                  <th scope="col" className="px-4 py-3">Sepal Length (cm)</th>
                  <th scope="col" className="px-4 py-3">Sepal Width (cm)</th>
                  <th scope="col" className="px-4 py-3">Petal Length (cm)</th>
                  <th scope="col" className="px-4 py-3">Petal Width (cm)</th>
                  <th scope="col" className="px-4 py-3">Target Species</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No matching samples found for query &ldquo;{searchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((sample) => {
                    const speciesColor =
                      sample.species === 'setosa'
                        ? 'text-blue-400 bg-blue-950/40 border-blue-800/50'
                        : sample.species === 'versicolor'
                        ? 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50'
                        : 'text-purple-400 bg-purple-950/40 border-purple-800/50';

                    return (
                      <tr key={sample.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-slate-500 tabular-nums">#{sample.id}</td>
                        <td className="px-4 py-2.5 font-mono tabular-nums text-slate-200">{sample.sepalLength.toFixed(1)}</td>
                        <td className="px-4 py-2.5 font-mono tabular-nums text-slate-200">{sample.sepalWidth.toFixed(1)}</td>
                        <td className="px-4 py-2.5 font-mono tabular-nums text-slate-200">{sample.petalLength.toFixed(1)}</td>
                        <td className="px-4 py-2.5 font-mono tabular-nums text-slate-200">{sample.petalWidth.toFixed(1)}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-block rounded border px-2 py-0.5 text-xs font-medium capitalize ${speciesColor}`}>
                            Iris {sample.species}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3 text-xs text-slate-400">
            <span>
              Showing{' '}
              <strong className="text-slate-200 font-mono tabular-nums">
                {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-200 font-mono tabular-nums">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </strong>{' '}
              of <strong className="text-slate-200 font-mono tabular-nums">{filteredData.length}</strong> samples
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </button>
              <span className="font-mono px-2 text-slate-400">
                {currentPage} / {Math.max(1, totalPages)}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="inline-flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
