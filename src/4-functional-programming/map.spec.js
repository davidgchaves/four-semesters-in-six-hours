/* eslint-env jasmine */

/*
  Map

  Map is a method on the array prototype in JavaScript.
  It takes one (required) parameter:
    - the function you want called on each element in the array.
  While you can make these functions, I'd recommend making them named and thus resuseable.

  There are four tests to pass here:

  Test 1
    doubleEach:
      - takes in an array
      - returns an array where every element in the array is doubled

  Test 2
    squareEach:
      - takes in an array
      - returns an array where every element in the array is squared

  Test 3
    doubleAndSquareEach:
      - takes in an array
      - returns an array where each element is doubled first and then squared
    If you made doubleEach and squareEach composeable, you can reuse them here.

  Test 4
    myMap is going to simulate the behavior of the map method on the Array prototype.
    myMap:
      - takes in the function being called on each element
      - takes in the array being mapped over
      - returns the resulting array of calling the inputted function on each value in the array
*/

describe('map tests', () => {
  it('doubleEach', () => {
    const inputList = [5, 50, 500, 5000, 10, 5, 3]
    const outputList = [10, 100, 1000, 10000, 20, 10, 6]

    expect(doubleEach(inputList)).toEqual(outputList)
  })

  it('squareEach', () => {
    const inputList = [10, 1, 9, 2, 8, 3, 8, 4, 7, 5, 6, 50]
    const outputList = [100, 1, 81, 4, 64, 9, 64, 16, 49, 25, 36, 2500]

    expect(squareEach(inputList)).toEqual(outputList)
  })

  it('doubleAndSquareEach', () => {
    const inputList = [5, 2, 4, 8, 1, 7, 10]
    const outputList = [100, 16, 64, 256, 4, 196, 400]

    expect(doubleAndSquareEach(inputList)).toEqual(outputList)
  })

  it('myMap', () => {
    const inputList = [6, 2, 4, 8, 10]
    const outputList = [3, 1, 2, 4, 5]
    const divideByTwo = num => num / 2

    expect(myMap(divideByTwo, inputList)).toEqual(outputList)
  })
})

const doubleEach = () => {}
const squareEach = () => {}
const doubleAndSquareEach = () => {}
const myMap = (f, xs) => {}
