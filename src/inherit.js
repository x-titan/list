"use strict"

import { isObject } from "./types.js"

/**
 * @template T, U
 * @param {new T} Child
 * @param {new U} Parent
 * @param {object} proto
 */
export default function inherit(Child, Parent, proto) {
  Child.prototype.__proto__ = Parent.prototype
  Child.__proto__ = Parent

  if (isObject(proto))
    Object.assign(Child.prototype, proto)

  return function (target, ...args) {
    Parent.apply(target, args)
  }
}
