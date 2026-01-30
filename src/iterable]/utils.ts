import type {
  PromiseController,
  SocketAddress,
  SocketInfo,
} from "./types"

export function noop() { }

export function isSocketAddress(
  address: SocketAddress
): address is SocketAddress {
  return (
    (typeof address === "object") &&
    (address != null) &&
    ("port" in address) &&
    Number.isInteger(address.port) &&
    (address.port > 0) &&
    (address.port <= 65535)
  )
}

export function isSocketInfo(info: any): info is SocketInfo {
  return (
    (typeof info === "object") &&
    (info != null) &&
    ("remoteAddress" in info) &&
    ("localAddress" in info) &&
    ("alpn" in info)
  )
}

export function createDeferredController<T = any>(): PromiseController<T> {
  let completed = false
  let resolve_: (value: T) => void
  let reject_: (reason?: any) => void

  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve_ = promiseResolve
    reject_ = promiseReject
  })

  return {
    promise,
    get isCompleted() { return completed },

    resolve(value: T) {
      if (completed) return
      completed = true
      resolve_(value)
    },

    reject(reason?: any) {
      if (completed) return
      completed = true
      reject_(reason)
    },
  }
}

export function responseNoContent() {
  return new Response(null, {
    status: 204,
    statusText: "No Content"
  })
}
