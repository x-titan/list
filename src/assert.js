"use strict"

/**
 * @param {boolean} condition
 * @param {string} message
 * @return {asserts condition}
 * @throws {Error}
 */
export default function assert(condition, message) {
  if (!condition)
    throw new Error(message ?? "Unexpected assertion error")
}

/**
 * @param {string} message
 * @param {Error} base
 * @return {never}
 * @throws {Error}
 */
assert.fail = function (message, base) {
  if (!base) base = Error
  throw new base(message ?? "Unexpected assertion error")
}
