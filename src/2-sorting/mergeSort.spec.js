/* eslint-env jasmine */

describe('Merge Sort', () => {
  it('sorts an array of numbers', () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
    const sortedNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    expect(mergeSort(nums)).toEqual(sortedNums)
  })
})

const stitch = (ls, rs) => {
  const ys = []

  while (ls.length && rs.length) {
    ls[0] <= rs[0]
      ? ys.push(ls.shift())
      : ys.push(rs.shift())
  }

  while (ls.length) { ys.push(ls.shift()) }
  while (rs.length) { ys.push(rs.shift()) }

  return ys
}

const mergeSort = xs => {
  if (xs.length <= 1) { return xs }

  const splitPoint = xs.length / 2

  return stitch(
    mergeSort(xs.slice(0, splitPoint)),
    mergeSort(xs.slice(splitPoint, xs.length))
  )
}
