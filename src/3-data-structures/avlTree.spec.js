/* eslint-env jasmine */

/*
  AVL Tree

  Tree should have the following properties (in addition to whatever properties you create):

  value - integer     - value being contained in the node
  left  - Node/object - the left node which itself may be another tree
  right - Node/object - the right node which itself may be another tree
*/

describe('AVL Tree', () => {
  it('adds a node to an empty AVL', () => {
    const tree = new Tree()

    tree.add(5)

    expect(tree.root.value).toEqual(5)
    expect(tree.root.height).toEqual(1)
  })

  it('adds a node to the LEFT in a 1-level deep AVL', () => {
    const tree = new Tree()
    tree.add(5)

    tree.add(4)

    expect(tree.root.left.value).toEqual(4)
    expect(tree.root.left.height).toEqual(1)
    expect(tree.root.height).toEqual(2)
  })

  it('adds a node to the RIGHT in a 1-level deep AVL', () => {
    const tree = new Tree()
    tree.add(5)

    tree.add(6)

    expect(tree.root.right.value).toEqual(6)
    expect(tree.root.right.height).toEqual(1)
    expect(tree.root.height).toEqual(2)
  })

  it('perfoms a single rotation to the LEFT when AVL is unbalanced to the RIGHT', () => {
    const tree = new Tree()
    tree.add(5)
    tree.add(6)

    tree.add(7)

    expect(tree.root.value).toEqual(6)
    expect(tree.root.right.value).toEqual(7)
    expect(tree.root.left.value).toEqual(5)
    expect(tree.root.height).toEqual(2)
    expect(tree.root.right.height).toEqual(1)
    expect(tree.root.left.height).toEqual(1)
  })

  it('perfoms a single rotation to the RIGHT when AVL is unbalanced to the LEFT', () => {
    const tree = new Tree()
    tree.add(7)
    tree.add(6)

    tree.add(5)

    expect(tree.root.value).toEqual(6)
    expect(tree.root.right.value).toEqual(7)
    expect(tree.root.left.value).toEqual(5)
    expect(tree.root.height).toEqual(2)
    expect(tree.root.right.height).toEqual(1)
    expect(tree.root.left.height).toEqual(1)
  })

  it('perfoms a double rotation to the LEFT-RIGHT when AVL is unbalanced to the RIGHT-LEFT', () => {
    const tree = new Tree()
    tree.add(5)
    tree.add(7)

    tree.add(6)

    expect(tree.root.value).toEqual(6)
    expect(tree.root.right.value).toEqual(7)
    expect(tree.root.left.value).toEqual(5)
    expect(tree.root.height).toEqual(2)
    expect(tree.root.right.height).toEqual(1)
    expect(tree.root.left.height).toEqual(1)
  })

  it('perfoms a double rotation to the RIGHT-LEFT when AVL is unbalanced to the LEFT-RIGHT', () => {
    const tree = new Tree()
    tree.add(7)
    tree.add(5)

    tree.add(6)

    expect(tree.root.value).toEqual(6)
    expect(tree.root.right.value).toEqual(7)
    expect(tree.root.left.value).toEqual(5)
    expect(tree.root.height).toEqual(2)
    expect(tree.root.right.height).toEqual(1)
    expect(tree.root.left.height).toEqual(1)
  })

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

  add (x) {
    !this.root
      ? this.root = new Node(x)
      : this._add(x, this.root)
  }

  _add (x, tree) {
    x <= tree.value
      ? this._goLeft(x, tree)
      : this._goRight(x, tree)

    this._balance(tree)
  }

  _goLeft (x, tree) {
    !tree.left
      ? tree.left = new Node(x)
      : this._add(x, tree.left)

    this._updateHeightFromGoLeft(tree)
  }

  _updateHeightFromGoLeft (tree) {
    if (!tree.right || tree.right.height < tree.left.height) {
      tree.height = tree.left.height + 1
    }
  }

  _goRight (x, tree) {
    !tree.right
      ? tree.right = new Node(x)
      : this._add(x, tree.right)

    this._updateHeightFromGoRight(tree)
  }

  _updateHeightFromGoRight (tree) {
    if (!tree.left || tree.left.height < tree.right.height) {
      tree.height = tree.right.height + 1
    }
  }

  _balance (tree) {
    const RHeight = tree.right ? tree.right.height : 0
    const LHeight = tree.left ? tree.left.height : 0
    const isUnbalancedToTheLeft = LHeight > RHeight + 1
    const isUnbalancedToTheRight = RHeight > LHeight + 1

    if (isUnbalancedToTheLeft) {
      const LRHeight = tree.left.right ? tree.left.right.height : 0
      const LLHeight = tree.left.left ? tree.left.left.height : 0
      const isUnbalancedToTheLeftRight = LRHeight > LLHeight

      if (isUnbalancedToTheLeftRight) { this._rotateRR(tree.left) }
      this._rotateLL(tree)
    }

    if (isUnbalancedToTheRight) {
      const RLHeight = tree.right.left ? tree.right.left.height : 0
      const RRHeight = tree.right.right ? tree.right.right.height : 0
      const isUnbalancedToTheRightLeft = RLHeight > RRHeight

      if (isUnbalancedToTheRightLeft) { this._rotateLL(tree.right) }
      this._rotateRR(tree)
    }
  }

  _rotateRR (tree) {
    const rootValueBefore = tree.value
    const leftValueBefore = tree.left
    tree.value = tree.right.value
    tree.left = tree.right
    tree.right = tree.right.right
    tree.left.right = tree.left.left
    tree.left.left = leftValueBefore
    tree.left.value = rootValueBefore
    this._updateHeightAfterRotation(tree.left)
    this._updateHeightAfterRotation(tree)
  }

  _rotateLL (tree) {
    const rootValueBefore = tree.value
    const rightValueBefore = tree.right
    tree.value = tree.left.value
    tree.right = tree.left
    tree.left = tree.left.left
    tree.right.left = tree.right.right
    tree.right.right = rightValueBefore
    tree.right.value = rootValueBefore
    this._updateHeightAfterRotation(tree.right)
    this._updateHeightAfterRotation(tree)
  }

  _updateHeightAfterRotation (tree) {
    if (!tree.right && !tree.left) {
      tree.height = 1
    } else if (!tree.right || (this.left && this.right.height < this.left.height)) {
      tree.height = tree.left.height + 1
    } else {
      tree.height = tree.right.height + 1
    }
  }
}

class Node {
  constructor (value, leftBST = null, rightBST = null) {
    this.value = value
    this.left = leftBST
    this.right = rightBST
    this.height = 1
  }
}
