/* eslint-env jasmine */

/*
  AVL Tree

  Tree should have the following properties (in addition to whatever properties you create):

  value - integer     - value being contained in the node
  left  - Node/object - the left node which itself may be another tree
  right - Node/object - the right node which itself may be another tree
*/

describe('AVL Tree', () => {
  it('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new Tree()

    nums.map(num => tree.add(num))

    expect(tree.root.value).toEqual(4)

    expect(tree.root.left.value).toEqual(2)

    expect(tree.root.left.left.value).toEqual(1)
    expect(tree.root.left.left.left).toBeNull()
    expect(tree.root.left.left.right).toBeNull()

    expect(tree.root.left.right.value).toEqual(3)
    expect(tree.root.left.right.left).toBeNull()
    expect(tree.root.left.right.right).toBeNull()

    expect(tree.root.right.value).toEqual(7)

    expect(tree.root.right.left.value).toEqual(6)
    expect(tree.root.right.left.right).toBeNull()

    expect(tree.root.right.left.left.value).toEqual(5)
    expect(tree.root.right.left.left.left).toBeNull()
    expect(tree.root.right.left.left.right).toBeNull()

    expect(tree.root.right.right.value).toEqual(9)

    expect(tree.root.right.right.left.value).toEqual(8)
    expect(tree.root.right.right.left.left).toBeNull()
    expect(tree.root.right.right.left.right).toBeNull()

    expect(tree.root.right.right.right.value).toEqual(10)
    expect(tree.root.right.right.right.left).toBeNull()
    expect(tree.root.right.right.right.right).toBeNull()
  })
})

class Tree {
  constructor () {
    this.root = null
  }

  add (x) {}
}

class Node {
  constructor (value, leftBST = null, rightBST = null) {
    this.value = value
    this.left = leftBST
    this.right = rightBST
  }
}
