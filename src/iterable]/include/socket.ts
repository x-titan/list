import SocketError from "./error"
import {
  createDeferredController,
  noop,
} from "../utils"

import type {
  SocketAddress,
  SocketOptions,
  SocketInfo,
  SecureTransportKind,
  PromiseController,
} from "../types"

/**
 * @see https://sockets-api.proposal.wintertc.org/#winter-socket
 * 
 * @example
 * ```ts
 * import connect from "sockets"
 * 
 * const socket = connect("GET / HTTP/1.0\r\n\r\n")
 * 
 * await socket.opened
 * 
 * const reader = socket.readable.getReader()
 * const writer = socket.writable.getWriter()
 * 
 * writer.write(new TextEncoder().encode("TEST"))
 * 
 * while (true) {
 *   const { value, done } = await reader.read();
 *   if (done) {
 *     // the ReadableStream has been closed or cancelled
 *     break;
 *   }
 *   // In many protocols the `value` needs to be decoded to be used:
 *   const decoder = new TextDecoder();
 *   console.log(decoder.decode(value));
 * }
 * 
 * reader.releaseLock();
 * 
 * 
 * ```
 */
export default class Socket {
  private hostname: string
  private port: number
  private allowHalfOpen: boolean
  private secureTransport: SecureTransportKind
  private sni: string | null
  private alpn: string[] | null

  private openedController: PromiseController<SocketInfo>
  private closedController: PromiseController<void>

  readonly readable: ReadableStream<Uint8Array>
  readonly writable: WritableStream<Uint8Array>
  readonly upgraded: boolean
  readonly opened: Promise<SocketInfo>
  readonly closed: Promise<void>

  constructor(options: SocketAddress & SocketOptions) {
    // options
    this.hostname = options.hostname ?? "localhost"
    this.port = options.port
    this.allowHalfOpen = options?.allowHalfOpen ?? true
    this.secureTransport = options?.secureTransport ?? "off"
    this.sni = options?.sni ?? null
    this.alpn = options?.alpn ?? null

    if (options.signal)
      options.signal.addEventListener("abort", this.close.bind(this))

    // streams
    this.readable = new ReadableStream()
    this.writable = new WritableStream()
    this.upgraded = false

    this.openedController = createDeferredController<SocketInfo>()
    this.closedController = createDeferredController<void>()

    this.opened = this.openedController.promise
    this.closed = this.closedController.promise

    // By default, the opened and closed promises is marked as handled
    // to avoid unhandledRejection error
    this.opened.catch(console.error)
    this.closed.catch(noop)

    // simulate connection
    this.simulateConnection()
  }

  private simulateConnection() {
    const isSecure = this.secureTransport === "on"
    this.onConnected({
      remoteAddress: "127.0.0.1",
      localAddress: "127.0.0.1",
      alpn: isSecure ? "h2" : "http/1.1",
    })
    setTimeout(() => this.onClose(), 5000)
  }

  private onConnected(info: SocketInfo) {
    if (this.closedController.isCompleted)
      return // socket already closed

    this.openedController.resolve(info)
  }

  private onError(error: any) {
    let socketError: SocketError = error

    if (!(error instanceof SocketError))
      socketError = new SocketError(error.message ?? error)

    // reject the opened promise when havent been resolved
    this.openedController.reject(socketError)
    this.closedController.reject(socketError)
  }

  private onClose(reason?: any) {
    // reject the opened promise when havent been resolved
    this.openedController.reject(reason)
    this.closedController.resolve()
  }

  async close(reason?: any) {
    this.onClose(reason)
    return this.closed
  }

  startTls() {
    if (this.upgraded)
      throw new Error("already upgraded")
    if (this.secureTransport !== "starttls")
      throw new Error("secureTransport must be set to 'starttls'");

    const socketTLS = new Socket({
      hostname: this.hostname,
      port: this.port,
      secureTransport: "on",
    })

    // @ts-ignore
    socketTLS.upgraded = true
    return socketTLS
  }
}
