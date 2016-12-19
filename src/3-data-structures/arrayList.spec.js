/* eslint-env jasmine */

/*
  ArrayList

  We are going to approximate an implementation of ArrayList.
  In JavaScript terms, that means we are going to implement an array using objects.
  You should not use arrays at all in this exercise, just objects.
  Make a class (or constructor function something you can call new on) called ArrayList.
  ArrayList should have the following properties (in addition to whatever properties you create):

  length   - integer  - How many elements in the array
  push     - function - accepts a value and adds to the end of the list
  pop      - function - removes the last value in the list and returns it
  getAt    - function - accepts an index and returns the value at that position
  deleteAt - function - accepts an index, removes value from list, collapses, and returns removed value
*/

describe('ArrayList', () => {
  const range = length =>
    Array
    .apply(null, { length: length })
    .map(Number.call, Number)
  const abcRange = length =>
    range(length)
    .map(num => String.fromCharCode(97 + num))
  let list

  beforeEach(() => { list = new ArrayList() })

  it('has a constructor', () => {
    expect(list).toEqual(jasmine.any(ArrayList))
  })

  it('pushes new elements to the end', () => {
    abcRange(26).map(c => list.push(c))

    expect(list.length).toEqual(26)
  })

  it('pops and returns last element', () => {
    abcRange(13).map(c => list.push(c))
    expect(list.length).toEqual(13)

    range(10).map(() => list.pop())

    expect(list.length).toEqual(3)
    expect(list.pop()).toEqual('c')
  })

  it('gets elements without actually modifying the ArrayList', () => {
    list.push('first')
    expect(list.getAt(0)).toEqual('first')

    list.push('second')
    expect(list.getAt(1)).toEqual('second')
    expect(list.getAt(0)).toEqual('first')

    abcRange(26).map(c => list.push(c))
    expect(list.getAt(27)).toEqual('z')
    expect(list.getAt(0)).toEqual('first')
    expect(list.getAt(9)).toEqual('h')

    list.pop()
    expect(list.getAt(list.length - 1)).toEqual('y')
  })

  it('deletes and returns element at the given position', () => {
    abcRange(26).map(c => list.push(c))
    list.deleteAt(13)

    expect(list.length).toEqual(25)
    expect(list.getAt(12)).toEqual('m')
    expect(list.getAt(13)).toEqual('o')

    list.deleteAt(0)
    expect(list.length).toEqual(24)
    expect(list.getAt(0)).toEqual('b')
  })
})

class ArrayList {
  constructor () {
    // length mantains the number of elements in the list
    this.length = 0
    this.data = {}
  }

  _incrementLength () { this.length += 1 }
  _decrementLength () { this.length -= 1 }
  _collapseTo (i) {
    const last = this.length - 1
    for (let j = i; j < this.length; j += 1) {
      this.data[j] = this.data[j + 1]
    }
    delete this.data[last]
    this._decrementLength()
  }

  // `push` accepts a value and adds to the end of the list
  push (x) {
    const next = this.length
    this.data[next] = x
    this._incrementLength()
  }

  // `pop` removes the last value in the list and returns it
  pop () {
    const last = this.length - 1
    const x = this.data[last]
    this._collapseTo(last)
    return x
  }

  // `getAt` accepts an index and returns the value at that position
  getAt (i) {
    return this.data[i]
  }

  // `deleteAt` accepts an index, removes value from list, collapses, and returns removed value
  deleteAt (i) {
    const x = this.data[i]
    this._collapseTo(i)
    return x
  }
}
