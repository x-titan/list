export interface INode<T = any> {
  data: T
  next: INode<T> | null
}
