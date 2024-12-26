/**
 * @template T, U
 * @param {new T} Child
 * @param {new U} Parent
 * @param {{}} [proto]
 * @returns {new T}
 */
export function inherit(Child, Parent, proto = Child.prototype || {}) {
  Child.prototype = Object.create(Parent.prototype)
  Object.assign(Child.prototype, proto)
  Child.prototype.constructor = Child

  return Object.assign(Child, Parent)
}
