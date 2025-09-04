"use strict"

/**
 * @template T
 * @param {() => T} fn
 * @param  {...any} args
 * @return {[Error | null, T]}
 */
export default function trytocatch(fn, ...args) {
  try {
    return [null, fn(...args)]
  } catch (error) {
    return [error]
  }
}
