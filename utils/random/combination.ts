export function calculateCombination(data: number[]) {
  return data.reduce((combined, currentValue) => combined * currentValue, 1);
}
