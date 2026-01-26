export default class Node<T = any> {
  public data: T
  private _next: Node<T> | null = null

  constructor(data: T, next = null) {
    this.data = data
    this.next = next
  }

  get next() { return this._next }

  set next(node: Node<T> | null) {
    if (!Node.isNode(node) && (node != null))
      throw new TypeError("next must be a Node or null")
    this._next = (node ?? null)
  }

  static isNode<U = any>(value: unknown): value is Node<U> {
    return value instanceof Node
  }
}
