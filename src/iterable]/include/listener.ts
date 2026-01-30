import type { ListenerOptions, PromiseController } from "../types"
import { createDeferredController, noop } from "../utils"
import Socket from "./socket"

export default class Listener {
  private closedController: PromiseController<void>
  private signal: AbortSignal | null
  private reffed = false

  readonly port: number
  readonly hostname: string
  readonly closed: Promise<void>

  constructor(listenerOptions: ListenerOptions) {
    this.port = listenerOptions.port
    this.hostname = listenerOptions.hostname ?? "localhost"
    this.signal = listenerOptions.signal ?? null

    if (this.signal)
      this.signal.addEventListener("abort", this.close.bind(this))

    this.closedController = createDeferredController<void>()
    this.closed = this.closedController.promise
    this.closed.catch(noop) // to avoid unhandledRejection error
  }

  unref(): void { this.reffed = false }

  ref(): void { this.reffed = true }

  async close(reason?: any) {
    if (reason)
      this.closedController.reject(reason)
    else
      this.closedController.resolve()
    return this.closed
  }

  async accept(): Promise<Socket> {
    const socket = new Socket({
      hostname: this.hostname,
      port: this.port,
      signal: this.signal!,
    })

    return socket
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Socket> {
    if (this.reffed)
      return { done: true }

    const socket = await this.accept()
    if (socket instanceof Socket)
      yield socket
    
    return { done: true }
  }

  [Symbol.dispose]() {
    return this.close()
  }
}
