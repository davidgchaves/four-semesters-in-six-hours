/* eslint-env jasmine */

/*
  Binary Search Tree

  Your Tree class will have keep track of a root which will be the first item added to your tree.
  From there:
    - If the item is less than the value of that node, it will go into its left subtree.
    - If the item is greater than the value of that node, it will go to the right subtree.

  Tree should have the following properties (in addition to whatever properties you create):

  value - integer     - value being contained in the node
  left  - Node/object - the left node which itself may be another tree
  right - Node/object - the right node which itself may be another tree
*/

describe('Binary Search Tree', () => {
  it('adds a node to an empty BST', () => {
    const tree = new Tree()
    tree.add(5)
    expect(tree.root.value).toEqual(5)
  })

  it('adds a node to the LEFT in a 1-level deep BST', () => {
    const tree = new Tree()
    tree.add(5)

    tree.add(4)
    expect(tree.root.left.value).toEqual(4)
  })

  it('adds a duplicate nodes to the LEFT in a 1-level deep BST', () => {
    const tree = new Tree()
    tree.add(5)

    tree.add(5)
    expect(tree.root.left.value).toEqual(5)
  })

  it('adds a node to the RIGHT in a 1-level deep BST', () => {
    const tree = new Tree()
    tree.add(5)

    tree.add(6)
    expect(tree.root.right.value).toEqual(6)
  })

  it('adds a node in 2-level deep BSTs', () => {
    const tree = new Tree()
    tree.add(5)
    tree.add(6)

    tree.add(7)

    expect(tree.root.right.right.value).toEqual(7)
  })

  it('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8]
    const tree = new Tree()

    nums.map(num => tree.add(num))

    expect(tree.root.value).toEqual(3)

    expect(tree.root.left.value).toEqual(1)
    expect(tree.root.left.left).toBeNull()

    expect(tree.root.left.right.value).toEqual(2)
    expect(tree.root.left.right.left).toBeNull()
    expect(tree.root.left.right.right).toBeNull()

    expect(tree.root.right.value).toEqual(7)

    expect(tree.root.right.left.value).toEqual(4)
    expect(tree.root.right.left.left).toBeNull()

    expect(tree.root.right.left.right.value).toEqual(6)
    expect(tree.root.right.left.right.left.value).toEqual(5)
    expect(tree.root.right.left.right.left.right).toBeNull()
    expect(tree.root.right.left.right.left.left).toBeNull()

    expect(tree.root.right.right.value).toEqual(10)
    expect(tree.root.right.right.right).toBeNull()

    expect(tree.root.right.right.left.value).toEqual(9)
    expect(tree.root.right.right.left.right).toBeNull()

    expect(tree.root.right.right.left.left.value).toEqual(8)
    expect(tree.root.right.right.left.left.right).toBeNull()
    expect(tree.root.right.right.left.left.left).toBeNull()
  })
})

class Tree {
  constructor () {
    this.root = null
  }

  _goLeft (x, tree) {
    !tree.left
      ? tree.left = new Node(x)
      : this._add(x, tree.left)
  }

  _goRight (x, tree) {
    !tree.right
      ? tree.right = new Node(x)
      : this._add(x, tree.right)
  }

  _add (x, tree) {
    if (x <= tree.value) { this._goLeft(x, tree) }
    if (x > tree.value) { this._goRight(x, tree) }
  }

  add (x) {
    !this.root
      ? this.root = new Node(x)
      : this._add(x, this.root)
  }
}

class Node {
  constructor (value, leftBST = null, rightBST = null) {
    this.value = value
    this.left = leftBST
    this.right = rightBST
  }
}
