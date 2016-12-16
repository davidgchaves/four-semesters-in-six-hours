/* eslint-env jasmine */

describe('Insertion Sort', () => {
  it('sorts an array of numbers', () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
    const sortedNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    insertionSort(nums)

    expect(nums).toEqual(sortedNums)
  })
})

const insertionSort = xs => {
  for (let o = 1; o < xs.length; o++) {
    for (let i = o; i >= 0; i--) {
      if (xs[i] < xs[i - 1]) {
        const temp = xs[i]
        xs[i] = xs[i - 1]
        xs[i - 1] = temp
      }
    }
  }
}
