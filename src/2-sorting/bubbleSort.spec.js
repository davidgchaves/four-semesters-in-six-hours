/* eslint-env jasmine */

describe('Bubble Sort', () => {
  it('sorts an array of numbers', () => {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
    const sortedNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    bubbleSort(nums)

    expect(nums).toEqual(sortedNums)
  })
})

const bubbleSort = xs => {
  let swapped

  do {
    swapped = false

    for (let i = 0; i < xs.length; i++) {
      if (xs[i] > xs[i + 1]) {
        const temp = xs[i]
        xs[i] = xs[i + 1]
        xs[i + 1] = temp
        swapped = true
      }
    }
  } while (swapped)
}
