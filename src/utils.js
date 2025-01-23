/**
 * Sets up inheritance for a class.
 * 
 * @template T, U
 * @param {T} Child - The child class.
 * @param {U} Parent - The parent class.
 * @param {{ }} [proto]
 * @return {T & U} The child class with inheritance applied.
 */
export function inherit(Child, Parent, proto = Child.prototype || {}) {
  Child.prototype = Object.create(Parent.prototype)
  Object.assign(Child.prototype, proto)
  Child.prototype.constructor = Child
  Child.prototype.super = Parent.prototype

  return Object.assign(Child, Parent)
}

/** @return {value is any} */
export function isDefined(value) {
  return (value !== null) && (value !== undefined)
}

/** @return {value is number} */
export function isNumber(value) {
  return ((typeof value) === "number") && isFinite(value)
}

/** @return {value is string} */
export function isString(value) {
  return ((typeof value) === "string")
}

/** @return {value is (...args: unknown[]) => unknown} */
export function isFunction(value) {
  return ((typeof value) === "function")
}

/** @return {value is object} */
export function isObject(value) {
  return (value !== null) && ((typeof value) === "object")
}

/** @return {value is Iterable} */
export function isIterable(value) {
  return isDefined(value) && isFunction(value[Symbol.iterator])
}
