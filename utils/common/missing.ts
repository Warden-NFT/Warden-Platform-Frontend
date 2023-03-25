export const isEmpty = (object: any) => {
  return Object.keys(object).length === 0
}

/**
 * Check if a list of number will has remainder when it's compared to a number
 * @param numbers an array of numbers to be reduced
 * @param target number to be checked if it's higher or lower
 * @returns boolean which indicates that summation is higher or equal to than the target
 */
export function hasRemainderOrEquals(numbers: number[], target: number) {
  if (!numbers.length) return true
  const sum = numbers.reduce((_sum, val) => _sum + val)
  return sum >= target
}
