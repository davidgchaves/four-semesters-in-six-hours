/* eslint-env jasmine */

/*

  Filter!

  Test 1
    filterOutOdds:
      - takes a list of numbers
      - returns a list with only the even numbers remaining

  Test 2
    filterState:
      - takes a string of the state which you want to filter for
      - takes a list of people objects that have a name and state (as in state where they're from)
      - returns a list of people objects (in the same order) from the state specified

  Test 3
    showOutOfCADevs
      - takes a list of people objects (same from test 3)
      - filters out people from CA,
      - pulls out the name and uppercases it,
      - reduces the list down to one string, the names separated by (", ")
      - returns a string of uppercase names, separated by a comma and a space.

  Test 4
    myFilter implements filter
    myFilter:
      - takes in a predicate function (true if the item stays , or false if it goes away)
      - takes in a list that will be filtered
      - returns a list that has been filtered
*/

describe('filter', () => {
  const people = [
    {name: 'Brian Holt', state: 'CA'},
    {name: 'Ryan Florence', state: 'WA'},
    {name: 'Kent Dodds', state: 'UT'},
    {name: 'Kyle Simpson', state: 'TX'},
    {name: 'Pete Hunt', state: 'CA'},
    {name: 'Jafar Husain', state: 'CA'},
    {name: 'Yehuda Katz', state: 'OR'},
    {name: 'Matt Zabriskie', state: 'UT'},
    {name: 'Marshall Upshur', state: 'CA'}
  ]

  it('filterOutOdds', () => {
    const inputList = [1, 5, 7, 2, 6, 3, 5, 4, 10, 50, 51]
    const outputList = [2, 6, 4, 10, 50]

    expect(filterOutOdds(inputList)).toEqual(outputList)
  })

  it('filterState', () => {
    const outputForCA = [
      {name: 'Brian Holt', state: 'CA'},
      {name: 'Pete Hunt', state: 'CA'},
      {name: 'Jafar Husain', state: 'CA'},
      {name: 'Marshall Upshur', state: 'CA'}
    ]
    const outputForUT = [
      {name: 'Kent Dodds', state: 'UT'},
      {name: 'Matt Zabriskie', state: 'UT'}
    ]

    expect(filterState('CA', people)).toEqual(outputForCA)
    expect(filterState('UT', people)).toEqual(outputForUT)
  })

  it('showOutOfCADevs', () => {
    const output = 'RYAN FLORENCE, KENT DODDS, KYLE SIMPSON, YEHUDA KATZ, MATT ZABRISKIE'

    expect(showOutOfCADevs(people)).toEqual(output)
  })

  it('myFilter', () => {
    const inputList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const outputList = [3, 6, 9, 12]
    const pred = n => n % 3 === 0

    expect(myFilter(pred, inputList)).toEqual(outputList)
  })
})

/*
  filterOutOdds:
    - takes a list of numbers
    - returns a list with only the even numbers remaining
*/
const filterOutOdds = ns => ns.filter(n => n % 2 === 0)

/*
  filterState:
    - takes a string of the state which you want to filter for
    - takes a list of people objects that have a name and state (as in state where they're from)
    - returns a list of people objects (in the same order) from the state specified
*/
const filterState = (state, ps) => ps.filter(p => p.state === state)

/*
  showOutOfCADevs
    - takes a list of people objects
    - returns a string of non-CA uppercase names, separated by a comma and a space.
*/
const showOutOfCADevs = ps =>
  ps
    .filter(p => p.state !== 'CA')
    .map(p => p.name.toUpperCase())
    .reduce((acc, s) => `${acc}, ${s}`)

/*
  myFilter:
    - takes in a predicate function (true if the item stays , or false if it goes away)
    - takes in a list that will be filtered
    - returns a list that has been filtered
*/
const myFilter = (p, xs) => {
  let ys = []
  for (let i = 0; i < xs.length; i += 1) {
    if (p(xs[i])) { ys.push(xs[i]) }
  }
  return ys
}
