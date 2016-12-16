# Notes on *Brian Holt's Workshop: Four Semesters of Computer Science in Six Hours*

## 0. Links

- [Brian's Notes](http://btholt.github.io/four-semesters-of-cs/)
- [Introduction to Algorithms, 3rd Edition](https://mitpress.mit.edu/books/introduction-algorithms)
- [*Big-O* Cheat Sheet](http://bigOcheatsheet.com)


## 1. *Big-O*

- A way to measure how efficient an algorithm is.
- Ignores the little parts and concentrate on the big parts.

### *Big-O* Math example

The *Big-O* for `3x² + x + 1` would be `O(x²)`, or `O(n²)`

We are absorbing:

- The factor (`3`) in `3x²`.
- The `x`.
- The `1`.

Only the biggest term (`x²`) matters.

### *Big-O* Javascript example 1

``` js
const crossAdd = xs => {
  const answer = []

  for (let i = 0; i < xs.length; i++) {
    const goingUp = xs[i]
    const goingDown = xs[xs.length - 1 - i]
    answer.push(goingUp + goingDown)
  }

  return answer
}

crossAdd([1, 3, 5, 7, 9]) // [ 10, 10, 10, 10, 10 ]
```

- `xs` is an array.
- `for (let i = 0; i < input.length; i++)` goes through all the `input`s once.

So, `O(n)`.

### *Big-O* Javascript example 2

``` js
const find = (needle, haystack) => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) { return true }
  }
  return false
}

find(4, [1, 2, 3, 4, 5]) // true
find(9, [1, 2, 3, 4, 5]) // false
```

- `haystack` is an array.
- `for (let i = 0; i < haystack.length; i++)` goes through all the `input`s once, unless,
- `if (haystack[i] === needle) return true` we find the `needle`.
- Nonetheless, when doing *Big-O*, we assume worst case scenario.
- In this example, the `needle` could be the last element in `haystack`.

So, `O(n)`.

### *Big-O* Javascript example 3

``` js
const makeTuples = xs => {
  const answer = []

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs.length; j++) {
      answer.push([xs[i], xs[j]])
    }
  }

  return answer
}

makeTuples([1, 3, 5])
/*
[
  [ 1, 1 ], [ 1, 3 ], [ 1, 5 ],
  [ 3, 1 ], [ 3, 3 ], [ 3, 5 ],
  [ 5, 1 ], [ 5, 3 ], [ 5, 5 ]
]
*/
```

- `input` is an array.
- `for (let i = 0; i < input.length; i++)` goes through all the `input`s once.
	- and for each of those `input`s, `for (let j = 0; j < input.length; j++)` goes through all the `input`s again.

So, `O(n²)`.

### `O(1)`

If we have:

- no loops
- do something and exit/return

Also referred to as *constant time*.

### `O(log n)`

- *Divide-and-conquer* (often recursive) strategy.
- As you add more items:
	- the whole task is going to take more time, but
	- the time per item is going to diminish.
- Example:
	- the 1st 10 items take 20s,
	- the 2nd 10 items take 13s,
	- the 3rd 10 items take 7s.
- More on this later, with merge and quicksort.