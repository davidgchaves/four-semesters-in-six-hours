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


## 2. Recursion

- Can make the code very simple for some problems.
- Inherently carries a potentially large footprint:
	- Every time you call the function, another call to the stack is added.

### 2.1. Factorial Solution

``` js
const factorial = n =>
  n <= 1
    ? n
    : n * factorial(n - 1)

factorial(10) // 3628800
```


## 3. Sorting

### 3.1 Bubble Sort (`O(n²)`)

- Easy to reason about.
- Amongst the least efficient in terms of worst case scenario.
- Bubble sort works by:
  - Comparing 2 adjacent numbers at a time and swapping them if they are out of order.
  - Rinse and repeat while a swap has happened at the last swipe.

``` js
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

bubbleSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 3.2 Insertion Sort (`O(n²)`)

- Feasible if the collection is already sorted or mostly sorted (almost `O(n)`).
- Terrible if the collection is not sorted at all (`O(n²)`).
- The idea here is that:
  - The beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  - The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is.
  - The inner loop goes over the sorted part of the list and inserts it into the correct position in the array.

```js
const insertionSort = xs => {
  for (let o = 1; o < xs.length; o++) {
    for (let i = o; i >= 0; i--) {
      if (xs[i] < xs[i - 1]) {
        const temp = xs[i]
        xs[i] = xs[i - 1]
        xs[i - 1] = temp
      }
    }
  }
}

insertionSort([10, 5, 3, 8, 2, 6, 4, 7, 9, 1]) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 3.3 Merge Sort (`O(n log n)`)

- It's a *divide-and-conquer* (recursive) algorithm.
- It's stable (keeps the original order if you have equivalent elements).
- `Array.prototype.sort` often uses MergeSort.
- The idea here is that:
  - Recursion: You can recursively divide down your lists in two half size lists.
  - Base Case: List of one (it's already sorted, return it).
  - On the way up, the recursive calls:
    - merge those sorted lists together by inserting the smaller value first.

``` js
const mergeSort = xs => {
  if (xs.length <= 1) { return xs }

  const splitPoint = xs.length / 2

  return stitch(
    mergeSort(xs.slice(0, splitPoint)),
    mergeSort(xs.slice(splitPoint, xs.length))
  )
}

const stitch = (ls, rs) => {
  const ys = []

  while (ls.length && rs.length) {
    ls[0] <= rs[0]
      ? ys.push(ls.shift())
      : ys.push(rs.shift())
  }

  while (ls.length) { ys.push(ls.shift()) }
  while (rs.length) { ys.push(rs.shift()) }

  return ys
}
```

### 3.4 Quick Sort (`O(n log n)`)

- It's a *divide-and-conquer* (recursive) algorithm.
- `Array.prototype.sort` when not using MergeSort, uses some variant of QuickSort.
- Takes up less memory than MergeSort so it is often favored.
- The idea here is that:
  - Recursively choose a pivot (the last element) and get:
      - Every value smaller than the pivot, goes to the left list.
      - Every value greater than the pivot, goes to the right list.
  - Base Case: List of one or empty (it's already sorted, return it).
  - On the way up, the recursive calls concat:
    - The left list.
    - The pivot.
    - The right list.
- Most QuickSort variations comes from choosing the pivot.
- Worst Case Scenario: An already sorted list (`O(n²)`).
- QuickSort3 uses a different technique to choose the pivot:
  - Get the first, middle and last element of the list.
  - Pick the one whose value is in the middle of those 3 as the pivot.

``` js
const quickSort = xs => {
  if (xs.length <= 1) return xs

  const pivot = xs.pop()
  return [
    ...quickSort(left(xs, pivot)),
    pivot,
    ...quickSort(right(xs, pivot))
  ]
}

const left = (xs, pivot) => xs.filter(x => x <= pivot)
const right = (xs, pivot) => xs.filter(x => x > pivot)

```
