export function assert(
  condition: boolean,
  message?: string
): asserts condition {
  if (!condition)
    throw new Error(message ?? "Unexpected assertion error")
}


assert.fail = function (
  message: string,
  base?: ErrorConstructor
): never {
  if (!base)
    base = Error
  throw new base(
    message ?? "Unexpected assertion error"
  )
}

export function isEmpty(value: unknown) {
  return value == null
}

export function isDefined(value: unknown): value is any {
  return value != null
}

export function isNumber(value: unknown): value is number {
  return (typeof value === "number") && isFinite(value)
}

export function isString(value: unknown) {
  return typeof value === "string"
}

export function isObject(value: unknown) {
  return (value != null) && (typeof value === "object")
}

export function isFunction(value: unknown) {
  return typeof value === "function"
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  return isDefined(value) && isFunction(value[Symbol.iterator])
}

export function isInteger(value: unknown): value is number {
  return (isNumber(value) && ((value % 1) === 0))
}

export function isUnsignedInteger(value: unknown): value is number {
  return (isInteger(value) && (value >= 0))
}
