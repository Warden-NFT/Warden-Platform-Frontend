/**
 * Random item from its weight
 * @param weights list of weight number
 * @param items list of items
 * @returns  index weighted random
 */
export function weightedRandom(weights: number[], items: any[]): number {
  if (weights.length === 0 || items.length === 0) {
    throw new Error("Weights and items must not be empty.");
  }

  if (weights.length !== items.length) {
    throw new Error("List of weights and items do not have the same size.");
  }

  const totalWeights = weightSummation(weights);
  if (totalWeights == 0) {
    throw new Error("Total weight is zero.");
  }

  const cumulativeWeights = cumulativeWeight(weights);
  const weightedRnd = Math.random() * totalWeights;

  return getWeightedRandom(cumulativeWeights, weightedRnd) ?? 0;
}

/**
 * Calculate cumulative list of weights
 * @param weights
 * @returns cumulated weights
 */
export function cumulativeWeight(weights: number[]) {
  const cumulativeWeights: number[] = [];
  weights.forEach((weight, i) => {
    cumulativeWeights.push(weight + (cumulativeWeights[i - 1] || 0));
  });

  return cumulativeWeights;
}

/**
 * Sum of all weights
 * @param weights
 * @returns weights sum
 */
export function weightSummation(weights: number[]) {
  const cumulated = weights.reduce((weight, tot) => weight + tot);
  return cumulated;
}

/**
 * Get index of the randommed item
 * @param cumulativeWeights
 * @param random
 * @returns index of randommed item that exceeds its weight
 */
export function getWeightedRandom(cumulativeWeights: number[], random: number) {
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (cumulativeWeights[i] >= random) {
      return i;
    }
  }
}

/**
 * Return if the random value is less than the degsinated value.
 * Used to determine if a layer should be generated.
 * @param val occurance of the layer
 * @returns boolean (True if the rnd value is in the lower tail)
 */
export function isLowerTail(val: number) {
  if (val > 1) {
    throw new Error("Probability cannot be > 1");
  }

  if (val < 0) {
    throw new Error("Probability cannot be negative");
  }

  const rnd = Math.random();
  return rnd < val;
}
