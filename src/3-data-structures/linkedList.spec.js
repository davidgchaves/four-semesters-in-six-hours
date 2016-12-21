/* eslint-env jasmine */
/*
  LinkedList

  Name your class / constructor (something you can call new on) LinkedList

  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.

  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses,
                      and returns removed value

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

describe('LinkedList', () => {
  const range = length =>
    Array
    .apply(null, { length: length })
    .map(Number.call, Number)
  const abcRange = length =>
    range(length)
    .map(num => String.fromCharCode(97 + num))
  let list

  beforeEach(() => { list = new LinkedList() })

  it('has a constructor', () => {
    expect(list).toEqual(jasmine.any(LinkedList))
  })

  it('pushes new elements to the end', () => {
    abcRange(26).map(c => list.push(c))

    expect(list.length).toEqual(26)
  })

  it('pops an empty list', () => {
    expect(list.length).toEqual(0)
  })

  it('pops a list of 1', () => {
    list.push(4)
    expect(list.length).toEqual(1)
    expect(list.pop()).toEqual(4)
  })

  it('pops a list of 2', () => {
    list.push(4)
    list.push(6)
    expect(list.length).toEqual(2)
    expect(list.pop()).toEqual(6)
    expect(list.pop()).toEqual(4)
  })

  it('pops a list of 3', () => {
    list.push(4)
    list.push(6)
    list.push(8)
    expect(list.length).toEqual(3)
    expect(list.pop()).toEqual(8)
    expect(list.length).toEqual(2)
    expect(list.pop()).toEqual(6)
    expect(list.length).toEqual(1)
    expect(list.pop()).toEqual(4)
    expect(list.length).toEqual(0)
  })

  it('pops and returns last element', () => {
    abcRange(13).map(c => list.push(c))
    expect(list.length).toEqual(13)

    range(10).map(() => list.pop())

    expect(list.length).toEqual(3)
    expect(list.pop()).toEqual('c')
  })

  it('gets elements without actually modifying the LinkedList', () => {
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

class LinkedList {
  constructor () {
    this.head = null
    this.length = 0
  }

  _incrementLength () { this.length += 1 }
  _decrementLength () { this.length -= 1 }

  push (x) {
    const node = new Node(x)
    let cursor = this.head

    if (!cursor) {
      // Empty List: Push node
      this.head = node
    } else {
      // List of 1 or more: Find tail and push node
      while (cursor.next) { cursor = cursor.next }
      cursor.next = node
    }

    this._incrementLength()
  }

  pop () {
    const tailIndex = this.length - 1
    return this.deleteAt(tailIndex)
  }

  getAt (i) {
    if (i >= this.length || i < 0) { return 'Index Out of Bounds' }

    let cursor = this.head
    for (let j = 0; j < i; j += 1) { cursor = cursor.next }

    return cursor.value
  }

  deleteAt (i) {
    if (i >= this.length || i < 0) { return 'Index Out of Bounds' }

    let cursor = this.head
    // Delete 1st Node
    if (i === 0) {
      this.head = cursor.next
      this._decrementLength()
      return cursor.value
    }

    // Delete xth Node
    for (let j = 1; j < i; j += 1) { cursor = cursor.next }

    const nodeToDelete = cursor.next
    cursor.next = cursor.next.next
    this._decrementLength()
    return nodeToDelete.value
  }
}

class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}
