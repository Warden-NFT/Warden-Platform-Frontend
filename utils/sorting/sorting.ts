interface Entity {
  [key: string]: any // This allows any property key with any value
}

export const compare = <T extends Entity>(
  a: T,
  b: T,
  field: keyof T
): number => {
  if (a[field] < b[field]) {
    return -1
  }
  if (a[field] > b[field]) {
    return 1
  }
  return 0
}
