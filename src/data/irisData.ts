/**
 * Iris Dataset and Scikit-Learn Benchmark Results
 * Fisher's Iris Data (1936) & Scikit-Learn 1.4+ Evaluation Metrics
 */

export interface IrisSample {
  id: number;
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
  species: 'setosa' | 'versicolor' | 'virginica';
}

export interface MetricBreakdown {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  cvMean: number;
  cvStd: number;
  trainingTimeMs: number;
  confusionMatrix: number[][]; // 3x3 matrix: [row=True, col=Pred]
  classMetrics: {
    species: string;
    precision: number;
    recall: number;
    f1Score: number;
    support: number;
  }[];
}

// 150 genuine Fisher Iris samples
export const IRIS_DATASET: IrisSample[] = [
  // Setosa (Samples 1-50)
  { id: 1, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 2, sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 3, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 4, sepalLength: 4.6, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 5, sepalLength: 5.0, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 6, sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.7, petalWidth: 0.4, species: 'setosa' },
  { id: 7, sepalLength: 4.6, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },
  { id: 8, sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 9, sepalLength: 4.4, sepalWidth: 2.9, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 10, sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.1, species: 'setosa' },
  { id: 11, sepalLength: 5.4, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 12, sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { id: 13, sepalLength: 4.8, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.1, species: 'setosa' },
  { id: 14, sepalLength: 4.3, sepalWidth: 3.0, petalLength: 1.1, petalWidth: 0.1, species: 'setosa' },
  { id: 15, sepalLength: 5.8, sepalWidth: 4.0, petalLength: 1.2, petalWidth: 0.2, species: 'setosa' },
  { id: 16, sepalLength: 5.7, sepalWidth: 4.4, petalLength: 1.5, petalWidth: 0.4, species: 'setosa' },
  { id: 17, sepalLength: 5.4, sepalWidth: 3.9, petalLength: 1.3, petalWidth: 0.4, species: 'setosa' },
  { id: 18, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },
  { id: 19, sepalLength: 5.7, sepalWidth: 3.8, petalLength: 1.7, petalWidth: 0.3, species: 'setosa' },
  { id: 20, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.5, petalWidth: 0.3, species: 'setosa' },
  { id: 21, sepalLength: 5.4, sepalWidth: 3.4, petalLength: 1.7, petalWidth: 0.2, species: 'setosa' },
  { id: 22, sepalLength: 5.1, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.4, species: 'setosa' },
  { id: 23, sepalLength: 4.6, sepalWidth: 3.6, petalLength: 1.0, petalWidth: 0.2, species: 'setosa' },
  { id: 24, sepalLength: 5.1, sepalWidth: 3.3, petalLength: 1.7, petalWidth: 0.5, species: 'setosa' },
  { id: 25, sepalLength: 4.8, sepalWidth: 3.4, petalLength: 1.9, petalWidth: 0.2, species: 'setosa' },
  { id: 26, sepalLength: 5.0, sepalWidth: 3.0, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { id: 27, sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.6, petalWidth: 0.4, species: 'setosa' },
  { id: 28, sepalLength: 5.2, sepalWidth: 3.5, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 29, sepalLength: 5.2, sepalWidth: 3.4, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 30, sepalLength: 4.7, sepalWidth: 3.2, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { id: 31, sepalLength: 4.8, sepalWidth: 3.1, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { id: 32, sepalLength: 5.4, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.4, species: 'setosa' },
  { id: 33, sepalLength: 5.2, sepalWidth: 4.1, petalLength: 1.5, petalWidth: 0.1, species: 'setosa' },
  { id: 34, sepalLength: 5.5, sepalWidth: 4.2, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 35, sepalLength: 4.9, sepalWidth: 3.1, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 36, sepalLength: 5.0, sepalWidth: 3.2, petalLength: 1.2, petalWidth: 0.2, species: 'setosa' },
  { id: 37, sepalLength: 5.5, sepalWidth: 3.5, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 38, sepalLength: 4.9, sepalWidth: 3.6, petalLength: 1.4, petalWidth: 0.1, species: 'setosa' },
  { id: 39, sepalLength: 4.4, sepalWidth: 3.0, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 40, sepalLength: 5.1, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 41, sepalLength: 5.0, sepalWidth: 3.5, petalLength: 1.3, petalWidth: 0.3, species: 'setosa' },
  { id: 42, sepalLength: 4.5, sepalWidth: 2.3, petalLength: 1.3, petalWidth: 0.3, species: 'setosa' },
  { id: 43, sepalLength: 4.4, sepalWidth: 3.2, petalLength: 1.3, petalWidth: 0.2, species: 'setosa' },
  { id: 44, sepalLength: 5.0, sepalWidth: 3.5, petalLength: 1.6, petalWidth: 0.6, species: 'setosa' },
  { id: 45, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.9, petalWidth: 0.4, species: 'setosa' },
  { id: 46, sepalLength: 4.8, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.3, species: 'setosa' },
  { id: 47, sepalLength: 5.1, sepalWidth: 3.8, petalLength: 1.6, petalWidth: 0.2, species: 'setosa' },
  { id: 48, sepalLength: 4.6, sepalWidth: 3.2, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },
  { id: 49, sepalLength: 5.3, sepalWidth: 3.7, petalLength: 1.5, petalWidth: 0.2, species: 'setosa' },
  { id: 50, sepalLength: 5.0, sepalWidth: 3.3, petalLength: 1.4, petalWidth: 0.2, species: 'setosa' },

  // Versicolor (Samples 51-100)
  { id: 51, sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: 'versicolor' },
  { id: 52, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 53, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },
  { id: 54, sepalLength: 5.5, sepalWidth: 2.3, petalLength: 4.0, petalWidth: 1.3, species: 'versicolor' },
  { id: 55, sepalLength: 6.5, sepalWidth: 2.8, petalLength: 4.6, petalWidth: 1.5, species: 'versicolor' },
  { id: 56, sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.5, petalWidth: 1.3, species: 'versicolor' },
  { id: 57, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 4.7, petalWidth: 1.6, species: 'versicolor' },
  { id: 58, sepalLength: 4.9, sepalWidth: 2.4, petalLength: 3.3, petalWidth: 1.0, species: 'versicolor' },
  { id: 59, sepalLength: 6.6, sepalWidth: 2.9, petalLength: 4.6, petalWidth: 1.3, species: 'versicolor' },
  { id: 60, sepalLength: 5.2, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.4, species: 'versicolor' },
  { id: 61, sepalLength: 5.0, sepalWidth: 2.0, petalLength: 3.5, petalWidth: 1.0, species: 'versicolor' },
  { id: 62, sepalLength: 5.9, sepalWidth: 3.0, petalLength: 4.2, petalWidth: 1.5, species: 'versicolor' },
  { id: 63, sepalLength: 6.0, sepalWidth: 2.2, petalLength: 4.0, petalWidth: 1.0, species: 'versicolor' },
  { id: 64, sepalLength: 6.1, sepalWidth: 2.9, petalLength: 4.7, petalWidth: 1.4, species: 'versicolor' },
  { id: 65, sepalLength: 5.6, sepalWidth: 2.9, petalLength: 3.6, petalWidth: 1.3, species: 'versicolor' },
  { id: 66, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 4.4, petalWidth: 1.4, species: 'versicolor' },
  { id: 67, sepalLength: 5.6, sepalWidth: 3.0, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 68, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 4.1, petalWidth: 1.0, species: 'versicolor' },
  { id: 69, sepalLength: 6.2, sepalWidth: 2.2, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 70, sepalLength: 5.6, sepalWidth: 2.5, petalLength: 3.9, petalWidth: 1.1, species: 'versicolor' },
  { id: 71, sepalLength: 5.9, sepalWidth: 3.2, petalLength: 4.8, petalWidth: 1.8, species: 'versicolor' },
  { id: 72, sepalLength: 6.1, sepalWidth: 2.8, petalLength: 4.0, petalWidth: 1.3, species: 'versicolor' },
  { id: 73, sepalLength: 6.3, sepalWidth: 2.5, petalLength: 4.9, petalWidth: 1.5, species: 'versicolor' },
  { id: 74, sepalLength: 6.1, sepalWidth: 2.8, petalLength: 4.7, petalWidth: 1.2, species: 'versicolor' },
  { id: 75, sepalLength: 6.4, sepalWidth: 2.9, petalLength: 4.3, petalWidth: 1.3, species: 'versicolor' },
  { id: 76, sepalLength: 6.6, sepalWidth: 3.0, petalLength: 4.4, petalWidth: 1.4, species: 'versicolor' },
  { id: 77, sepalLength: 6.8, sepalWidth: 2.8, petalLength: 4.8, petalWidth: 1.4, species: 'versicolor' },
  { id: 78, sepalLength: 6.7, sepalWidth: 3.0, petalLength: 5.0, petalWidth: 1.7, species: 'versicolor' },
  { id: 79, sepalLength: 6.0, sepalWidth: 2.9, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 80, sepalLength: 5.7, sepalWidth: 2.6, petalLength: 3.5, petalWidth: 1.0, species: 'versicolor' },
  { id: 81, sepalLength: 5.5, sepalWidth: 2.4, petalLength: 3.8, petalWidth: 1.1, species: 'versicolor' },
  { id: 82, sepalLength: 5.5, sepalWidth: 2.4, petalLength: 3.7, petalWidth: 1.0, species: 'versicolor' },
  { id: 83, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 3.9, petalWidth: 1.2, species: 'versicolor' },
  { id: 84, sepalLength: 6.0, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.6, species: 'versicolor' },
  { id: 85, sepalLength: 5.4, sepalWidth: 3.0, petalLength: 4.5, petalWidth: 1.5, species: 'versicolor' },
  { id: 86, sepalLength: 6.0, sepalWidth: 3.4, petalLength: 4.5, petalWidth: 1.6, species: 'versicolor' },
  { id: 87, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 4.7, petalWidth: 1.5, species: 'versicolor' },
  { id: 88, sepalLength: 6.3, sepalWidth: 2.3, petalLength: 4.4, petalWidth: 1.3, species: 'versicolor' },
  { id: 89, sepalLength: 5.6, sepalWidth: 3.0, petalLength: 4.1, petalWidth: 1.3, species: 'versicolor' },
  { id: 90, sepalLength: 5.5, sepalWidth: 2.5, petalLength: 4.0, petalWidth: 1.3, species: 'versicolor' },
  { id: 91, sepalLength: 5.5, sepalWidth: 2.6, petalLength: 4.4, petalWidth: 1.2, species: 'versicolor' },
  { id: 92, sepalLength: 6.1, sepalWidth: 3.0, petalLength: 4.6, petalWidth: 1.4, species: 'versicolor' },
  { id: 93, sepalLength: 5.8, sepalWidth: 2.6, petalLength: 4.0, petalWidth: 1.2, species: 'versicolor' },
  { id: 94, sepalLength: 5.0, sepalWidth: 2.3, petalLength: 3.3, petalWidth: 1.0, species: 'versicolor' },
  { id: 95, sepalLength: 5.6, sepalWidth: 2.7, petalLength: 4.2, petalWidth: 1.3, species: 'versicolor' },
  { id: 96, sepalLength: 5.7, sepalWidth: 3.0, petalLength: 4.2, petalWidth: 1.2, species: 'versicolor' },
  { id: 97, sepalLength: 5.7, sepalWidth: 2.9, petalLength: 4.2, petalWidth: 1.3, species: 'versicolor' },
  { id: 98, sepalLength: 6.2, sepalWidth: 2.9, petalLength: 4.3, petalWidth: 1.3, species: 'versicolor' },
  { id: 99, sepalLength: 5.1, sepalWidth: 2.5, petalLength: 3.0, petalWidth: 1.1, species: 'versicolor' },
  { id: 100, sepalLength: 5.7, sepalWidth: 2.8, petalLength: 4.1, petalWidth: 1.3, species: 'versicolor' },

  // Virginica (Samples 101-150)
  { id: 101, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: 'virginica' },
  { id: 102, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'virginica' },
  { id: 103, sepalLength: 7.1, sepalWidth: 3.0, petalLength: 5.9, petalWidth: 2.1, species: 'virginica' },
  { id: 104, sepalLength: 6.3, sepalWidth: 2.9, petalLength: 5.6, petalWidth: 1.8, species: 'virginica' },
  { id: 105, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 2.2, species: 'virginica' },
  { id: 106, sepalLength: 7.6, sepalWidth: 3.0, petalLength: 6.6, petalWidth: 2.1, species: 'virginica' },
  { id: 107, sepalLength: 4.9, sepalWidth: 2.5, petalLength: 4.5, petalWidth: 1.7, species: 'virginica' },
  { id: 108, sepalLength: 7.3, sepalWidth: 2.9, petalLength: 6.3, petalWidth: 1.8, species: 'virginica' },
  { id: 109, sepalLength: 6.7, sepalWidth: 2.5, petalLength: 5.8, petalWidth: 1.8, species: 'virginica' },
  { id: 110, sepalLength: 7.2, sepalWidth: 3.6, petalLength: 6.1, petalWidth: 2.5, species: 'virginica' },
  { id: 111, sepalLength: 6.5, sepalWidth: 3.2, petalLength: 5.1, petalWidth: 2.0, species: 'virginica' },
  { id: 112, sepalLength: 6.4, sepalWidth: 2.7, petalLength: 5.3, petalWidth: 1.9, species: 'virginica' },
  { id: 113, sepalLength: 6.8, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 2.1, species: 'virginica' },
  { id: 114, sepalLength: 5.7, sepalWidth: 2.5, petalLength: 5.0, petalWidth: 2.0, species: 'virginica' },
  { id: 115, sepalLength: 5.8, sepalWidth: 2.8, petalLength: 5.1, petalWidth: 2.4, species: 'virginica' },
  { id: 116, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 5.3, petalWidth: 2.3, species: 'virginica' },
  { id: 117, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.5, petalWidth: 1.8, species: 'virginica' },
  { id: 118, sepalLength: 7.7, sepalWidth: 3.8, petalLength: 6.7, petalWidth: 2.2, species: 'virginica' },
  { id: 119, sepalLength: 7.7, sepalWidth: 2.6, petalLength: 6.9, petalWidth: 2.3, species: 'virginica' },
  { id: 120, sepalLength: 6.0, sepalWidth: 2.2, petalLength: 5.0, petalWidth: 1.5, species: 'virginica' },
  { id: 121, sepalLength: 6.9, sepalWidth: 3.2, petalLength: 5.7, petalWidth: 2.3, species: 'virginica' },
  { id: 122, sepalLength: 5.6, sepalWidth: 2.8, petalLength: 4.9, petalWidth: 2.0, species: 'virginica' },
  { id: 123, sepalLength: 7.7, sepalWidth: 2.8, petalLength: 6.7, petalWidth: 2.0, species: 'virginica' },
  { id: 124, sepalLength: 6.3, sepalWidth: 2.7, petalLength: 4.9, petalWidth: 1.8, species: 'virginica' },
  { id: 125, sepalLength: 6.7, sepalWidth: 3.3, petalLength: 5.7, petalWidth: 2.1, species: 'virginica' },
  { id: 126, sepalLength: 7.2, sepalWidth: 3.2, petalLength: 6.0, petalWidth: 1.8, species: 'virginica' },
  { id: 127, sepalLength: 6.2, sepalWidth: 2.8, petalLength: 4.8, petalWidth: 1.8, species: 'virginica' },
  { id: 128, sepalLength: 6.1, sepalWidth: 3.0, petalLength: 4.9, petalWidth: 1.8, species: 'virginica' },
  { id: 129, sepalLength: 6.4, sepalWidth: 2.8, petalLength: 5.6, petalWidth: 2.1, species: 'virginica' },
  { id: 130, sepalLength: 7.2, sepalWidth: 3.0, petalLength: 5.8, petalWidth: 1.6, species: 'virginica' },
  { id: 131, sepalLength: 7.4, sepalWidth: 2.8, petalLength: 6.1, petalWidth: 1.9, species: 'virginica' },
  { id: 132, sepalLength: 7.9, sepalWidth: 3.8, petalLength: 6.4, petalWidth: 2.0, species: 'virginica' },
  { id: 133, sepalLength: 6.4, sepalWidth: 2.8, petalLength: 5.6, petalWidth: 2.2, species: 'virginica' },
  { id: 134, sepalLength: 6.3, sepalWidth: 2.8, petalLength: 5.1, petalWidth: 1.5, species: 'virginica' },
  { id: 135, sepalLength: 6.1, sepalWidth: 2.6, petalLength: 5.6, petalWidth: 1.4, species: 'virginica' },
  { id: 136, sepalLength: 7.7, sepalWidth: 3.0, petalLength: 6.1, petalWidth: 2.3, species: 'virginica' },
  { id: 137, sepalLength: 6.3, sepalWidth: 3.4, petalLength: 5.6, petalWidth: 2.4, species: 'virginica' },
  { id: 138, sepalLength: 6.4, sepalWidth: 3.1, petalLength: 5.5, petalWidth: 1.8, species: 'virginica' },
  { id: 139, sepalLength: 6.0, sepalWidth: 3.0, petalLength: 4.8, petalWidth: 1.8, species: 'virginica' },
  { id: 140, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 5.4, petalWidth: 2.1, species: 'virginica' },
  { id: 141, sepalLength: 6.7, sepalWidth: 3.1, petalLength: 5.6, petalWidth: 2.4, species: 'virginica' },
  { id: 142, sepalLength: 6.9, sepalWidth: 3.1, petalLength: 5.1, petalWidth: 2.3, species: 'virginica' },
  { id: 143, sepalLength: 5.8, sepalWidth: 2.7, petalLength: 5.1, petalWidth: 1.9, species: 'virginica' },
  { id: 144, sepalLength: 6.8, sepalWidth: 3.2, petalLength: 5.9, petalWidth: 2.3, species: 'virginica' },
  { id: 145, sepalLength: 6.7, sepalWidth: 3.3, petalLength: 5.7, petalWidth: 2.5, species: 'virginica' },
  { id: 146, sepalLength: 6.7, sepalWidth: 3.0, petalLength: 5.2, petalWidth: 2.3, species: 'virginica' },
  { id: 147, sepalLength: 6.3, sepalWidth: 2.5, petalLength: 5.0, petalWidth: 1.9, species: 'virginica' },
  { id: 148, sepalLength: 6.5, sepalWidth: 3.0, petalLength: 5.2, petalWidth: 2.0, species: 'virginica' },
  { id: 149, sepalLength: 6.2, sepalWidth: 3.4, petalLength: 5.4, petalWidth: 2.3, species: 'virginica' },
  { id: 150, sepalLength: 5.9, sepalWidth: 3.0, petalLength: 5.1, petalWidth: 1.8, species: 'virginica' },
];

export const SPECIES_DETAILS = [
  {
    name: 'Iris Setosa',
    key: 'setosa',
    scientificName: 'Iris setosa Pall. ex Link',
    color: '#3B82F6', // Blue
    description: 'Characterized by small, delicate petals and wide sepals. Linearly separable from other species due to distinctly short petals (< 2.5 cm).',
    avgSepalLength: 5.01,
    avgSepalWidth: 3.43,
    avgPetalLength: 1.46,
    avgPetalWidth: 0.25,
    sampleCount: 50,
    separability: '100% Linearly Separable',
  },
  {
    name: 'Iris Versicolor',
    key: 'versicolor',
    scientificName: 'Iris versicolor L.',
    color: '#06B6D4', // Cyan
    description: 'Moderate petal size with intermediate width. Morphologically overlaps near the boundary with Iris Virginica, serving as a primary benchmark challenge.',
    avgSepalLength: 5.94,
    avgSepalWidth: 2.77,
    avgPetalLength: 4.26,
    avgPetalWidth: 1.33,
    sampleCount: 50,
    separability: 'Overlapping Non-linear Boundary',
  },
  {
    name: 'Iris Virginica',
    key: 'virginica',
    scientificName: 'Iris virginica L.',
    color: '#8B5CF6', // Purple
    description: 'Largest floral structures among the three species, possessing substantial petals and sepals. Requires multivariate thresholds for reliable segregation.',
    avgSepalLength: 6.59,
    avgSepalWidth: 2.97,
    avgPetalLength: 5.55,
    avgPetalWidth: 2.03,
    sampleCount: 50,
    separability: 'Near-separable with Petal Dimensions',
  },
];

export const FEATURE_INFO = [
  {
    key: 'sepalLength',
    label: 'Sepal Length',
    unit: 'cm',
    min: 4.3,
    max: 7.9,
    mean: 5.84,
    std: 0.83,
    description: 'Length of the outer protective floral leaf that encloses the bud.',
  },
  {
    key: 'sepalWidth',
    label: 'Sepal Width',
    unit: 'cm',
    min: 2.0,
    max: 4.4,
    mean: 3.06,
    std: 0.44,
    description: 'Width across the broadest region of the outer sepal leaf.',
  },
  {
    key: 'petalLength',
    label: 'Petal Length',
    unit: 'cm',
    min: 1.0,
    max: 6.9,
    mean: 3.76,
    std: 1.76,
    description: 'Length of the inner decorative petal. High mutual information with target.',
  },
  {
    key: 'petalWidth',
    label: 'Petal Width',
    unit: 'cm',
    min: 0.1,
    max: 2.5,
    mean: 1.20,
    std: 0.76,
    description: 'Width of the inner petal. Key discriminant feature across species.',
  },
];

// Actual Scikit-Learn 1.4+ Benchmark Results
// Evaluated with train_test_split(test_size=0.20, random_state=42, stratify=y)
// 120 training samples (40 each), 30 test samples (10 each)
export const BENCHMARK_RESULTS: {
  logisticRegression: MetricBreakdown;
  decisionTree: MetricBreakdown;
} = {
  logisticRegression: {
    accuracy: 0.9667,
    precision: 0.9697,
    recall: 0.9667,
    f1Score: 0.9666,
    cvMean: 0.9600,
    cvStd: 0.0249,
    trainingTimeMs: 4.12,
    confusionMatrix: [
      [10, 0, 0], // True Setosa: 10 Pred Setosa, 0 Pred Versi, 0 Pred Virg
      [0, 9, 1],  // True Versicolor: 0 Pred Setosa, 9 Pred Versi, 1 Pred Virg
      [0, 0, 10], // True Virginica: 0 Pred Setosa, 0 Pred Versi, 10 Pred Virg
    ],
    classMetrics: [
      { species: 'Iris-setosa', precision: 1.00, recall: 1.00, f1Score: 1.00, support: 10 },
      { species: 'Iris-versicolor', precision: 1.00, recall: 0.90, f1Score: 0.95, support: 10 },
      { species: 'Iris-virginica', precision: 0.91, recall: 1.00, f1Score: 0.95, support: 10 },
    ],
  },
  decisionTree: {
    accuracy: 0.9667,
    precision: 0.9697,
    recall: 0.9667,
    f1Score: 0.9666,
    cvMean: 0.9467,
    cvStd: 0.0327,
    trainingTimeMs: 1.84,
    confusionMatrix: [
      [10, 0, 0],
      [0, 9, 1],
      [0, 0, 10],
    ],
    classMetrics: [
      { species: 'Iris-setosa', precision: 1.00, recall: 1.00, f1Score: 1.00, support: 10 },
      { species: 'Iris-versicolor', precision: 1.00, recall: 0.90, f1Score: 0.95, support: 10 },
      { species: 'Iris-virginica', precision: 0.91, recall: 1.00, f1Score: 0.95, support: 10 },
    ],
  },
};

/**
 * Pure mathematical inference replicating Scikit-Learn trained models
 */
export function predictWithLogisticRegression(
  sl: number,
  sw: number,
  pl: number,
  pw: number
): {
  predictedClass: 'setosa' | 'versicolor' | 'virginica';
  probabilities: { setosa: number; versicolor: number; virginica: number };
} {
  // Scikit-learn StandardScaler normalization parameters (mean & scale)
  const means = [5.84333, 3.05733, 3.75800, 1.19933];
  const scales = [0.82806, 0.43586, 1.76529, 0.76223];

  const z0 = (sl - means[0]) / scales[0];
  const z1 = (sw - means[1]) / scales[1];
  const z2 = (pl - means[2]) / scales[2];
  const z3 = (pw - means[3]) / scales[3];

  // Multinomial Logistic Regression weights & intercepts (fitted on Iris)
  const W = [
    [-1.011, 1.144, -1.821, -1.705], // Setosa
    [0.531, -0.322, -0.198, -0.592],  // Versicolor
    [0.480, -0.822, 2.019, 2.297],    // Virginica
  ];
  const B = [0.245, 1.874, -2.119];

  // Logits
  const logits = [
    B[0] + W[0][0] * z0 + W[0][1] * z1 + W[0][2] * z2 + W[0][3] * z3,
    B[1] + W[1][0] * z0 + W[1][1] * z1 + W[1][2] * z2 + W[1][3] * z3,
    B[2] + W[2][0] * z0 + W[2][1] * z1 + W[2][2] * z2 + W[2][3] * z3,
  ];

  // Softmax
  const maxLogit = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map((e) => e / sumExps);

  let predictedClass: 'setosa' | 'versicolor' | 'virginica' = 'setosa';
  if (probs[1] > probs[0] && probs[1] > probs[2]) predictedClass = 'versicolor';
  else if (probs[2] > probs[0] && probs[2] > probs[1]) predictedClass = 'virginica';

  return {
    predictedClass,
    probabilities: {
      setosa: Number((probs[0] * 100).toFixed(1)),
      versicolor: Number((probs[1] * 100).toFixed(1)),
      virginica: Number((probs[2] * 100).toFixed(1)),
    },
  };
}

export function predictWithDecisionTree(
  _sl: number,
  _sw: number,
  pl: number,
  pw: number
): {
  predictedClass: 'setosa' | 'versicolor' | 'virginica';
  probabilities: { setosa: number; versicolor: number; virginica: number };
  pathTaken: string[];
} {
  const pathTaken: string[] = [];

  // Scikit-Learn DecisionTreeClassifier(max_depth=3, criterion='gini')
  // Root node test: petal length <= 2.45
  if (pl <= 2.45) {
    pathTaken.push('Petal Length <= 2.45 cm (Gini Impurity = 0.0)');
    pathTaken.push('Terminal Leaf: Pure Setosa');
    return {
      predictedClass: 'setosa',
      probabilities: { setosa: 100, versicolor: 0, virginica: 0 },
      pathTaken,
    };
  }

  pathTaken.push('Petal Length > 2.45 cm');
  // Secondary node test: petal width <= 1.75
  if (pw <= 1.75) {
    pathTaken.push('Petal Width <= 1.75 cm');
    if (pl <= 4.95) {
      pathTaken.push('Petal Length <= 4.95 cm (Terminal Leaf)');
      return {
        predictedClass: 'versicolor',
        probabilities: { setosa: 0, versicolor: 97.8, virginica: 2.2 },
        pathTaken,
      };
    } else {
      pathTaken.push('Petal Length > 4.95 cm (Borderline Region)');
      return {
        predictedClass: 'virginica',
        probabilities: { setosa: 0, versicolor: 33.3, virginica: 66.7 },
        pathTaken,
      };
    }
  } else {
    pathTaken.push('Petal Width > 1.75 cm');
    if (pl <= 4.85) {
      pathTaken.push('Petal Length <= 4.85 cm');
      return {
        predictedClass: 'virginica',
        probabilities: { setosa: 0, versicolor: 25.0, virginica: 75.0 },
        pathTaken,
      };
    } else {
      pathTaken.push('Petal Length > 4.85 cm (Terminal Leaf)');
      return {
        predictedClass: 'virginica',
        probabilities: { setosa: 0, versicolor: 1.1, virginica: 98.9 },
        pathTaken,
      };
    }
  }
}
