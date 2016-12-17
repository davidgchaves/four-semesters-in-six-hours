/* eslint-env jasmine */

describe('Quick Sort', () => {
  it('sorts an array of numbers', () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
    const sortedNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    expect(quickSort(nums)).toEqual(sortedNums)
  })
})

const quickSort = xs => []
