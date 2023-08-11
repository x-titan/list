import List from "./list.js"
import Queue from "./queue.js"
import Stack from "./stack.js"

export { List, Queue, Stack }

let a = new List()
a.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

a.filter((node) => {
  return node < 4
})
a.print()