import type {
  INode,
} from "./types"

export default function prepare<T = any>(
  iterable: Iterable<T>,
  reversed = false
) {
  let head: INode<T> | null = null
  let tail: INode<T> | null = null
  let temp: INode<T>
  let length = 0

  for (const element of iterable) {
    temp = { data: element, next: null }

    if (!head) {
      head = temp
      tail = temp
    } else if (!reversed) {
      tail!.next = temp
      tail = temp
    } else {
      temp.next = head
      head = temp
    }

    length++
  }

  return {
    head,
    tail,
    length,
  }
}