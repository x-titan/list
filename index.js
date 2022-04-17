import List from "./list.js"
import Queue from "./queue.js"
import Stack from "./stack.js"
let a = new List()
a.push("a")
a.push("b")
a.push("c")
a.push("d")
a.push("e")
console.log(a.toString())
console.log(a.hasNode(a.node))
a.each(console.log)
export { List, Queue, Stack }