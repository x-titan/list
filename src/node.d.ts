export default class Node<T> {
  /**
   * The data stored in the node.
   */
  data: T
  /**
   * A reference to the next node in the list (or null if it's the last node).
   */
  next: Node<T> | null
  /**
  * Constructs a new Node.
  * @param data - The data to store in the node.
  * @param next - A reference to the next node (optional).
  */
  constructor(data: T, next?: Node<T> | null)

  toString(): string

  static isNode<U>(value: unknown): value is Node<U>

  static toString(): string
}
