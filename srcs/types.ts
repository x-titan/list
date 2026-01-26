export interface INode<T = any> {
  data: T
  next: INode<T> | null
}

export interface PreparedNodes<T = any> {
  head: INode<T> | null
  tail: INode<T> | null
  length: number
}