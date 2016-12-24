/* eslint-env jasmine */
/*
  Reduce

  Good for taking a list and reducing it down to one value in a user defined way.

  Test 1
    addTogether:
      - takes in a list
      - returns the result of that list added together

  Test 2
    concatenateStringsWithSpaces:
      - takes in a list
      - returns that string with those strings concatenated together with spaces between them

  Test 3
    squaresAndSubtracts:
      - map over your list, square each value,
      - then subtract them in order (take index 0, subtract index 1, then index 2, etc.)

  Test 4
    myReduce implement your own reduce.
    myReduce:
      - takes in a function to apply the reduction
      - takes in a seed value to start the reduce
      - takes in the list being operated on

*/

describe('reduce', () => {
  it('addTogether', () => {
    const inputList = [5, 3, 0, 7, 2, 5, 6, 10, 9]

    expect(addTogether(inputList)).toEqual(47)
  })

  it('concatenateStringsWithSpaces', () => {
    const inputList = ['this', 'is', 'so', 'fun']

    expect(concatenateStringsWithSpaces(inputList).trim()).toEqual('this is so fun')
  })

  it('squaresAndSubtracts', () => {
    const inputList = [10, 5, 4, 2, 1]

    expect(squaresAndSubtracts(inputList)).toEqual(54)
  })

  it('myReduce', () => {
    const inputList = [4, 2, 3, 2]
    const applyDivisors = (acc, divisor) => acc / divisor

    expect(myReduce(applyDivisors, 240, inputList)).toEqual(5)
  })
})

/*
  addTogether:
    - takes in a list
    - returns the result of that list added together
*/
const addTogether = (xs) =>
  xs.reduce((acc, x) => acc + x)

/*
  concatenateStringsWithSpaces:
    - takes in a list
    - returns that string with those strings concatenated together with spaces between them
*/
const concatenateStringsWithSpaces = (xs) =>
  xs.reduce((acc, x) => acc.concat(x, ' '), '')

/*
  squaresAndSubtracts:
    - map over your list, square each value,
    - then subtract them in order (take index 0, subtract index 1, then index 2, etc.)
*/
const squaresAndSubtracts = (xs) =>
  xs
    .map(x => x * x)
    .reduce((acc, x) => acc - x)

/*
  myReduce:
    - takes in a function to apply the reduction
    - takes in a seed value to start the reduce
    - takes in the list being operated on
*/
const myReduce = (f, seed, xs) => {
  let acc = seed
  for (let i = 0; i < xs.length; i += 1) { acc = f(acc, xs[i]) }
  return acc
}
